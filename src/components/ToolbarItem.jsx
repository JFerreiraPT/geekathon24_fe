import React from 'react';
import PropTypes from 'prop-types';

const TEXT = {
  input: 'Text',
  input_area: 'T Area',
  input_file: 'File',
  generate_tasks: 'Gen Tasks',
  generate_docs: 'Gen Docs',
  generate_email: 'Gen Email',
  action_points: 'A Points',
  summarize: 'Summarize',
  chat: 'Chat',
};

export default function ToolbarItem({ type, addItem }) {
  return (
    <div className={`item ${type}`}>
      {TEXT[type]}
      <button className="add" onClick={() => addItem(type)}>
        +
      </button>
    </div>
  );
}

ToolbarItem.propTypes = {
  type: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
};
