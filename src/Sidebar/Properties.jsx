import React, { useState, useEffect } from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender, { validatorTypes, componentTypes } from '@data-driven-forms/react-form-renderer';

import { editSchema } from './editSchema';
import FieldArray from './FieldArray';
import DefaultDate from './DefaultDate';
import { find } from '../schema';

const cleanupInitialValues = (initialValue = [], options = [], multi) => {
  const opts = options.map(option => option.value);

  if (!multi) {
    return opts.includes(initialValue) ? initialValue : undefined;
  }

  const filtered = initialValue.filter(value => opts.includes(value));
  return filtered.length > 0 ? filtered : undefined;
};

const changedValues = (old, neu) => [...Object.keys(old), ...Object.keys(neu)].reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ schema, edit, dispatch }) => {
  const [state, setState] = useState({ multi: edit.item.multi, disabledDays: edit.item.disabledDays, variant: edit.item.variant });
  useEffect(() => setState({ multi: edit.item.multi, disabledDays: edit.item.disabledDays, variant: edit.item.variant }), [edit.item.name]);

  const onStateUpdate = ({ active, values: { dataType, multi, variant, disabledDays: [{ before : disablePast }] = [{}] } }) => {
    // This callback is used for updating the default value selection when editing a datepicker. If the `Variant` dropdown
    // or the `Disable past dates` checkbox gets modified, we have to pass down this information to the default value field
    // rendered as a DatePicker component. As the onStateUpdate gets called on any change in the form, the state update is
    // narrowed down by testing against the `active` field.
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    if (['variant', 'disabledDays[0][before]'].includes(active)) {
      setTimeout(() => setState({ ...state, disabledDays, variant }));
    }

    if (active === 'dataType' && dataType !== state.dataType) {
      setState({ ...state, dataType });
    }

    if (active === 'multi' && multi !== state.multi) {
      setState({ ...state, multi });
    }
  };

  const customFormFields = {
    ...formFieldsMapper,
    [componentTypes.FIELD_ARRAY]: FieldArray,
    [componentTypes.DATE_PICKER]: DefaultDate(formFieldsMapper[componentTypes.DATE_PICKER])
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
      values: changedValues(edit.item, { component, validate, disabledDays, isRequired, multi, options, initialValue, ...values })
    });
  };

  // Validator function that determines if there are any name duplications across the schema
  const uniqueName = ({ name }) => name && name !== edit.item.name && find(schema, name) ? { name: "This field must be unique across the schema" } : {};

  return (
    <Context.Provider value={{ state, setState }}>
      <FormRender
        formFieldsMapper={customFormFields}
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
    </Context.Provider>
  )
};

export const Context = React.createContext({});
export default Properties;
