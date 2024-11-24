import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TaskItemElement from './TaskItemElement';

export function OutputTaskElement({
  position,
  itemsList,
  handleItemDoubleClick,
  selectedItem,
  setItems,
  ...props
}) {
  const [elementItems, setElementItems] = React.useState([]);
  const [elementItems2, setElementItems2] = React.useState([]);

  React.useEffect(() => {
    setElementItems(
      itemsList.map((item) => {
        return {
          type: 'task',
          id: uuidv4(),
          _id: item._id,
          position: { x: 0, y: 0 },
          content: item.text,
          element: TaskItemElement,
          linkto: null,
        };
      }),
    );
  }, [itemsList]);

  React.useEffect(() => {
    if (elementItems2.length > 0) {
      setItems((prev) => [...prev, ...elementItems2]);
    }
  }, [elementItems2, setItems]);

  React.useLayoutEffect(() => {
    const newItems = elementItems.map((item) => {
      const rect = document.getElementById(item.id)?.getBoundingClientRect();
      return {
        ...item,
        position: {
          x: rect?.left ?? 0,
          y: rect?.top ?? 0,
        },
      };
    });
    setElementItems2(newItems);
  }, [elementItems]);

  return (
    <div
      className="output2"
      style={{
        left: position.x,
        top: position.y,
      }}
      {...props}
    >
      {elementItems2.length === 0
        ? elementItems.map((item) => (
            <item.element
              key={item.id}
              item={item}
              handleItemDoubleClick={handleItemDoubleClick}
              selectedItem={selectedItem}
            />
          ))
        : elementItems2.map((item) => (
            <item.element
              key={item.id}
              item={item}
              handleItemDoubleClick={handleItemDoubleClick}
              selectedItem={selectedItem}
            />
          ))}
    </div>
  );
}

OutputTaskElement.propTypes = {
  position: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired,
  handleItemDoubleClick: PropTypes.func,
  selectedItem: PropTypes.object,
  setItems: PropTypes.func,
};
