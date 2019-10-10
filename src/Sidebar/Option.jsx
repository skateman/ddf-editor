import React from "react";
import classSet from 'react-classset';
import { ButtonGroup, Button } from 'patternfly-react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const Option = ({ prefix, index, checked, checkChange, formOptions, moveOption, moveAllowed, deleteOption }) => {
  const name = `${prefix}[${index}]`;

  const fieldPair = ['label', 'value'].map(field =>
    <div className={classSet(`option-${field}`)} key={field}>
      {
        formOptions.renderForm([{
          component: componentTypes.TEXT_FIELD,
          name: `${name}[${field}]`
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
        <ButtonGroup bsSize="small">
          <Button onClick={() => moveOption(index, -1)} disabled={!moveAllowed(index, -1)}>
            <i className="fa fa-chevron-up"></i>
          </Button>
          <Button onClick={() => moveOption(index, +1)} disabled={!moveAllowed(index, +1)}>
            <i className="fa fa-chevron-down"></i>
          </Button>
          <Button onClick={() => deleteOption(index)}>
            <i className="fa fa-times"></i>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
};

export default Option;
