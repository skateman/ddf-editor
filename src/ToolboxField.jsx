import React from "react";
import classSet from 'react-classset';

import { itemTypes } from './constants';
import { DraggableItem } from './DragAndDrop';

const ToolboxField = ({dispatch, kind, title, icon}) => {
  const [, drag, preview] = DraggableItem({ type: itemTypes.INPUT, title, kind }, dispatch, 'dropNew');

  return (
    <div className="toolbox-field-inner" ref={drag}>
      <div className="icon" ref={preview}>
        <i className={classSet(icon, 'fa-fw')}></i>
      </div>
      <div className="title">
        { title }
      </div>
    </div>
  )
}

export default ToolboxField;
