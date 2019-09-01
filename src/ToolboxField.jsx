import React from "react";
import classSet from 'react-classset';

const ToolboxField = ({key, title, icon}) => {
  return (
    <><i className={classSet(icon, 'fa-fw')}></i> {title}</>
  )
}

export default ToolboxField;
