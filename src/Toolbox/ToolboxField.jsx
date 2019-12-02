import React from "react";
import classSet from 'react-classset';

import { DraggableItem, itemTypes } from '../dragAndDrop';

const ToolboxField = ({ kind, title, icon, defaultSchema = {}, dispatch }) => {
  const [, drag, preview] = DraggableItem({ type: itemTypes.INPUT, title, kind, defaultSchema }, dispatch, 'dropNew');

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
