import React from 'react';
import ReactDOM from 'react-dom';
import { componentTypes, layoutComponents, dataTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch, Modal, Icon, Button } from 'patternfly-react';

import Editor from '../src';

import PlayerField from './PlayerField';
import EditableTabs from './EditableTabs';
import EditableSection from './EditableSection';
import EditableFormWrapper from './EditableFormWrapper';
import FieldArray from './FieldArray';
import editSchema from './editSchema';

import schema from './schema';

import './style.scss';

const draggableDecorators = {
  [componentTypes.SUB_FORM]: EditableSection,
  [componentTypes.TABS]: EditableTabs,
  [layoutComponents.FORM_WRAPPER]: EditableFormWrapper,
};

const previewFieldsMapper = Object.keys(formFieldsMapper).reduce((obj, key) => ({
  ...obj,
  [key]: PlayerField(formFieldsMapper[key]),
}), {});

const customReducer = (state, { type, ...action }, helpers) => {
  switch (type) {
    case 'newSection': {
      const [id, fieldCounter] = helpers.genIdentifier(componentTypes.SUB_FORM, state.fieldCounter, state.schema);

      const item = {
        component: componentTypes.SUB_FORM,
        name: `${componentTypes.SUB_FORM}-${id}`,
        title: `Section ${id}`,
        visible: true,
        fields: [],
      };

      const schema = helpers.traverse(state.schema, action.target, (fields, idx) => helpers.insert.child(fields, item, idx));

      return { ...state, schema, fieldCounter };
    }
    case 'newTab': {
      // Foe a better experience, a new tab always contains an new empty section
      const [tId, fc] = helpers.genIdentifier(componentTypes.TAB_ITEM, state.fieldCounter, state.schema);
      const [sId, fieldCounter] = helpers.genIdentifier(componentTypes.SUB_FORM, fc, state.schema);

      const item = {
        component: componentTypes.TAB_ITEM,
        name: `${componentTypes.TAB_ITEM}-${tId}`,
        title: `Tab ${tId}`,
        visible: true,
        fields: [
          {
            component: componentTypes.SUB_FORM,
            name: `${componentTypes.SUB_FORM}-${sId}`,
            title: `Section ${sId}`,
            fields: [],
          },
        ],
      };

      const schema = helpers.traverse(state.schema, action.target, (fields, idx) => helpers.insert.child(fields, item, idx));

      return { ...state, schema, fieldCounter };
    }
    default:
      return undefined;
  }
};

const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: <Icon type="fa" name="font" />,
    defaultSchema: {
      type: 'text',
      dataType: dataTypes.STRING,
    },
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: <Icon type="fa" name="file-text-o" />,
    defaultSchema: {
      dataType: dataTypes.STRING,
    },
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: <Icon type="fa" name="check-square-o" />,
  },
  [componentTypes.SELECT]: {
    title: 'Dropdown',
    icon: <Icon type="fa" name="caret-square-o-down" />,
    defaultSchema: {
      dataType: dataTypes.STRING,
      isClearable: true,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ],
    },
  },
  [componentTypes.RADIO]: {
    title: 'Radio Button',
    icon: <Icon type="fa" name="circle-o" />,
    defaultSchema: {
      dataType: dataTypes.STRING,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ],
    },
  },
  [componentTypes.DATE_PICKER]: {
    title: 'Datepicker',
    icon: <Icon type="fa" name="calendar" />,
    defaultSchema: {
      disabledDays: [{
        before: 'today',
      }],
      variant: 'date',
    },
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: <Icon type="fa" name="tags" />,
  },
};

const PreviewSwitch = ({ value, onChange }) => <Switch onText="View" offText="Edit" value={value} inverse onChange={onChange} />;

const EditIcon = <Icon type="fa" name="pencil" fixedWidth />;
const DeleteIcon = <Icon type="fa" name="times" fixedWidth />;

const PropertiesModal = ({ title, show, onHide, container, children }) => (
  <Modal container={container} show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ children }</Modal.Body>
  </Modal>
);

const FormControls = (disabled, schema) => <Button disabled={disabled} bsStyle="primary" onClick={() => console.log(schema)}>Submit</Button>;

const editorFieldsMapper = {
  ...formFieldsMapper,
  [componentTypes.FIELD_ARRAY]: FieldArray,
};

const App = () => (
  <Editor
    draggableDecorators={draggableDecorators}
    draggableFieldsMapper={formFieldsMapper}
    draggableLayoutMapper={layoutMapper}
    previewFieldsMapper={previewFieldsMapper}
    previewLayoutMapper={layoutMapper}
    editorFieldsMapper={editorFieldsMapper}
    editorLayoutMapper={layoutMapper}
    EditIcon={EditIcon}
    DeleteIcon={DeleteIcon}
    customReducer={customReducer}
    editSchema={editSchema}
    toolboxFields={toolboxFields}
    initialSchema={schema}
    PreviewSwitch={PreviewSwitch}
    PropertiesModal={PropertiesModal}
    FormControls={FormControls}
  />
);

ReactDOM.render(<App/>, document.querySelector('body'));
