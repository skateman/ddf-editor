import React from "react";

import ToolboxField from "./ToolboxField";

const Toolbox = ({ fields, dispatch }) => {
  return (
    <ul className="toolbox">
      {
        Object.keys(fields).map(key => (
          <li key={key} className="toolbox-field">
            <ToolboxField dispatch={dispatch} kind={key} {...fields[key]}/>
          </li>
        ))
      }
    </ul>
  )
};

export default Toolbox;
