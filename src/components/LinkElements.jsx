import React from 'react';
import PropTypes from 'prop-types';

export default function LinkElements({ items }) {
  const renderLinks = () => {
    return items.map((item) => {
      if (!item || !item.linkto) return null;

      const x1 = item.position.x + 50;
      const y1 = item.position.y + 15;
      const x2 = item.linkto.position.x;
      const y2 = item.linkto.position.y;

      return (
        <line
          key={`${item.id}-${item.linkto.id}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  return (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          fill="black"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>

      {renderLinks()}
    </svg>
  );
}

LinkElements.propTypes = {
  items: PropTypes.array.isRequired,
};
