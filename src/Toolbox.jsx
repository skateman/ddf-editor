import React from 'react';

import { DraggableItem, itemTypes } from './dragAndDrop';

const ToolboxField = ({ kind, title, icon, defaultSchema = {}, dispatch }) => {
  const [, drag, preview] = DraggableItem({ type: itemTypes.INPUT, title, kind, defaultSchema }, dispatch, 'dropNew');

  return (
    <div className="toolbox-field-inner" ref={drag}>
      <div className="icon" ref={preview}>{ icon }</div>
      <div className="title">
        { title }
      </div>
    </div>
  )
};

const Toolbox = ({ PreviewSwitch, fields, preview, dispatch }) => (
  <>
    { PreviewSwitch && (
      <div className="preview-switch">
        <PreviewSwitch value={preview} onChange={() => dispatch({ type: 'togglePreview', preview })} />
      </div>
    )}
    <ul className="toolbox">
      {
        Object.keys(fields).map(key => (
          <li key={key} className="toolbox-field">
            <ToolboxField dispatch={dispatch} kind={key} {...fields[key]} />
          </li>
        ))
      }
    </ul>
  </>
);

export default Toolbox;
