import { useDrop } from 'react-dnd';

// This is a drop zone that doesn't allow any item to be dropped into it, but it calls
// the onDragEnter/onDragLeave functions if there is some movement with accepted items
// in the area of the drop zone.
export const FakeDropZone = (accept, onDragEnter, onDragLeave) => useDrop({
  accept,
  canDrop: () => false,
  hover: onDragEnter,
  collect: monitor => !monitor.isOver() && onDragLeave() || undefined
});

// As it is possible to drag different kind of items and drop them into the same drop zone, this handler
// only passes the name of the drop target and the before/after position to the dragging handler.
const DropZone = (accept, name, position) => {
  return useDrop({
    accept,
    canDrop: item => item.name !== name,
    drop: () => ({ name, position }),
    collect: monitor => ({
      isOver: monitor.canDrop() && monitor.isOver()
    }),
  });
}

export default DropZone;
