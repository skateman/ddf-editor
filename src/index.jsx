import React from "react";
import ReactDOM from "react-dom";
import { componentTypes, layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';

import Editor from './Editor';

import PlayerField from './automate/PlayerField';
import EditableTabs from './automate/EditableTabs';
import EditableSection from './automate/EditableSection';
import EditableFormWrapper from './automate/EditableFormWrapper';

import createSchema from './demo-schema';

import './style.scss';

const draggableDecorators = {
  [componentTypes.SUB_FORM]: EditableSection,
  [componentTypes.TABS]: EditableTabs,
  [layoutComponents.FORM_WRAPPER]: EditableFormWrapper,
};

const previewFieldsMapper = Object.keys(formFieldsMapper).reduce((obj, key) => ({
  ...obj,
  [key]: PlayerField(formFieldsMapper[key])
}), {})

function App() {
  return (
    <Editor
      draggableDecorators={draggableDecorators}
      draggableFieldsMapper={formFieldsMapper}
      draggableLayoutMapper={layoutMapper}
      previewFieldsMapper={previewFieldsMapper}
      previewLayoutMapper={layoutMapper}
      initialSchema={createSchema()}
      onSubmit={() => undefined}
    />
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
