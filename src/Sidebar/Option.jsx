import React from "react";
import classSet from 'react-classset';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import { DropZone, DraggableItem } from '../Draggable/backend';

const type = 'option';

const Option = ({ prefix, index, checked, dataType, formOptions, dispatch }) => {
  const name = `${prefix}[${index}]`;

  const [{isDragging}, drag, preview] = DraggableItem({ name: index, type, formOptions }, dispatch, 'dropOption');

  const [{ isOver:isOverTop }, dropTop] = DropZone({ name: index, type }, 'before');
  const [{ isOver:isOverBottom }, dropBottom] = DropZone({ name: index, type }, 'after');

  return (
    <div className={classSet({ 'option-wrapper': true, 'drag': isDragging })} ref={preview}>
      <div className="handle" ref={drag}></div>
      <div className="item">
        <div className='option-label'>
          {
            formOptions.renderForm([{
              component: componentTypes.TEXT_FIELD,
              name: `${name}[label]`,
              clearOnUnmount: false,
            }])
          }
        </div>
        <div className='option-value'>
          {
            formOptions.renderForm([{
              component: componentTypes.TEXT_FIELD,
              name: `${name}[value]`,
              clearOnUnmount: false,
              dataType: dataType
            }])
          }
        </div>
        <div className="option-default">
          <input type="checkbox" checked={checked} onChange={() => dispatch({ type: 'checkDefault', formOptions, source: index, checked }) } />
        </div>
      </div>
      <div className="toolbox">
        <i className="fa fa-times" onClick={() => dispatch({ type: 'delOption', formOptions, source: index })}></i>
      </div>
      <div className="horizontal-overlay">
        <div className={classSet({'overlay-top': true, 'over': isOverTop})} ref={dropTop}></div>
        <div className={classSet({'overlay-bottom': true, 'over': isOverBottom})} ref={dropBottom}></div>
      </div>
    </div>
  )
};

export default Option;
