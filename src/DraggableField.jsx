import React, { useContext } from "react";
import classNames from 'classnames';

import { ReducerContext } from './Editor';
import { DropZone, DraggableItem, itemTypes } from './dragAndDrop';

const DraggableField = (Component) => {
  const fn = ({ visible, ...props }) => {
    const dispatch = useContext(ReducerContext);

    const { initialValue, formOptions, input: { name } } = props;
    const [{isDragging}, drag, preview] = DraggableItem({ name, type: itemTypes.INPUT }, dispatch, 'dropExisting');

    const values = formOptions.getState().initialValues;
    if (initialValue !== values[name]) {
      setTimeout(() => formOptions.initialize({ ...values, [name]: initialValue }));
    }

    // To avoid using coordinate arithmetics, the drop overlay has been vertically split up between two drop
    // handlers. The upper handler is responsible for prepending, while the lower one is analogously invokes
    // appending. Both overlays have a little border to indicate the future location of the dragged item. It
    // is being handled by a CSS class which is being set based on the isOverTop and isOverBottom variables.
    const [{ isOver:isOverTop }, dropTop] = DropZone({ name, type: itemTypes.INPUT }, 'before');
    const [{ isOver:isOverBottom }, dropBottom] = DropZone({ name, type: itemTypes.INPUT }, 'after');

    return (
      <div className={classNames({'input-wrapper': true, 'drag': isDragging, 'not-visible': !visible})} ref={preview}>
        <div className="handle" ref={drag}></div>
        <div className="item">
          <Component {...props}/>
        </div>
        <div className="toolbox">
          <ul>
            <li onClick={() => dispatch({ type: 'editStart', target: name })}><i className="fa fa-pencil fa-fw"></i></li>
            <li onClick={() => dispatch({type: 'delete', source: name})}><i className="fa fa-times fa-fw"></i></li>
          </ul>
        </div>
        <div className="horizontal-overlay">
          <div className={classNames({'overlay-top': true, 'over': isOverTop})} ref={dropTop}></div>
          <div className={classNames({'overlay-bottom': true, 'over': isOverBottom})} ref={dropBottom}></div>
        </div>
      </div>
    )
  };

  return fn;
};

export default DraggableField;
