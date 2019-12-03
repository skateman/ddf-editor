import React, { useState, useEffect } from "react";
import FormRender, { validatorTypes, componentTypes } from '@data-driven-forms/react-form-renderer';

import { find } from '../schema';

const cleanupInitialValues = (initialValue = [], options = [], multi) => {
  const opts = options.map(option => option.value);

  if (!multi) {
    return opts.includes(initialValue) ? initialValue : undefined;
  }

  const filtered = initialValue.filter(value => opts.includes(value));
  return filtered.length > 0 ? filtered : undefined;
};

const Properties = ({
  formFieldsMapper,
  layoutMapper,
  editSchema,
  schema,
  edit,
  dispatch
}) => {
  const [state, setState] = useState({ multi: edit.item.multi, disabledDays: edit.item.disabledDays, variant: edit.item.variant });
  useEffect(() => setState({ multi: edit.item.multi, disabledDays: edit.item.disabledDays, variant: edit.item.variant }), [edit.item.name]);

  // This callback is used for propagating the values below to the contexts, so child components can access them
  const onStateUpdate = ({ active, values: { dataType, multi, variant, disabledDays: [{ before : disablePast }] = [{}] } }) => {
    switch (active) {
      case 'variant':
        setState({ ...state, variant });
        break;
      case 'dataType':
        setState({ ...state, dataType });
        break;
      case 'multi':
        setState({ ...state, multi });
        break;
      case 'disabledDays[0][before]':
        setState({ ...state, disabledDays: disablePast ? [{ before: 'today' }] : undefined });
        break;
    }
  };

  const onSubmit = ({
      multi,
      options,
      initialValue : _initialValue,
      disabledDays: [{ before : disablePast }] = [{}],
      validate: [{ pattern }] = [{}],
      isRequired,
      component,
      ...values
    }) => {

    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    const validate = !pattern && !isRequired ? undefined : [
      pattern ? { type: validatorTypes.PATTERN_VALIDATOR, pattern } : undefined,
      isRequired ? { type: validatorTypes.REQUIRED } : undefined
    ].filter(Boolean);

    const initialValue = [componentTypes.SELECT, componentTypes.RADIO].includes(component) ? cleanupInitialValues(_initialValue, options, multi) : _initialValue;

    dispatch({
      type: 'editSave',
      target: edit.item.name,
      values: { component, validate, disabledDays, isRequired, multi, options, initialValue, ...values }
    });
  };

  // Validator function that determines if there are any name duplications across the schema
  const uniqueName = ({ name }) => name && name !== edit.item.name && find(schema, name) ? { name: "This field must be unique across the schema" } : {};

  return (
    <PropertiesContext.Provider value={{ state, setState }}>
      <FormRender
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onSubmit={onSubmit}
        onCancel={() => dispatch({ type: 'editEnd' })}
        schema={{ fields: editSchema[edit.item && edit.item.component] }}
        initialValues={ edit.item }
        buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
        clearOnUnmount={true}
        onStateUpdate={onStateUpdate}
        validate={uniqueName}
      />
    </PropertiesContext.Provider>
  )
};

export const PropertiesContext = React.createContext({});
export default Properties;
