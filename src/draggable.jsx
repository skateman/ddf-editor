import React from "react";
import { useDrag, useDrop } from 'react-dnd';
import classSet from 'react-classset';

export default (Component, dispatch) => {
  return ({...props}) => {
    const { name } = props.input;

    const [{isDragging}, drag, preview] = useDrag({
      item: { name, type: 'input' },
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
        setTimeout(() => dispatch({type: 'dragStart'}));
      },
      end: () => dispatch({type: 'dragEnd'})
    });

    // To avoid using coordinate arithmetics, the drop overlay has been vertically split up between two drop
    // handlers. The handlers are almost identical, the only difference they have is the type of the event
    // to be dispatched. If an object has been dropped into the upper part of the drop overlay, we tell the
    // reducer to move the dropped object before the drop zone's owner object. The lower part is analogously
    // dispatches an event to move the dropped object after the drop zone's owner object.
    //
    // The visual marking of where the object is supposed to be inserted upon a drop is also handled here. I
    // am using the `over` CSS class on the affected drop overlay part. Everything else is being handled by
    // the styling.
    const dropArgs = (position) => ({
      accept: 'input',
      canDrop: item => item.name !== name,
      collect: monitor => ({
        isOver: monitor.canDrop() && monitor.isOver()
      }),
      drop: item => {
        dispatch({
          type: `drop${position}`,
          source: item.name,
          target: name
        })
      }
    });

    const [{ isOver:isOverTop }, dropTop] = useDrop(dropArgs('Before'));
    const [{ isOver:isOverBottom }, dropBottom] = useDrop(dropArgs('After'));

    return (
      <div className={classSet({'de-component-wrapper': true, 'drag': isDragging})} ref={preview}>
        <div className="de-component-handle" ref={drag}></div>
        <div className="de-component-item">
          <Component {...props}/>
        </div>
        <div className="de-component-toolbox"></div>
        <div className="de-component-overlay">
          <div className={classSet({'overlay-top': true, 'over': isOverTop})} ref={dropTop}></div>
          <div className={classSet({'overlay-bottom': true, 'over': isOverBottom})} ref={dropBottom}></div>
        </div>
      </div>
    )
  }
}
