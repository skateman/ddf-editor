import React from "react";
import classSet from 'react-classset';

import { DraggableItem, itemTypes } from './dragAndDrop';

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
};

const Toolbox = ({ Switch, fields, preview, dispatch }) => {
  return (
    <>
      { Switch &&
        <div className="preview-switch">
          <Switch onText="View" offText="Edit" value={preview} inverse={true} onChange={() => dispatch({ type: 'togglePreview', preview })}/>
        </div>
      }
      <ul className="toolbox">
        {
          Object.keys(fields).map(key => (
            <li key={key} className="toolbox-field">
              <ToolboxField dispatch={dispatch} kind={key} {...fields[key]}/>
            </li>
          ))
        }
      </ul>
    </>
  )
};

export default Toolbox;
