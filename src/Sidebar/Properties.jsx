import React, { useState, useEffect } from "react";
import FormRender from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash.isequal';

import { find } from '../schema';

// Function used to get rid of the DDF attribute in the final schema to suppress React errors
const cleanupDDF = (array) => array.map(({ DDF, ...item }) => item);

// Preload schema values that are marked for synchronization with the local state
const loadSynchronizable = (schema, object) => schema.reduce((obj, { DDF: { synchronize } = {} }) => ({
  ...obj,
  ...synchronize ? { [synchronize]: object[synchronize] } : undefined
}), {});

const Properties = ({ formFieldsMapper, layoutMapper, editSchema = [], schema, edit, dispatch }) => {
  const [state, setState] = useState(loadSynchronizable(editSchema, edit.item));
  useEffect(() => setState(loadSynchronizable(editSchema, edit.item)), [edit.item.name]);

  // This callback synchronizes the marked components' values with the local state
  const onStateUpdate = ({ active, values }) => {
    const { DDF: { synchronize, postProcess } = {} } = editSchema.find(({ name }) => name === active) || { DDF: {} };
    if (synchronize) {
      // If there's a post-processing function available, call it to set the new value
      const newVal = postProcess ? postProcess(values) : { [synchronize]: values[synchronize] };
      // Merge the newValue into the state if synchronization is
      if (synchronize && !isEqual(newVal[synchronize], state[synchronize])) {
        setState({ ...state, ...newVal })
      }
    }
  };

  const onSubmit = (_values) => {
    // Go through all the fields in the schema, call all the defined post-processing functions and merge the results with the submitted values
    const values = editSchema.reduce((obj, { DDF : { postProcess } = {} }) => ({
      ...obj,
      ...postProcess ? postProcess(_values) : undefined
    }), _values);

    dispatch({ type: 'editSave', target: edit.item.name, values });
  };

  // Validator function that determines if there are any name duplications across the schema
  const uniqueName = ({ name }) => name && name !== edit.item.name && find(schema, name) ? { name: "This field must be unique across the schema" } : {};

  return (
    <PropertiesContext.Provider value={{ state, setState }}>
      <FormRender
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onSubmit={onSubmit}
        onCancel={() => dispatch({ type: 'editEnd' })}
        schema={{ fields: cleanupDDF(editSchema) }}
        initialValues={ edit.item }
        buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
        clearOnUnmount={true}
        onStateUpdate={onStateUpdate}
        validate={uniqueName}
      />
    </PropertiesContext.Provider>
  )
};

export const PropertiesContext = React.createContext({});
export default Properties;
