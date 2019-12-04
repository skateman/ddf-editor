import React, { useContext } from "react";
import classSet from 'react-classset';

import { ReducerContext, DropZone, DraggableItem, itemTypes } from '../Editor';

const EditableSection = (Component) => {
  const fn = ({ visible, ...props }) => {
    const dispatch = useContext(ReducerContext);

    const { name } = props;

    const [{isDragging}, drag, preview] = DraggableItem({ name, type: itemTypes.SECTION }, dispatch, 'dropExisting');

    const [{ isOver:isOverTop }, dropTop] = DropZone({ name, type: itemTypes.SECTION }, 'before')
    const [{ isOver:isOverBottom }, dropBottom] = DropZone({ name, type: itemTypes.SECTION }, 'after');
    // When there are no items in the section, an empty item is automatically added to add some padding to
    // the section and also to act as a drop zone for adding children into the section.
    const [{ isOver:isOverEmpty }, dropEmpty] = DropZone({ name, type: itemTypes.INPUT }, 'child');

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
            <li onClick={() => dispatch({ type: 'editStart', target: name })}><i className="fa fa-pencil fa-fw"></i></li>
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

export default EditableSection;
