import React, { useState, useEffect } from "react";

const DefaultDatePicker = (Component) => {
  const fn = ({ formOptions, ...props }) => {
    const [variant, setVariant] = useState();
    const [disabledDays, setDisabledDays] = useState();

    const synchronize = () => {
      const values = formOptions.getState().values;
      setVariant(values.variant);
      setDisabledDays(values.disabledDays);
    };

    useEffect(synchronize);

    return <Component variant={variant} disabledDays={disabledDays} formOptions={formOptions} { ...props }/>
  };

  return fn;
};

export const DEFAULT_DATE_PICKER = 'default-date-picker';
export default DefaultDatePicker;
