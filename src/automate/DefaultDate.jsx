import React, { useContext } from 'react';

import { PropertiesContext } from '../Sidebar/Properties';

const DefaultDate = (Component) => {
  const fn = ({ ...props }) => {
    const { state: { variant, disabledDays } } = useContext(PropertiesContext);
    return <Component variant={variant} disabledDays={disabledDays} {...props}/>
  };
  return fn;
};

export default DefaultDate;
