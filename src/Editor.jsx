import React, { useReducer, useMemo } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender from '@data-driven-forms/react-form-renderer';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import DraggableInput from './Draggable/Input';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';
import editSchema from './editSchema';
import toolboxFields from './toolboxFields';

export const Context = React.createContext({});

// Function that decorates all items in mapper with either the matching function from the decorators
// or with the defaultDecorator, which is by default an identity function.
const decorate = (mapper, decorators = {}, defaultDecorator = ident => ident) => Object.keys(mapper).reduce(
  (obj, key) => ({
    ...obj,
    [key]: decorators[key] ? decorators[key](mapper[key]) : defaultDecorator(mapper[key])
  }),
  mapper
);

export default ({
  draggableDecorators = {},
  draggableFieldsMapper : _draggableFieldsMapper,
  draggableLayoutMapper : _draggableLayoutMapper,
  previewFieldsMapper,
  previewLayoutMapper,
  initialSchema,
  onSubmit
}) => {
  const [{ schema, isDragging, edit, preview }, dispatch] = useReducer(reducer, {
    preview: false,
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

  // Decorate the draggable mappers and memoize them for performance
  const draggableFieldsMapper = useMemo(() => decorate(_draggableFieldsMapper, draggableDecorators, DraggableInput), [draggableDecorators, _draggableFieldsMapper]);
  const draggableLayoutMapper = useMemo(() => decorate(_draggableLayoutMapper, draggableDecorators), [draggableDecorators, _draggableLayoutMapper]);

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
                onSubmit={onSubmit}
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
