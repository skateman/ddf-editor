import React, { useState, useReducer, useMemo } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender, { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import './style.scss';

import draggableFields from './Draggable/fields';
import playerFields from './Player/fields';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';

import FormWrapper from './Draggable/FormWrapper';

export const Context = React.createContext({});

export default ({...props}) => {
  const { schema:initialSchema } = props;
  const [preview, setPreview] = useState(false);
  const [{ schema, isDragging, edit }, dispatch] = useReducer(reducer, {
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

  // Memoize the decorated component mapping for a better performance
  const draggableFormFieldsMapper = useMemo(
    () =>
      Object.keys(draggableFields).reduce(
        (obj, key) => ({
          ...obj,
          [key]: draggableFields[key]
        }),
        {
          ...formFieldsMapper
        }
      ),
    [draggableFields, formFieldsMapper]
  );

  const draggableLayoutMapper = useMemo(
    () => ({
      ...layoutMapper,
      [layoutComponents.FORM_WRAPPER]: FormWrapper(layoutMapper[layoutComponents.FORM_WRAPPER])
    }),
    [layoutMapper]
  );

  const touch = 'ontouchstart' in document.documentElement;

  return (
    <DndProvider backend={touch ? TouchBackend : HTML5Backend}>
      <div className="dialog-editor">
          <div className="dialog-toolbox">
            <div className="preview-switch">
              <Switch onText="View" offText="Edit" value={preview} inverse={true} onChange={() => setPreview(!preview)}/>
            </div>
            <Toolbox dispatch={dispatch}/>
          </div>
          <div className={classSet('dialog-renderer', isDragging ? `drag-${isDragging}` : undefined)}>
            <Context.Provider value={dispatch}>
              <FormRender
                formFieldsMapper={preview ? playerFields : draggableFormFieldsMapper}
                layoutMapper={preview ? layoutMapper : draggableLayoutMapper}
                onSubmit={() => undefined}
                schema={schema}
                showFormControls={false}
              />
            </Context.Provider>
          </div>
        <div className="dialog-sidebar">
          <Sidebar schema={schema} edit={edit} dispatch={dispatch} />
        </div>
      </div>
    </DndProvider>
   )
};
