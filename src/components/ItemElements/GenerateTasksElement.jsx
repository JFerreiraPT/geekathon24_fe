import React from 'react';
import PropTypes from 'prop-types';
import { OutputElement } from '../OutputElement';
import { useHandleOutput } from '../../hooks/useHandleOutput';
import { OutputTaskElement } from '../OutputTaskElement';

export default function GenerateTasksElement({
  position,
  isSelected,
  getItemTree,
  update,
  selectedItem,
  handleItemDoubleClick,
  setItems,
  ...props
}) {
  const { handleAction, openOutput, output } = useHandleOutput(
    'ai-resources/1/tasks',
    getItemTree,
    update,
  );

  const getOutputElement = () => {
    if (Array.isArray(output)) {
      return (
        <OutputTaskElement
          position={{ x: 120, y: 24 }}
          itemsList={output}
          handleItemDoubleClick={handleItemDoubleClick}
          selectedItem={selectedItem}
          setItems={setItems}
        />
      );
    }

    return <OutputElement position={{ x: 120, y: 24 }} content={output} />;
  };

  return (
    <div
      className="item generate_tasks"
      style={{
        left: position.x,
        top: position.y,
        border: isSelected ? '2px solid red' : 'none',
      }}
      {...props}
    >
      Generate Tasks
      <button className="run" onClick={() => handleAction(props.id)}>
        {openOutput ? '<=' : '=>'}
      </button>
      {output && openOutput && getOutputElement()}
    </div>
  );
}

GenerateTasksElement.propTypes = {
  position: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  getItemTree: PropTypes.func,
  update: PropTypes.func,
  selectedItem: PropTypes.string,
  handleItemDoubleClick: PropTypes.func,
  setItems: PropTypes.func,
};
