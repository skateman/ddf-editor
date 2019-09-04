import React, { useReducer, useMemo } from "react";
import FormRender, { layoutComponents, componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Grid, Row, Col } from 'patternfly-react';
import classSet from 'react-classset';

import Toolbox, { toolboxFields } from './Toolbox';
import Properties from './Properties';
import DraggableTabs from './DraggableTabs';
import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import Reducer from './Reducer';

export default ({...props}) => {
  const { schema:initialSchema } = props;
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
    <Grid fluid={true}>
      <Row>
        <Col xs={1}>
          <Toolbox dispatch={dispatch}/>
        </Col>
        <Col xs={6} className={classSet('de', dragClass)}>
          <FormRender
            formFieldsMapper={draggableFormFieldsMapper}
            layoutMapper={layoutMapper}
            onSubmit={() => undefined}
            schema={schema}
            showFormControls={false}
          />
        </Col>
        <Col xs={5}>
          <Properties schema={schema} />
        </Col>
      </Row>
    </Grid>
   )
};
