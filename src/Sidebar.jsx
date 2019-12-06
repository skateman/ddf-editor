import React, { useRef, useState, useEffect } from 'react';
import FormRender from '@data-driven-forms/react-form-renderer';
import isEqual from 'lodash.isequal';

import { find } from './schema';

// Preload schema values that are marked for synchronization with the local state
const loadSynchronizable = (schema, object) => schema.reduce((obj, { DDF: { synchronize } = {} }) => ({
  ...obj,
  ...synchronize ? { [synchronize]: object[synchronize] } : undefined,
}), {});

const Sidebar = ({
  formFieldsMapper,
  layoutMapper,
  PropertiesModal,
  editSchema = [],
  schema,
  edit: { item: editItem } = {},
  dispatch,
}) => {
  const modalContainer = useRef(null);
  const displayModal = modalContainer.current && window.getComputedStyle(modalContainer.current).display !== 'none';

  const [state, setState] = useState(loadSynchronizable(editSchema, editItem));
  useEffect(() => setState(loadSynchronizable(editSchema, editItem)), [editItem]);

  // This function calls any available preprocess functions and appends their results to the affected fields
  // It also omits the DDF attribute from each field, preventing React to throw unused attribute errors
  const preProcessFields = fields => fields.map(({ DDF: { preProcess } = {}, ...item }) => ({
    ...item,
    ...(preProcess && preProcess(state)),
  }));

  // This callback synchronizes the marked components' values with the local state
  const onStateUpdate = ({ active, values }) => {
    const { DDF: { synchronize, postProcess } = {} } = editSchema.find(({ name }) => name === active) || { DDF: {} };
    if (synchronize) {
      // If there's a post-processing function available, call it to set the new value
      const newVal = postProcess ? postProcess(values) : { [synchronize]: values[synchronize] };
      // Merge the newValue into the state if synchronization is
      if (synchronize && !isEqual(newVal[synchronize], state[synchronize])) {
        setState({ ...state, ...newVal });
      }
    }
  };

  const onSubmit = (_values) => {
    // Go through all the fields in the schema, call all the defined post-processing functions and merge the results with the submitted values
    const values = editSchema.reduce((obj, { DDF: { postProcess } = {} }) => ({
      ...obj,
      ...postProcess ? postProcess(_values) : undefined,
    }), _values);

    dispatch({ type: 'editSave', target: editItem.name, values });
  };

  // Validator function that determines if there are any name duplications across the schema
  const uniqueName = ({ name }) => (name && name !== editItem.name && find(schema, name) ? { name: 'This field must be unique across the schema' } : {});

  const Properties = editItem && (
    <FormRender
      formFieldsMapper={formFieldsMapper}
      layoutMapper={layoutMapper}
      onSubmit={onSubmit}
      onCancel={() => dispatch({ type: 'editEnd' })}
      schema={{ fields: preProcessFields(editSchema) }}
      initialValues={editItem}
      buttonsLabels={{ submitLabel: 'Save', cancelLabel: 'Close' }}
      clearOnUnmount
      onStateUpdate={onStateUpdate}
      validate={uniqueName}
    />
  );

  return (
    <>
      { Properties // Display either the edited component's Properties or the global schema
        ? <div className="hide-small properties">{ Properties }</div>
        : <pre className="hide-small schema">{ JSON.stringify(schema, null, '  ') }</pre>
      }

      <div className="modal-container" ref={modalContainer} />

      { PropertiesModal && (// Modal is being used on small resolutions
        <PropertiesModal title="Properties" show={Properties && displayModal} onHide={() => dispatch({ type: 'editEnd' })} container={modalContainer.current}>
          <div className="properties">
            { Properties }
          </div>
        </PropertiesModal>
      )}
    </>
  );
};

export default Sidebar;
