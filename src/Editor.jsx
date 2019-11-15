import React, { useReducer } from "react";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import FormRender, { componentTypes, dataTypes } from '@data-driven-forms/react-form-renderer';
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

const draggableFieldsMapper = draggableDecorator(formFieldsMapper);
const draggableLayoutMapper = draggableDecorator(layoutMapper);
const previewFieldsMapper = playerDecorator(formFieldsMapper);
const previewLayoutMapper = layoutMapper;

const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: 'fa fa-font',
    defaultSchema: {
      type: 'text',
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
    defaultSchema: {
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  [componentTypes.SELECT]: {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
    defaultSchema: {
      dataType: dataTypes.STRING,
      isClearable: true,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' }
      ]
    }
  },
  [componentTypes.RADIO]: {
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
    defaultSchema: {
      dataType: dataTypes.STRING,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' }
      ]
    }
  },
  [componentTypes.DATE_PICKER]: {
    title: 'Datepicker',
    icon: 'fa fa-calendar',
    defaultSchema: {
      disabledDays: [{
        before: 'today'
      }],
      variant: 'date'
    }
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

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
