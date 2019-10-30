import React, { useReducer, useEffect } from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender, { validatorTypes, componentTypes } from '@data-driven-forms/react-form-renderer';

import { editSchema } from './editSchema';
import Options, { OPTIONS } from './Options';
import DefaultDate from './DefaultDate';
import reducer from './reducer';
import { find } from '../schema';

const changedValues = (old, neu) => [...Object.keys(old), ...Object.keys(neu)].reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ schema, edit, dispatch }) => {
  const [state, localDispatch] = useReducer(reducer, {});
  useEffect(() => localDispatch({ type: 'initialize', ...edit.item }), [edit.item]);

  const onStateUpdate = ({ active, values: { dataType, variant, disabledDays: [{ before : disablePast }] = [{}] } }) => {
    // This callback is used for updating the default value selection when editing a datepicker. If the `Variant` dropdown
    // or the `Disable past dates` checkbox gets modified, we have to pass down this information to the default value field
    // rendered as a DatePicker component. As the onStateUpdate gets called on any change in the form, the state update is
    // narrowed down by testing against the `active` field.
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    if (['variant', 'disabledDays[0][before]'].includes(active)) {
      localDispatch({ type: 'update', disabledDays, variant });
    }

    // If the dataType field has been changed, it should be reflected in the options
    if (active === 'dataType' && state.dataType !== dataType) {
      localDispatch({ type: 'update', dataType });
    }
  };

  const customFormFields = {
    ...formFieldsMapper,
    [OPTIONS]: Options(state, localDispatch),
    [componentTypes.DATE_PICKER]: DefaultDate(formFieldsMapper[componentTypes.DATE_PICKER])
  };

  const onSubmit = ({ disabledDays: [{ before : disablePast }] = [{}], validate: [{ pattern }] = [{}], isRequired, ...values }) => {
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    const validate = !pattern && !isRequired ? undefined : [
      pattern ? { type: validatorTypes.PATTERN_VALIDATOR, pattern } : undefined,
      isRequired ? { type: validatorTypes.REQUIRED } : undefined
    ].filter(Boolean);

    dispatch({
      type: 'editSave',
      target: edit.item.name,
      values: changedValues(edit.item, { validate, disabledDays, isRequired, ...values })
    });
  };

  // Validator function that determines if there are any name duplications across the schema
  const uniqueName = ({ name }) => name && name !== edit.item.name && find(schema, name) ? { name: "This field must be unique across the schema" } : {};

  return (
    <Context.Provider value={{ state }}>
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
