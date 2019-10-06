import React from "react";
import ToolboxField from "./ToolboxField";
import { dialogItemKinds } from '../constants';

const Toolbox = ({dispatch}) => {
  return (
    <ul className="toolbox">
      {
        Object.keys(dialogItemKinds).filter(key => dialogItemKinds[key].toolbox).map(key => (
          <li key={key} className="toolbox-field">
            <ToolboxField dispatch={dispatch} kind={key} {...dialogItemKinds[key].toolbox}/>
          </li>
        ))
      }
    </ul>
  )
};

export default Toolbox;
