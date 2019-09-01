import React from "react";
import ToolboxField from "./ToolboxField";

export const toolboxFields = {
  'text-field': {
    title: 'Text Box',
    icon: 'fa fa-font',
  },
  'textarea-field': {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
  },
  'checkbox': {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  'dropdown': {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
  },
  'radio': {
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
  },
  'date-picker': {
    title: 'Datepicker',
    icon: 'fa fa-calendar',
  },
  'time-picker': {
    title: 'Timepicker',
    icon: 'fa fa-clock-o',
  },
  'tag-control': {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

const Toolbox = () => {
  return (
    <ul className="toolbox">
      {
        Object.keys(toolboxFields).map(key => (
          <li>
            <ToolboxField key={key} {...toolboxFields[key]}/>
          </li>
        ))
      }
    </ul>
  )
};

export default Toolbox;
