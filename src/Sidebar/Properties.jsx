import React from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormRender from '@data-driven-forms/react-form-renderer';

import { editSchema } from './editSchema';
import EditablePairs, { EDITABLE_PAIRS } from './EditablePairs';

const changedValues = (old, neu) => Object.keys(neu).reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ edit, dispatch }) => {
  const customFormFields = {
    ...formFieldsMapper,
    [EDITABLE_PAIRS]: EditablePairs(edit.item.options, dispatch)
  };

  const onSubmit = ({ validate: [{ pattern }] = [{}], disabledDays: [{ before : disablePast }] = [{}], ...values }) => {
    const validate = pattern ? [{ type: validatorTypes.PATTERN_VALIDATOR, pattern }] : undefined;
    const disabledDays = disablePast ? [{ before: 'today' }] : undefined;

    dispatch({
      type: 'editSave',
      target: edit.item.name,
      values: changedValues(edit.item, { validate, disabledDays, ...values })
    });
  };

  const onStateUpdate = state => {
    const modified = Object.keys(state.modified).some(key => state.modified[key] && key.startsWith('options['));

    if (modified) {
      dispatch({
        type: 'editOptionStore',
        values: state.values.options
      });
    }
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
        onStateUpdate={onStateUpdate}
      />
    </>
  )
};

export default Properties;
