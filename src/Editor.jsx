import React, { useState, useReducer } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import './style.scss';

import draggableDecorator from './Draggable/decorator';
import playerDecorator from './Player/decorator';
import Toolbox from './Toolbox';
import Sidebar from './Sidebar';
import reducer from './reducer';

const draggableFieldsMapper = draggableDecorator(formFieldsMapper);
const draggableLayoutMapper = draggableDecorator(layoutMapper);
const previewFieldsMapper = playerDecorator(formFieldsMapper);
const previewLayoutMapper = layoutMapper;

const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: 'fa fa-font',
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  [componentTypes.SELECT]: {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
  },
  [componentTypes.RADIO]: {
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
  },
  [componentTypes.DATE_PICKER]: {
    title: 'Datepicker',
    icon: 'fa fa-calendar',
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

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
            <Toolbox dispatch={dispatch} fields={toolboxFields}/>
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
          <Sidebar schema={schema} edit={edit} dispatch={dispatch} />
        </div>
      </div>
    </DndProvider>
   )
};
