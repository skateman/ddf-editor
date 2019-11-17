import React, { useReducer } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import './style.scss';

import draggableDecorator from './Draggable/decorator';
import playerDecorator from './Player/decorator';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';
import editSchema from './editSchema';
import toolboxFields from './toolboxFields';

const draggableFieldsMapper = draggableDecorator(formFieldsMapper);
const draggableLayoutMapper = draggableDecorator(layoutMapper);
const previewFieldsMapper = playerDecorator(formFieldsMapper);
const previewLayoutMapper = layoutMapper;

export const Context = React.createContext({});

export default ({ schema : initialSchema }) => {
  const [{ schema, isDragging, edit, preview }, dispatch] = useReducer(reducer, {
    preview: false,
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

  const touch = 'ontouchstart' in document.documentElement;

  return (
    <DndProvider backend={touch ? TouchBackend : HTML5Backend}>
      <div className="dialog-editor">
          <div className="dialog-toolbox">
            <Toolbox Switch={Switch} preview={preview} dispatch={dispatch} fields={toolboxFields}/>
          </div>
          <div className={classSet('dialog-renderer', isDragging ? `drag-${isDragging}` : undefined)}>
            <Context.Provider value={dispatch}>
              <FormRender
                formFieldsMapper={preview ? previewFieldsMapper : draggableFieldsMapper}
                layoutMapper={preview ? previewLayoutMapper : draggableLayoutMapper}
                onSubmit={() => undefined}
                schema={schema}
                showFormControls={false}
              />
            </Context.Provider>
          </div>
        <div className="dialog-sidebar">
          <Sidebar editSchema={editSchema} schema={schema} edit={edit} dispatch={dispatch} />
        </div>
      </div>
    </DndProvider>
   )
};
