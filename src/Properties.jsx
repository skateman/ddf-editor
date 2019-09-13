import React from "react";
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';

import { dialogItemKinds } from './constants';

const Properties = ({ edit, dispatch }) => {
  return (
    <FormRender
      formFieldsMapper={formFieldsMapper}
      layoutMapper={layoutMapper}
      onSubmit={() => undefined}
      onCancel={() => dispatch({ type: 'editEnd' })}
      schema={dialogItemKinds[edit.item.component].editSchema}
      initialValues={edit.item}
      buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
    />
  )
};

export default Properties;
