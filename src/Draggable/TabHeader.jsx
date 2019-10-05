import React, { useRef } from 'react';
import { NavItem } from 'patternfly-react';
import classSet from 'react-classset';
import debounce from 'lodash.debounce';

import { DropZone, FakeDropZone, DraggableItem, itemTypes } from './backend';

const TabHeader = ({name, title, active, single, setActiveTab, dispatch}) => {
  const [{isDragging}, drag, preview] = DraggableItem({ name, type: itemTypes.TAB_ITEM }, dispatch, 'dropExisting');

  const [{ isOver:isOverLeft }, dropLeft] = DropZone({ name, type: itemTypes.TAB_ITEM }, 'before');
  const [{ isOver:isOverRight }, dropRight] = DropZone({ name, type: itemTypes.TAB_ITEM }, 'after');

  // Create a fake drop zone that allows switching tabs when dragging an input or a section
  const switchTab = debounce(() => setActiveTab(name), 80);
  const [, tabSwitch] = FakeDropZone([itemTypes.INPUT, itemTypes.SECTION], switchTab, switchTab.cancel);

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
          <li onClick={() => dispatch({ type: 'editStart', target: name })}>
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

export default TabHeader;
