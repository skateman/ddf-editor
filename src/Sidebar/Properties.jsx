import React from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import FormRender from '@data-driven-forms/react-form-renderer';

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

  const customFormFields = {
    ...formFieldsMapper,
    [OPTIONS]: Options,
    [componentTypes.DATE_PICKER]: DatePicker(formFieldsMapper[componentTypes.DATE_PICKER])
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
      />
    </>
  )
};

export default Properties;
