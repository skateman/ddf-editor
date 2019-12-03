import React, { useContext, useEffect, useReducer } from "react";
import classSet from 'react-classset';

import FieldArrayItem from './FieldArrayItem';
import { PropertiesContext } from '../Sidebar/Properties';

const reducer = (state, { type, ...action }) => {
  switch(type) {
    case 'dragStart':
      return { isDragging: true };
    case 'dragEnd':
      return { isDragging: false };
    case 'dropOption':
      setTimeout(() => action.fields.move(action.source, action.target));
      return { isDragging: false };
    case 'checkDefault':
      setTimeout(() => {
        const options = action.fields.value;
        const value = options[action.target].value;

        if (action.multi) {
          const __initialValue = action.formOptions.getFieldState('initialValue').value || [];
          const _initialValue = __initialValue.filter(item => item !== value);
          const initialValue = action.checked ? _initialValue : [..._initialValue, value];
          action.formOptions.change('initialValue', initialValue);
        } else {
          action.formOptions.change('initialValue', action.checked ? undefined : value);
        }
      });
      return { ...state };
    case 'removeOption': {
      setTimeout(() => action.fields.remove(action.target));
      return { ...state };
    }
  }
};

const FieldArray = ({
  FieldProvider,
  FieldArrayProvider,
  arrayValidator,
  label,
  fields,
  itemDefault,
  formOptions,
  ...rest
}) => {
  const { state, setState } = useContext(PropertiesContext);
  const { multi, dummy } = state;
  const [{ isDragging }, dispatch] = useReducer(reducer, { isDragging: false });
  const name = rest.input.name;

  useEffect(() => {
    if (dummy) {
      const initialValue = formOptions.getFieldState('initialValue').value;
      if (multi) {
        if (!Array.isArray(initialValue) && initialValue) {
          formOptions.change('initialValue', [initialValue]);
        }
      } else {
        if (Array.isArray(initialValue)) {
          formOptions.change('initialValue', initialValue[0]);
        }
      }
    } else {
      setState({ ...state, dummy: true });
    }
  }, [multi, dummy]);

  return (
    <FieldArrayProvider name={ name } validate={ arrayValidator }>
      { (cosi) => {
        return (
        <div className={classSet({ 'options': true, 'drag': isDragging })}>
          <h3>{ label }</h3>
          <div className="option-wrapper">
            <div className="options-header">
              <div className="option-label"><label>Label</label></div>
              <div className="option-value"><label>Value</label></div>
              <div className="option-default"><label>Default</label></div>
            </div>
          </div>
          {
            cosi.fields.map((option, index) => <FieldArrayItem
              key={ option }
              name={ option }
              fields={ fields }
              value={ cosi.fields.value[index].value }
              fieldIndex={ index }
              dispatch={ (args) => dispatch({ ...args, fields: cosi.fields, multi }) }
              formOptions={ formOptions }
              FieldProvider={ FieldProvider }
              dataType={ formOptions.getFieldState('dataType').value }
            />
            )
          }
          <div className="option-wrapper">
            <div className="item new-option" onClick={() => cosi.fields.push(itemDefault)}>
              <i className="fa fa-plus"></i> New option
            </div>
          </div>
        </div>
      ) }}
    </FieldArrayProvider>
  )
};

export default FieldArray;