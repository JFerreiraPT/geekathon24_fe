import React from 'react';
import PropTypes from 'prop-types';

export default function TaskItemElement({
  item,
  handleItemDoubleClick,
  selectedItem,
}) {
  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleItemDoubleClick(e, item.id);
      }}
      style={{
        border: selectedItem?.id === item.id ? '2px solid red' : 'none',
      }}
      id={item.id}
    >
      <div
        className="task"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
}

TaskItemElement.propTypes = {
  item: PropTypes.object.isRequired,
  handleItemDoubleClick: PropTypes.func,
  selectedItem: PropTypes.object,
};
