import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const styles = {
  chatContainer: {
    width: '300px',
    height: '500px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  messageBubble: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    margin: 0,
  },
  timestamp: {
    fontSize: '0.8em',
    color: '#555',
    marginTop: '5px',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  toggleButton: {
    padding: '10px 20px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
};

const SimpleChatInner = ({ itemId, update }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [apiUrl, setApiUrl] = useState(
    'http://localhost:3000/api/chat/1/messages',
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [apiUrl]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const payload = {
        boardId: '1',
        username: 'testUserTiago',
        message: newMessage,
        type: 'text',
        fileUrl: '',
        fileName: '',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error sending message');
      }

      const responseData = await response.json();

      if (
        apiUrl === 'http://localhost:3000/api/chat/1/messages' &&
        responseData.chatId
      ) {
        setApiUrl(
          `http://localhost:3000/api/chat/${responseData.chatId}/messages`,
        );
        update(itemId, { _id: responseData.chatId });
      }

      setMessages([
        ...messages,
        {
          message: newMessage,
          type: 'text',
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <button
        style={styles.toggleButton}
        onClick={() => setIsChatVisible((prev) => !prev)}
      >
        {isChatVisible ? 'Hide Chat' : 'Show Chat'}
      </button>
      {isChatVisible && (
        <div style={styles.chatContainer}>
          <div style={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} style={styles.messageBubble}>
                <p style={styles.messageText}>{msg.message}</p>
                <span style={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={styles.inputField}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SimpleChat({ position, isSelected, update, ...props }) {
  return (
    <div
      className="item chat"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
      }}
      {...props}
    >
      <SimpleChatInner itemId={props.id} update={update} />
    </div>
  );
}

SimpleChat.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  update: PropTypes.func,
};
