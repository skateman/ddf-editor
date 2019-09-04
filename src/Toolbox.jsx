import React from "react";
import ToolboxField from "./ToolboxField";
import { componentTypes } from '@data-driven-forms/react-form-renderer';

export const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: 'fa fa-font',
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  [componentTypes.DROPDOWN]: {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
  },
  [componentTypes.RADIO]: {
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
  },
  [componentTypes.DATE_PICKER]: {
    title: 'Datepicker',
    icon: 'fa fa-calendar',
  },
  [componentTypes.TIME_PICKER]: {
    title: 'Timepicker',
    icon: 'fa fa-clock-o',
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

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
