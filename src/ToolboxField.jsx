import React from "react";
import classSet from 'react-classset';

export default ({key, title, icon}) => {
  return (
    <><i className={classSet(icon, 'fa-fw')}></i> {title}</>
  )
}
