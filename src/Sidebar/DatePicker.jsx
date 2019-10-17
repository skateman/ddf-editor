import React from "react";
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const Component = formFieldsMapper[componentTypes.DATE_PICKER];

const DatePicker = ({ variant, disabledDays } = {}) => {
  const fn = ({ formOptions, ...props }) => {
    return <Component variant={variant} disabledDays={disabledDays} formOptions={formOptions} { ...props }/>
  };

  return fn;
};

export default DatePicker;
