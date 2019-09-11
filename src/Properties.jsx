import React from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';

const Properties = ({ edit, dispatch }) => {
  return (
    <button className="btn btn-default pull-right" onClick={() => dispatch({ type: 'editEnd' })}>Close</button>
  )
};

export default Properties;
