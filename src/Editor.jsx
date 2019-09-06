import React, { useState, useReducer, useMemo } from "react";
import FormRender, { layoutComponents, componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Switch } from 'patternfly-react';
import classSet from 'react-classset';

import Toolbox, { toolboxFields } from './Toolbox';
import Properties from './Properties';
import DraggableTabs from './DraggableTabs';
import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import Reducer from './Reducer';

export default ({...props}) => {
  const { schema:initialSchema } = props;
  const [preview, setPreview] = useState(false);
  const [{schema, isDragging}, dispatch] = useReducer(Reducer, {
    isDragging: false,
    fieldCounter: {},
    schema: initialSchema,
  });

  // Memoize the decorated component mapping for a better performance
  const draggableFormFieldsMapper = useMemo(
    () =>
      Object.keys(toolboxFields).reduce(
        (obj, key) => ({
          ...obj,
          [key]: DraggableInput(formFieldsMapper[key], dispatch)
        }),
        {
          ...formFieldsMapper,
          [componentTypes.SUB_FORM]: DraggableSection(formFieldsMapper[componentTypes.SUB_FORM], dispatch),
          [componentTypes.TABS]: DraggableTabs(dispatch)
        }
      ),
    [formFieldsMapper, dispatch]
  );

  const dragClass = isDragging ? `drag-${isDragging}` : undefined;

  return (
    <div className="dialog-editor">
      <div className="dialog-toolbox">
        <div className="preview-switch">
          <Switch onText="Preview" offText="Editor" value={preview} inverse={true} onChange={() => setPreview(!preview)}/>
        </div>
        <Toolbox dispatch={dispatch}/>
      </div>
      <div className={classSet('dialog-renderer', dragClass)}>
        <FormRender
          formFieldsMapper={preview ? formFieldsMapper : draggableFormFieldsMapper}
          layoutMapper={layoutMapper}
          onSubmit={() => undefined}
          schema={schema}
          showFormControls={false}
        />
      </div>
      <div className="dialog-properties flex-col-lg-4">
        <Properties schema={schema} />
      </div>
    </div>
   )
};
