import React, { useState, useEffect } from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormRender from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash.isequal';

import { editSchema } from './editSchema';
import Options, { OPTIONS } from './Options';
import DatePicker from './DatePicker';

const changedValues = (old, neu) => Object.keys(neu).reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ edit, dispatch }) => {
  const [state, setState] = useState({
    variant: edit.item.variant,
    disabledDays: edit.item.disabledDays,
    options: edit.item.options,
    initialValue: edit.item.initialValue
  });

  // When switching the edit.item, the component keeps its initial state from the previous render. This useEffect hook
  // makes sure that the new initial state gets loaded properly.
  useEffect(
    () =>
      setState({
        ...state,
        ...["options", "variant", "disabledDays", "initialValue"].reduce(
          (obj, key) =>
            isEqual(state[key], edit.item[key]) ? obj : { ...obj, [key]: edit.item[key] },
          {}
        )
      }),
    [edit.item]
  );


  // This callback is used for updating the default value selection when editing a datepicker. If the `Variant` dropdown
  // or the `Disable past dates` checkbox gets modified, we have to pass down this information to the default value field
  // rendered as a DatePicker component. As the onStateUpdate gets called on any change in the form, the state update is
  // narrowed down by testing against the `active` field.
  const onStateUpdate = ({ active, values: { variant, disabledDays: [{ before : disablePast }] = [{}] } }) => {
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;
    if (['variant', 'disabledDays[0][before]'].includes(active)) {
      setState({ disabledDays, variant });
    }
  };

  const customFormFields = {
    ...formFieldsMapper,
    [OPTIONS]: Options(state, setState),
    [componentTypes.DATE_PICKER]: DatePicker(formFieldsMapper[componentTypes.DATE_PICKER], state.variant, state.disabledDays)
  };

  const onSubmit = ({ validate: [{ pattern }] = [{}], disabledDays: [{ before : disablePast }] = [{}], options : _options, ...values }) => {
    const validate = pattern ? [{ type: validatorTypes.PATTERN_VALIDATOR, pattern }] : undefined;
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;
    const options = _options ? _options.filter(Boolean) : undefined;

    dispatch({
      type: 'editSave',
      target: edit.item.name,
      values: changedValues(edit.item, { validate, disabledDays, options, ...values })
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
        schema={{ fields: editSchema[edit.item.component] }}
        initialValues={ edit.item }
        buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
        clearOnUnmount={true}
        onStateUpdate={onStateUpdate}
      />
    </>
  )
};

export default Properties;
