import React from "react";
import classSet from 'react-classset';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import { DropZone, DraggableItem } from '../Draggable/backend';


const EditablePair = ({ name:prefix, index, dispatch, formOptions }) => {
  const name = `${prefix}[${index}]`;

  const labelField = {
    component: componentTypes.TEXT_FIELD,
    name: `${name}[label]`
  };

  const valueField = {
    component: componentTypes.TEXT_FIELD,
    name: `${name}[value]`
  };

  const OPTION = 'option';

  const [{isDragging}, drag, preview] = DraggableItem({ name, type: OPTION }, dispatch, 'editOptionDrop');
  const [{ isOver:isOverTop }, dropTop] = DropZone({ name, type: OPTION }, 'before');
  const [{ isOver:isOverBottom }, dropBottom] = DropZone({ name, type: OPTION }, 'after');

  return (
    <div className={classSet({'option-wrapper': true, 'drag': isDragging})} ref={preview}>
      <div className="handle" ref={drag}></div>
      <div className="item">
        <div className="item-left">
          { formOptions.renderForm([labelField]) }
        </div>
        <div className="item-right">
          { formOptions.renderForm([valueField]) }
        </div>
      </div>
      <div className="toolbox">
        <ul>
          <li onClick={() => dispatch({ type: 'editOptionDelete', index })}><i className="fa fa-times fa-fw"></i></li>
        </ul>
      </div>
      <div className="horizontal-overlay">
        <div className={classSet({'overlay-top': true, 'over': isOverTop})} ref={dropTop}></div>
        <div className={classSet({'overlay-bottom': true, 'over': isOverBottom})} ref={dropBottom}></div>
      </div>
    </div>
  )
};

export default EditablePair;
