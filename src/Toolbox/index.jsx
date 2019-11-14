import React from "react";

import ToolboxField from "./ToolboxField";

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
