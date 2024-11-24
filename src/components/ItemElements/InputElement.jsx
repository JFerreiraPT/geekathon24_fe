import React from 'react';
import PropTypes from 'prop-types';
import { postAPI } from '../../services/fetchers';

export default function InputElement({
  position,
  isSelected,
  update,
  ...props
}) {
  const handleOnBlur = async (e) => {
    if (!e.target.value) {
      return;
    }
    const result = await postAPI('input/1/inputs', {
      text: e.target.value,
      type: 'text',
      fileUrl: '',
      fileName: '',
      fileSize: 0,
    });

    if (result) {
      update(props.id, { _id: result._id, content: e.target.value });
    }
  };

  return (
    <input
      className="item input"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
      }}
      {...props}
      onBlur={handleOnBlur}
    />
  );
}

InputElement.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  update: PropTypes.func,
};
