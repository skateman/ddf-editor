import React from 'react';
import { NavItem } from 'patternfly-react';
import { useDrag, useDrop } from 'react-dnd';
import classSet from 'react-classset';

const DraggableTabHeader = ({name, title, active, handleSelect, dispatch}) => {
  const [{isDragging}, drag, preview] = useDrag({
    item: { name, type: 'tab' },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    begin: () => {
      setTimeout(() => dispatch({type: 'dragStart'}));
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
    accept: 'tab',
    canDrop: item => item.name !== name,
    collect: monitor => ({
      isOver: monitor.canDrop() && monitor.isOver()
    }),
    drop: () => ({name, position}),
  });

  const [{ isOver:isOverLeft }, dropLeft] = useDrop(dropArgs('before'));
  const [{ isOver:isOverRight }, dropRight] = useDrop(dropArgs('after'));

  return (
    <NavItem eventKey={ name } active={ active } onSelect={ handleSelect } className="de-tab-header-wrapper">
      <span className={classSet({'drag': isDragging})} ref={preview}>
        <div className={classSet({'de-tab-header-handle': true, 'active': active})} ref={drag}></div>
        { title }
        <div className="de-tab-header-overlay">
          <div className={classSet({'overlay-left': true, 'over': isOverLeft})} ref={dropLeft}></div>
          <div className={classSet({'overlay-right': true, 'over': isOverRight})} ref={dropRight}></div>
        </div>
      </span>
    </NavItem>
  )
};

export default DraggableTabHeader;
