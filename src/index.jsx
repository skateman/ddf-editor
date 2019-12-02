import React from "react";
import ReactDOM from "react-dom";
import { componentTypes, layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';

import Editor from './Editor';

import DraggableTabs from './Draggable/Tabs';
import DraggableSection from './Draggable/Section';
import FormWrapper from './Draggable/FormWrapper';

import createSchema from './demo-schema';

import './style.scss';

const draggableDecorators = {
  [componentTypes.SUB_FORM]: DraggableSection,
  [componentTypes.TABS]: DraggableTabs,
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
};

// TODO: extract this more as it is automate-specific
import PlayerInput from './Player/Input';
const previewFieldsMapper = Object.keys(formFieldsMapper).reduce((obj, key) => ({
  ...obj,
  [key]: PlayerInput(formFieldsMapper[key])
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
