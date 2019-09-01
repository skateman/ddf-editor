import React from "react";
import classSet from 'react-classset';

const ToolboxField = ({key, title, icon}) => {
  return (
    <>
      <div className="icon">
        <i className={classSet(icon, 'fa-fw')}></i>
      </div>
      <div className="title">
        { title }
      </div>
    </>
  )
}

export default ToolboxField;
