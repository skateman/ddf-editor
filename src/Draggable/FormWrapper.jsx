import React from "react";
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { layoutMapper } from '@data-driven-forms/pf3-component-mapper';

const FormWrapper = (dispatch) => {
  const Component = layoutMapper[layoutComponents.FORM_WRAPPER];

  const fn = ({ ...props }) => {
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

export default FormWrapper;