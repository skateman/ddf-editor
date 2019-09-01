import React, { useReducer, useMemo } from "react";
import FormRender, { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import { Grid, Row, Col } from 'patternfly-react';
import classSet from 'react-classset';

import Toolbox, { toolboxFields } from './toolbox';
import Draggable from './draggable';
import Reducer from './reducer';

export default ({...props}) => {
  const { schema:initialSchema } = props;
  const [{schema, isDragging}, dispatch] = useReducer(Reducer, {
    isDragging: false,
    schema: initialSchema
  });

  // Memoize the decorated component mapping for a better performance
  const draggableFormFieldsMapper = useMemo(
    () =>
      Object.keys(toolboxFields).reduce(
        (obj, key) => ({
          ...obj,
          [key]: Draggable(formFieldsMapper[key], dispatch)
        }),
        {...formFieldsMapper}
      ),
    [formFieldsMapper, dispatch]
  );

  return (
    <Grid fluid={true}>
      <Row>
        <Col xs={2} className="de-toolbox"><Toolbox/></Col>
        <Col xs={6} className={classSet({'de': true, 'drag': isDragging})}>
          <FormRender
            formFieldsMapper={draggableFormFieldsMapper}
            layoutMapper={layoutMapper}
            onSubmit={() => undefined}
            schema={schema}
          />
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Grid>
   )
};
