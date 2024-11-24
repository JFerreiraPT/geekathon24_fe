import React from 'react';
import PropTypes from 'prop-types';
import { OutputElement } from '../OutputElement';
import { useHandleOutput } from '../../hooks/useHandleOutput';

export default function GenerateEmailElement({
  position,
  isSelected,
  getItemTree,
  update,
  ...props
}) {
  const { handleAction, openOutput, output } = useHandleOutput(
    'ai-resources/1/emails',
    getItemTree,
    update,
  );

  return (
    <div
      className="item generate_email"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
      }}
      {...props}
    >
      Generate Email
      <button className="run" onClick={() => handleAction(props.id)}>
        {openOutput ? '<=' : '=>'}
      </button>
      {output && openOutput && (
        <OutputElement position={{ x: 120, y: 24 }} content={output} />
      )}
    </div>
  );
}

GenerateEmailElement.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  getItemTree: PropTypes.func,
  update: PropTypes.func,
};
