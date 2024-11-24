import React from 'react';
import PropTypes from 'prop-types';
import { postAPI } from '../../services/fetchers';

export default function InputFileElement({
  position,
  isSelected,
  update,
  ...props
}) {
  const handleOnBlur = async (e) => {
    console.log(e);
    if (!e.target.files.length) {
      return;
    }
    const result = await postAPI('input/1/inputs', {
      text: '',
      type: 'file',
      fileUrl: 'file_1.txt',
      fileName: 'file_1.txt',
      fileSize: 0,
    });

    if (result) {
      update(props.id, { _id: result._id, content: e.target.value });
    }
  };

  return (
    <div
      className="item input_file"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
        padding: '32px',
      }}
      {...props}
    >
      <input onChange={handleOnBlur} type="file" />
    </div>
  );
}

InputFileElement.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  update: PropTypes.func,
};
