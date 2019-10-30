import React from "react";

const DefaultDate = (Component, { variant, disabledDays } = {}) => {
  const fn = ({ ...props }) => (<Component variant={variant} disabledDays={disabledDays} {...props}/>);
  return fn;
};

export default DefaultDate;
