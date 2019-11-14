import React, { useState, useReducer } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import './style.scss';

import draggableDecorator from './Draggable/decorator';
import playerFields from './Player/fields';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';

const draggableFieldsMapper = draggableDecorator(formFieldsMapper);
const draggableLayoutMapper = draggableDecorator(layoutMapper);

export const Context = React.createContext({});

export default ({ schema : initialSchema }) => {
  const [preview, setPreview] = useState(false);
  const [{ schema, isDragging, edit }, dispatch] = useReducer(reducer, {
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

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
                formFieldsMapper={preview ? playerFields : draggableFieldsMapper}
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
