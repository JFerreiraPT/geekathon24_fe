import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './toolbar.css';
import ToolbarItem from '../components/ToolbarItem';
import { ItemElements, ItemTypes } from '../components/itemTypes';
import LinkElements from '../components/LinkElements';

function Dashboard() {
  const [items, setItems] = React.useState([]);
  const [dragging, setDragging] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleAddItem = (type) => {
    const createdItem = {
      type,
      id: uuidv4(),
      position: { x: 0, y: 0 },
      content: '',
      element: ItemElements[type],
      linkto: null,
    };

    setItems([...items, createdItem]);
  };

  // #region move items
  const handleMouseDown = (e, id) => {
    if (selectedItem) {
      return;
    }
    e.preventDefault();

    const parentRect = e.currentTarget.parentNode.getBoundingClientRect();
    const rect = e.currentTarget.getBoundingClientRect();

    setDragging({
      id,
      offsetX: e.clientX - rect.left + parentRect.left,
      offsetY: e.clientY - rect.top + parentRect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (selectedItem) {
      return;
    }

    if (!dragging) return;
    const newX = e.clientX - dragging.offsetX;
    const newY = e.clientY - dragging.offsetY;

    setItems((prev) =>
      prev.map((item) => {
        const itemUpdated =
          item.id === dragging.id
            ? {
                ...item,
                position: {
                  x: newX,
                  y: newY,
                },
              }
            : null;

        if (itemUpdated) {
          const whoIsLinkToItemUpdated = prev.filter(
            (_item) => _item.linkto?.id === itemUpdated.id,
          );
          if (whoIsLinkToItemUpdated.length > 0) {
            whoIsLinkToItemUpdated.forEach((_item) => {
              _item.linkto = itemUpdated;
            });
          }
          return itemUpdated;
        }

        return item;
      }),
    );
  };

  const handleMouseUp = () => {
    if (selectedItem) {
      return;
    }

    setDragging(null);
  };
  // #endregion

  // #region selected item
  const handleItemDoubleClick = (e, id) => {
    e.stopPropagation();

    if (selectedItem) {
      if (selectedItem.id === id) {
        setSelectedItem(null);
      } else {
        const source = selectedItem;

        if (source.linkto) {
          return;
        }
        const target = items.find((item) => item.id === id);

        if (target?.linkto?.id === source.id) {
          return;
        }

        setItems((prev) =>
          prev.map((item) =>
            item.id === source.id
              ? {
                  ...item,
                  linkto: target,
                }
              : item,
          ),
        );
        setSelectedItem(null);
      }
    } else {
      const source = items.find((item) => item.id === id);
      setSelectedItem(source ?? null);
    }
  };

  const hasPreviousItem = () => {
    const found = items.find((item) => item.linkto?.id === selectedItem.id);
    return !!found;
  };

  const handleUnlinkItem = () => {
    const updatedItem = {
      ...selectedItem,
      linkto: null,
    };
    setSelectedItem(updatedItem);
    setItems((prev) =>
      prev.map((item) => (item.id === selectedItem.id ? updatedItem : item)),
    );
  };

  const handleRemoveItem = () => {
    if (!selectedItem) {
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
    setSelectedItem(null);
  };
  // #endregion

  // #region utils
  const handleUpdateItem = (id, data) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      return;
    }
    const updatedItem = {
      ...item,
      ...data,
    };
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const getItemTree = (id) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      return [];
    }

    const previousItems = items.filter((item) => item.linkto?.id === id);

    return { item, previousItems };
  };
  // #endregion
  return (
    <>
      <h1>Dashboard</h1>

      <div id="toolbar">
        <div className="items">
          {Object.values(ItemTypes).map((type) => (
            <ToolbarItem key={type} type={type} addItem={handleAddItem} />
          ))}
        </div>
      </div>

      {selectedItem && (
        <div id="item-actions">
          <button disabled={!selectedItem.linkto} onClick={handleUnlinkItem}>
            Unlink
          </button>
          <button disabled={hasPreviousItem()} onClick={handleRemoveItem}>
            Remove
          </button>
        </div>
      )}

      <div
        id="board"
        className="board"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={() => setSelectedItem(null)}
      >
        <LinkElements items={items} />

        {items
          .filter((i) => i.type !== 'task')
          .map(({ element: Element, ...props }) => (
            <Element
              key={props.id}
              {...props}
              onMouseDown={(e) => handleMouseDown(e, props.id)}
              onDoubleClick={(e) => handleItemDoubleClick(e, props.id)}
              isSelected={selectedItem?.id === props.id}
              update={(id, data) => handleUpdateItem(id, data)}
              getItemTree={getItemTree}
              handleItemDoubleClick={handleItemDoubleClick}
              selectedItem={selectedItem}
              setItems={setItems}
            />
          ))}
      </div>
    </>
  );
}

export default Dashboard;
