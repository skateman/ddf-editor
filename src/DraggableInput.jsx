import React from "react";
import { useDrag, useDrop } from 'react-dnd';
import classSet from 'react-classset';

const DraggableInput = (Component, dispatch) => {
  const itemType = 'input';

  return ({...props}) => {
    const { name } = props.input;

    const [{isDragging}, drag, preview] = useDrag({
      item: { name, type: itemType },
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
        setTimeout(() => dispatch({type: 'dragStart', itemType}));
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
          type: 'dropExisting',
          source: name,
          target,
          position
        });
      }
    });

    // As it is possible to drag different kind of items and drop them into the same drop zone, this handler
    // only passes the name of the drop target and the before/after position to the dragging handler.
    const dropArgs = (position) => ({
      accept: itemType,
      canDrop: item => item.name !== name,
      collect: monitor => ({
        isOver: monitor.canDrop() && monitor.isOver()
      }),
      drop: () => ({name, position}),
    });

    // To avoid using coordinate arithmetics, the drop overlay has been vertically split up between two drop
    // handlers. The upper handler is responsible for prepending, while the lower one is analogously invokes
    // appending. Both overlays have a little border to indicate the future location of the dragged item. It
    // is being handled by a CSS class which is being set based on the isOverTop and isOverBottom variables.
    const [{ isOver:isOverTop }, dropTop] = useDrop(dropArgs('before'));
    const [{ isOver:isOverBottom }, dropBottom] = useDrop(dropArgs('after'));

    return (
      <div className={classSet({'input-wrapper': true, 'drag': isDragging})} ref={preview}>
        <div className="handle" ref={drag}></div>
        <div className="item">
          <Component {...props}/>
        </div>
        <div className="toolbox">
          <ul>
            <li onClick={() => console.warn('Not implemented!')}><i className="fa fa-pencil fa-fw"></i></li>
            <li onClick={() => dispatch({type: 'delete', source: name})}><i className="fa fa-times fa-fw"></i></li>
          </ul>
        </div>
        <div className="horizontal-overlay">
          <div className={classSet({'overlay-top': true, 'over': isOverTop})} ref={dropTop}></div>
          <div className={classSet({'overlay-bottom': true, 'over': isOverBottom})} ref={dropBottom}></div>
        </div>
      </div>
    )
  }
};

export default DraggableInput;
