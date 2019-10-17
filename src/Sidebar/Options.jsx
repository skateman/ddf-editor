import React from "react";
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import Option from './Option';
const Options = (state, setState) => {
  const { options = [], initialValue } = state;

  const fn = ({ name : prefix, label, formOptions }) => {
    const newOption = () => {
      const options = [...formOptions.getState().values.options, { label: '', value: '' }];
      formOptions.change('options', options);
      setState({ ...state, options });
    };

    const deleteOption = source => {
      const _options = formOptions.getState().values.options;
      const options = [ ..._options.slice(0, source), ..._options.slice(source + 1)];
      formOptions.change('options', options);
      setState({ ...state, options });
    };

    const checkDefault = value => {
      const options = formOptions.getState().values.options;

      setState({ ...state, options, initialValue: value });
      // The setState above forces a re-render that invalidates the call below, so its execution has to be delayed.
      setTimeout(() => formOptions.change('initialValue', value));
    };

    return (
      <div className="options">
        <h3>{ label }</h3>
        { formOptions.renderForm([{ component: componentTypes.TEXT_FIELD, name: 'initialValue', type: 'hidden' }]) }
        <div className="option">
          <div className="option-value"><label>Value</label></div>
          <div className="option-label"><label>Label</label></div>
          <div className="option-default" style={{'textAlign': 'left'}}><label>Default</label></div>
        </div>
        {
          options.map((option, index) => {
            const checked = options[index].value === initialValue;

            return (
              <Option
                key={index}
                index={index}
                prefix={prefix}
                formOptions={formOptions}
                deleteOption={deleteOption}
                checked={checked}
                checkChange={() => checkDefault(checked ? null : options[index].value)}
              />
            )
          })
        }
        <div className="option option-new" onClick={newOption}>
          <i className="fa fa-plus"></i> New option
        </div>
      </div>
    )
  };

  return fn;
};

export const OPTIONS = 'editable-pairs';
export default Options;
