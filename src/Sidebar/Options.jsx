import React, { useState, useEffect } from "react";
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import Option from './Option';

const Options = ({ name : prefix, label, formOptions }) => {
  const [options, setOptions] = useState([]);
  const [initial, setInitial] = useState();

  const synchronize = () => {
    const values = formOptions.getState().values;

    setOptions(values[prefix]);
    setInitial(values.initialValue);
  };

  const indexes = options.map((option, index) => option ? index.toString() : undefined).filter(Boolean).map(Number);

  const newOption = () => {
    const length = formOptions.getState().values.options.length;
    formOptions.change(`${prefix}[${length}]`, {});
    synchronize();
  };

  const deleteOption = source => {
    formOptions.change(`${prefix}[${source}]`, undefined);
    synchronize();
  };

  const moveOption = (source, direction) => {
    const target = indexes.indexOf(source) + direction;
    formOptions.change(`${prefix}[${target}]`, options[source]);
    formOptions.change(`${prefix}[${source}]`, options[target]);
    synchronize();
  };

  const checkDefault = value => {
    formOptions.change('initialValue', value);
    synchronize();
  };

  const moveAllowed = (source, direction) => indexes[source + direction] !== undefined;

  useEffect(synchronize);

  return (
    <div className="options">
      <h3>{ label }</h3>
      { formOptions.renderForm([{ component: componentTypes.TEXT_FIELD, label: 'Default value', name: 'initialValue' }]) }
      <div className="option">
        <div className="option-value"><label>Value</label></div>
        <div className="option-label"><label>Label</label></div>
        <div className="option-default" style={{'textAlign': 'left'}}><label>Default</label></div>
      </div>
      {
        indexes.map((index) => {
          const checked = options[index].value === initial;

          return (
            <Option
              key={index}
              index={index}
              prefix={prefix}
              formOptions={formOptions}
              moveOption={moveOption}
              moveAllowed={moveAllowed}
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
}

export const OPTIONS = 'editable-pairs';
export default Options;
