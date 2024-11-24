import React from 'react';
import PropTypes from 'prop-types';
import { OutputElement } from '../OutputElement';
import { useHandleOutput } from '../../hooks/useHandleOutput';

export default function GenerateDocsElement({
  position,
  isSelected,
  getItemTree,
  update,
  ...props
}) {
  const { handleAction, openOutput, output } = useHandleOutput(
    'ai-resources/1/documentation',
    getItemTree,
    update,
  );

  return (
    <div
      className="item generate_docs"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
      }}
      {...props}
    >
      Generate Docs
      <button className="run" onClick={() => handleAction(props.id)}>
        {openOutput ? '<=' : '=>'}
      </button>
      {output && openOutput && (
        <OutputElement position={{ x: 120, y: 24 }} content={output} />
      )}
    </div>
  );
}

GenerateDocsElement.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  getItemTree: PropTypes.func,
  update: PropTypes.func,
};
