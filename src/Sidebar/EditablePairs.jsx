import React from "react";

import EditablePair from './EditablePair';

const EditablePairs = (fields, dispatch) => {
  const fn = ({ name, label, help, formOptions }) => {
    return (
      <div className="options">
        <label>{ label } - {help}</label>
        {
          fields && fields.map(
            (_, index) => <EditablePair key={index} {...{name, index, dispatch, formOptions}}/>
          )
        }
        <div className="option-wrapper">
          <div className="item new-option" onClick={() => dispatch({ type: 'editOptionAdd' })}>
            <i className="fa fa-plus"></i> New option
          </div>
        </div>
      </div>
    )
  }

  return fn;
}

export const EDITABLE_PAIRS = 'editable-pairs';
export default EditablePairs;
