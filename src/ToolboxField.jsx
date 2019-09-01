import React from "react";
import { useDrag } from 'react-dnd';
import classSet from 'react-classset';

const ToolboxField = ({dispatch, kind, title, icon}) => {
  const [, drag, preview] = useDrag({
    item: { type: 'newInput', kind  }
  });

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
