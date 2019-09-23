import React from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';

import { dialogItemKinds } from './constants';
import EditablePairs, { EDITABLE_PAIRS } from './EditablePairs';

const changedValues = (old, neu) => Object.keys(neu).reduce((obj, key) => {
  if (old[key] !== neu[key]) {
    return { ...obj, [key]: neu[key] };
  }

  return obj;
}, {});

const Properties = ({ edit, dispatch }) => {
  const customFormFields = { ... formFieldsMapper, [EDITABLE_PAIRS]: EditablePairs(edit.item.options, dispatch) };

  return (
    <>
      <p>{ edit.error }</p>
      <FormRender
        formFieldsMapper={customFormFields}
        layoutMapper={layoutMapper}
        onSubmit={values => dispatch({ type: 'editSave', target: edit.item.name, values: changedValues(edit.item, values) })}
        onCancel={() => dispatch({ type: 'editEnd' })}
        schema={dialogItemKinds[edit.item.component].editSchema}
        initialValues={edit.item}
        buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
      />
    </>
  )
};

export default Properties;
