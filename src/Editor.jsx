import React, { useReducer, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender from '@data-driven-forms/react-form-renderer';
import classNames from 'classnames';

import DraggableField from './DraggableField';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';

const Editor = ({
  draggableDecorators = {},
  draggableFieldsMapper: _draggableFieldsMapper,
  draggableLayoutMapper: _draggableLayoutMapper,
  previewFieldsMapper,
  previewLayoutMapper,
  editorFieldsMapper,
  editorLayoutMapper,
  EditIcon,
  DeleteIcon,
  customReducer,
  editSchema,
  toolboxFields,
  initialSchema,
  PreviewSwitch,
  PropertiesModal,
}) => {
  const [{ schema, isDragging, edit, preview }, dispatch] = useReducer(reducer(customReducer), {
    preview: false,
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

  // Function that decorates all items in mapper with either the matching function from the decorators
  // or with the defaultDecorator, which is by default an identity function.
  const decorate = (mapper, decorators = {}, defaultDecorator = ident => ident) => Object.keys(mapper).reduce(
    (obj, key) => ({
      ...obj,
      [key]: decorators[key] ? decorators[key](mapper[key]) : defaultDecorator(mapper[key], EditIcon, DeleteIcon),
    }),
    mapper,
  );

  // Decorate the draggable mappers and memoize them for performance
  const draggableFieldsMapper = useMemo(() => decorate(_draggableFieldsMapper, draggableDecorators, DraggableField), [draggableDecorators, _draggableFieldsMapper]);
  const draggableLayoutMapper = useMemo(() => decorate(_draggableLayoutMapper, draggableDecorators), [draggableDecorators, _draggableLayoutMapper]);

  const touch = 'ontouchstart' in document.documentElement;

  return (
    <DndProvider backend={touch ? TouchBackend : HTML5Backend}>
      <div className="dialog-editor">
        <div className="dialog-content">
          <div className="dialog-toolbox">
            <Toolbox PreviewSwitch={PreviewSwitch} preview={preview} dispatch={dispatch} fields={toolboxFields} />
          </div>
          <div className={classNames('dialog-renderer', isDragging ? `drag-${isDragging}` : undefined)}>
            <ReducerContext.Provider value={dispatch}>
              <FormRender
                formFieldsMapper={preview ? previewFieldsMapper : draggableFieldsMapper}
                layoutMapper={preview ? previewLayoutMapper : draggableLayoutMapper}
                onSubmit={() => undefined}
                schema={schema}
                showFormControls={false}
              />
            </ReducerContext.Provider>
          </div>
          <div className="dialog-sidebar">
            <Sidebar
              formFieldsMapper={editorFieldsMapper}
              layoutMapper={editorLayoutMapper}
              PropertiesModal={PropertiesModal}
              editSchema={editSchema}
              schema={schema}
              edit={edit}
              dispatch={dispatch}
            />
          </div>
        </div>
        <div className="dialog-footer">
          Here be footers!
        </div>
      </div>
    </DndProvider>
  );
};

export const ReducerContext = React.createContext({});
export default Editor;
