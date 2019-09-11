import React, { useState, useReducer, useMemo } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import './style.scss';

import { draggableFields } from './constants';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import Reducer from './Reducer';

export default ({...props}) => {
  const { schema:initialSchema } = props;
  const [preview, setPreview] = useState(false);
  const [{ schema, isDragging, edit }, dispatch] = useReducer(Reducer, {
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
          [key]: draggableFields[key](dispatch)
        }),
        {
          ...formFieldsMapper
        }
      ),
    [draggableFields, formFieldsMapper, dispatch]
  );

  const touch = 'ontouchstart' in document.documentElement;

  return (
    <div className="dialog-editor">
      <DndProvider backend={touch ? TouchBackend : HTML5Backend}>
        <div className="dialog-toolbox">
          <div className="preview-switch">
            <Switch onText="View" offText="Edit" value={preview} inverse={true} onChange={() => setPreview(!preview)}/>
          </div>
          <Toolbox dispatch={dispatch}/>
        </div>
        <div className={classSet('dialog-renderer', isDragging ? `drag-${isDragging}` : undefined)}>
          <FormRender
            formFieldsMapper={preview ? formFieldsMapper : draggableFormFieldsMapper}
            layoutMapper={layoutMapper}
            onSubmit={() => undefined}
            schema={schema}
            showFormControls={false}
          />
        </div>
      </DndProvider>
      <div className="dialog-sidebar">
        <Sidebar schema={schema} edit={edit} />
      </div>
    </div>
   )
};
