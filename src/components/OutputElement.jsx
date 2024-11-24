import React from 'react';
import PropTypes from 'prop-types';

export function OutputElement({ position, content, ...props }) {
  const html = '<div>' + content + '</div>';
  return (
    <div
      className="output"
      style={{
        left: position.x,
        top: position.y,
      }}
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

OutputElement.propTypes = {
  position: PropTypes.object.isRequired,
  content: PropTypes.string,
};
