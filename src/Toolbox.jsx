import React from "react";
import ToolboxField from "./ToolboxField";
import { toolboxFields } from './constants';

const Toolbox = ({dispatch}) => {
  return (
    <ul className="toolbox">
      {
        Object.keys(toolboxFields).map(key => (
          <li key={key} className="toolbox-field">
            <ToolboxField dispatch={dispatch} kind={key} {...toolboxFields[key]}/>
          </li>
        ))
      }
    </ul>
  )
};

export default Toolbox;
