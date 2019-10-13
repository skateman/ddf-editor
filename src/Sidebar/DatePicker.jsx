import React from "react";

const DefaultDatePicker = (Component, variant, disabledDays) => {
  const fn = ({ formOptions, ...props }) => {
    return <Component variant={variant} disabledDays={disabledDays} formOptions={formOptions} { ...props }/>
  };

  return fn;
};

export default DefaultDatePicker;
