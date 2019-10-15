import React from "react";
import classSet from 'react-classset';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const Option = ({ prefix, index, checked, checkChange, formOptions, deleteOption }) => {
  const name = `${prefix}[${index}]`;

  const fieldPair = ['label', 'value'].map(field =>
    <div className={classSet(`option-${field}`)} key={field}>
      {
        formOptions.renderForm([{
          component: componentTypes.TEXT_FIELD,
          name: `${name}[${field}]`,
          clearOnUnmount: false,
        }])
      }
    </div>
  );

  return (
    <div className="option">
      { fieldPair }
      <div className="option-default">
        <input type="checkbox" checked={checked} onChange={checkChange} />
      </div>
      <div className="toolbox">
        <i className="fa fa-lg fa-trash" onClick={() => deleteOption(index)}></i>
      </div>
    </div>
  )
};

export default Option;
