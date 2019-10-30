import React, { useContext } from 'react';

import { Context } from './Properties';

const DefaultDate = (Component) => {
  const fn = ({ ...props }) => {
    const { state: { variant, disabledDays } } = useContext(Context);
    return <Component variant={variant} disabledDays={disabledDays} {...props}/>
  };
  return fn;
};

export default DefaultDate;
