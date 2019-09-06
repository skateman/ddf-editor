import { useDrag, useDrop } from 'react-dnd';

export const DraggableItem = (name, type, dispatch, event) => useDrag({
  item: { type, name },
  collect: monitor => ({
    isDragging: monitor.isDragging()
  }),
  begin: () => {
    // Initially the dragging handles have a z-index set above the drop overlay in order to allow mouse
    // events on the handle. If a dragging is in progress, these handles would obstruct the drop overlay
    // as it is above their left side. To avoid this problem, we are using the dispatch() calls below to
    // make the top-level component aware if a dragging is in progress or not by appending a class to it.
    // Based on this class, there's a CSS rule that resets the z-index of the handle which sets the drop
    // overlay temporarily on top until the dragging is in progress. However, by setting this top-level
    // CSS class immediately, the drag operation gets prevented by the browser. Therefore, the dispatch()
    // should happen with a minimal delay which can be achieved by using setTimeout. As the return value
    // of the begin function can not be a number, curly braces have been used to ignore the result of the
    // setTimeout function. Long story short: this set of "hacks" is necessary :)
    setTimeout(() => dispatch({
      type: 'dragStart',
      itemType: type
    }));
  },
  end: (_, monitor) => {
    // If the dragging operation ended with an invalid drop target, we just tell the main component that
    // the drag operation has ended.
    if (!monitor.didDrop()) {
      return dispatch({type: 'dragEnd'});
    }

    // If the dragging operation finished with a valid drop target, we can retrieve the position and the
    // name of this target.
    const { name:target, position } = monitor.getDropResult();

    dispatch({
      type: event,
      source: name,
      target,
      position
    });
  }
});

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
export const DropZone = (accept, name, position) => {
  return useDrop({
    accept,
    canDrop: item => item.name !== name,
    drop: () => ({ name, position }),
    collect: monitor => ({
      isOver: monitor.canDrop() && monitor.isOver()
    }),
  });
};
