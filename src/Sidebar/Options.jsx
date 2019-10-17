import React from "react";
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import classSet from 'react-classset';

import Option from './Option';
const Options = ({ options = [], initialValue, isDragging = false }, dispatch) => {
  const fn = ({ name : prefix, label, formOptions }) => {
    return (
      <div className={classSet({ 'options': true, 'drag': isDragging })}>
        <h3>{ label }</h3>
        { formOptions.renderForm([{ component: componentTypes.TEXT_FIELD, name: 'initialValue', type: 'hidden' }]) }
        <div className="option-wrapper">
          <div className="options-header">
            <div className="option-label"><label>Label</label></div>
            <div className="option-value"><label>Value</label></div>
            <div className="option-default"><label>Default</label></div>
          </div>
        </div>
        {
          options.map((option, index) => <Option
            key={index}
            index={index}
            prefix={prefix}
            checked={options[index].value === initialValue}
            formOptions={formOptions}
            dispatch={dispatch}
          />
          )
        }
        <div className="option-wrapper">
          <div className="item new-option" onClick={() => dispatch({ type: 'newOption', formOptions })}>
            <i className="fa fa-plus"></i> New option
          </div>
        </div>
      </div>
    )
  };

  return fn;
};

export const OPTIONS = 'editable-pairs';
export default Options;
