import React from "react";
import { useDrag, useDrop } from 'react-dnd';
import classSet from 'react-classset';

const DraggableSection = (Component, dispatch) => {
  const itemType = 'section';

  return ({...props}) => {
    const { name } = props;

    const [{isDragging}, drag, preview] = useDrag({
      item: { name, type: itemType },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      begin: () => {
        setTimeout(() => dispatch({type: 'dragStart', itemType}));
      },
      end: (_, monitor) => {
        if (!monitor.didDrop()) {
          return dispatch({type: 'dragEnd'});
        }

        const { name:target, position } = monitor.getDropResult();

        dispatch({
          type: 'dropExisting',
          source: name,
          target,
          position
        });
      }
    });

    const dropArgs = (position) => ({
      accept: itemType,
      canDrop: item => item.name !== name,
      collect: monitor => ({
        isOver: monitor.canDrop() && monitor.isOver()
      }),
      drop: () => ({name, position}),
    });

    const [{ isOver:isOverTop }, dropTop] = useDrop(dropArgs('before'));
    const [{ isOver:isOverBottom }, dropBottom] = useDrop(dropArgs('after'));

    return (
      <div className={classSet({'section-wrapper': true, 'drag': isDragging})} ref={preview}>
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

export default DraggableSection;
