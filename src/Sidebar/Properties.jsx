import React, { useReducer, useEffect } from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormRender from '@data-driven-forms/react-form-renderer';

import { editSchema } from './editSchema';
import Options, { OPTIONS } from './Options';
import DefaultDate, { DEFAULT_DATE } from './DefaultDate';
import reducer from './reducer';

const changedValues = (old, neu) => [...Object.keys(old), ...Object.keys(neu)].reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ edit, dispatch }) => {
  const [state, localDispatch] = useReducer(reducer, {});
  useEffect(() => localDispatch({ type: 'initialize', ...edit.item }), [edit.item]);

  // This callback is used for updating the default value selection when editing a datepicker. If the `Variant` dropdown
  // or the `Disable past dates` checkbox gets modified, we have to pass down this information to the default value field
  // rendered as a DatePicker component. As the onStateUpdate gets called on any change in the form, the state update is
  // narrowed down by testing against the `active` field.
  const onStateUpdate = ({ active, values: { variant, disabledDays: [{ before : disablePast }] = [{}] } }) => {
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    if (['variant', 'disabledDays[0][before]'].includes(active)) {
      localDispatch({ type: 'updateDatePicker', disabledDays, variant });
    }
  };

  const customFormFields = {
    ...formFieldsMapper,
    [OPTIONS]: Options(state, localDispatch),
    [DEFAULT_DATE]: DefaultDate(state)
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

  return (
    <>
      <p>{ edit.error }</p>
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
      />
    </>
  )
};

export default Properties;
