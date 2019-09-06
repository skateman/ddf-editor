import React from "react";
import classSet from 'react-classset';

import { itemTypes } from './constants';
import { DropZone, DraggableItem } from './DragAndDrop';

const DraggableSection = (Component, dispatch) => {
  const fn = ({...props}) => {
    const { name } = props;

    const [{isDragging}, drag, preview] = DraggableItem({ name, type: itemTypes.SECTION }, dispatch, 'dropExisting');

    const [{ isOver:isOverTop }, dropTop] = DropZone(itemTypes.SECTION, name, 'before')
    const [{ isOver:isOverBottom }, dropBottom] = DropZone(itemTypes.SECTION, name, 'after');
    // When there are no items in the section, an empty item is automatically added to add some padding to
    // the section and also to act as a drop zone for adding children into the section.
    const [{ isOver:isOverEmpty }, dropEmpty] = DropZone(itemTypes.INPUT, name, 'child');

    return (
      <div className={classSet({'section-wrapper': true, 'drag': isDragging})} ref={preview}>
        <div className="handle" ref={drag}></div>
        <div className="item">
          <Component {...props}/>
          {props.fields.length === 0 &&
            <div className={classSet({'empty': true, 'over': isOverEmpty})} ref={dropEmpty}></div>
          }
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
  };

  return fn;
};

export default DraggableSection;
