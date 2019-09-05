import React, { useRef } from 'react';
import { NavItem } from 'patternfly-react';
import { useDrag } from 'react-dnd';
import classSet from 'react-classset';
import debounce from 'lodash.debounce';

import DropZone, { FakeDropZone } from './DropZone';

const DraggableTabHeader = ({name, title, active, single, setActiveTab, dispatch}) => {
  const itemType = 'tab';

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

  const [{ isOver:isOverLeft }, dropLeft] = DropZone(itemType, name, 'before');
  const [{ isOver:isOverRight }, dropRight] = DropZone(itemType, name, 'after');

  // Create a fake drop zone that allows switching tabs when dragging an input or a section
  const switchTab = debounce(() => setActiveTab(name), 80);
  const [, tabSwitch] = FakeDropZone(['input', 'section'], switchTab, switchTab.cancel);

  const toolboxRef = useRef(null);
  // Do not fire the tab change when clicking on the edit/delete icon
  const handleSelect = (_, e) => {
    if (!toolboxRef.current.contains(e.target)) {
      setActiveTab(name);
    }
  }

  return (
    <NavItem eventKey={ name } active={ active } onSelect={ handleSelect } className="tab-header-wrapper">
      <span className={classSet({'drag': isDragging})} ref={preview}>
        <div className={classSet({'handle': true, 'active': active})} ref={drag}></div>
        { title }
        <ul className="toolbox" ref={toolboxRef}>
          <li onClick={() => console.warn('Not implemented!')}>
            <i className="fa fa-pencil"></i>
          </li>
          <li onClick={() => single ? undefined : dispatch({type: 'delete', source: name})} className={classSet({'disabled': single})}>
            <i className="fa fa-times"></i>
          </li>
        </ul>
        <div className="vertical-overlay" ref={tabSwitch}>
          <div className={classSet({'overlay-left': true, 'over': isOverLeft})} ref={dropLeft}></div>
          <div className={classSet({'overlay-right': true, 'over': isOverRight})} ref={dropRight}></div>
        </div>
      </span>
    </NavItem>
  )
};

export default DraggableTabHeader;
