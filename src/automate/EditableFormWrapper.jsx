import React, { useContext } from "react";

import { Context } from '../Editor';

const EditableFormWrapper = (Component) => {
  const fn = ({ ...props }) => {
    const dispatch = useContext(Context);

    return (
      <div className="form-wrapper">
        <div className="toolbox">
          <ul>
            <li onClick={() => dispatch({ type: 'editStart', target: undefined })}><i className="fa fa-pencil fa-fw"></i></li>
          </ul>
        </div>
        <Component {...props} />
      </div>
    )
  };

  return fn;
};

export default EditableFormWrapper;
