import React from "react";
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

const component = formFieldsMapper[componentTypes.DATE_PICKER];

const DefaultDate = ({ variant, disabledDays } = {}) => {
  const fn = ({ FieldProvider, ...props }) => {
    return <FieldProvider component={component} variant={variant} disabledDays={disabledDays} { ...props }/>
  };

  return fn;
};

export const DEFAULT_DATE = 'default-date';
export default DefaultDate;
