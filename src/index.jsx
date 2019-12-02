import React from "react";
import ReactDOM from "react-dom";
import { componentTypes, layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import { Modal } from 'patternfly-react';

import Editor from './Editor';

import PlayerField from './automate/PlayerField';
import EditableTabs from './automate/EditableTabs';
import EditableSection from './automate/EditableSection';
import EditableFormWrapper from './automate/EditableFormWrapper';

import schema from './demo-schema';

import './style.scss';

const draggableDecorators = {
  [componentTypes.SUB_FORM]: EditableSection,
  [componentTypes.TABS]: EditableTabs,
  [layoutComponents.FORM_WRAPPER]: EditableFormWrapper,
};

const previewFieldsMapper = Object.keys(formFieldsMapper).reduce((obj, key) => ({
  ...obj,
  [key]: PlayerField(formFieldsMapper[key])
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
        fields: []
      };

      const schema = helpers.traverse(state.schema, action.target, (fields, idx) => {
        return helpers.insert['child'](fields, item, idx);
      });

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
            fields: []
          }
        ]
      };

      const schema = helpers.traverse(state.schema, action.target, (fields, idx) => helpers.insert['child'](fields, item, idx));

      return { ...state, schema, fieldCounter };
    }
  }
};

const PreviewSwitch = ({ value, onChange }) => <Switch onText="View" offText="Edit" value={value} inverse={true} onChange={onChange}/>;

const PropertiesModal = ({ title, show, onHide, container, children }) => (
  <Modal container={container} show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ children }</Modal.Body>
  </Modal>
);

function App() {
  return (
    <Editor
      draggableDecorators={draggableDecorators}
      draggableFieldsMapper={formFieldsMapper}
      draggableLayoutMapper={layoutMapper}
      previewFieldsMapper={previewFieldsMapper}
      previewLayoutMapper={layoutMapper}
      customReducer={customReducer}
      initialSchema={schema}
      onSubmit={() => undefined}
      PreviewSwitch={PreviewSwitch}
      PropertiesModal={PropertiesModal}
    />
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
