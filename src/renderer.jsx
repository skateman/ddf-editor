import React, { useReducer, useMemo } from "react";
import FormRender, { layoutComponents } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import classSet from 'react-classset';
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
      Object.keys(formFieldsMapper).reduce(
        (obj, key) => ({
          ...obj,
          [key]: Draggable(formFieldsMapper[key], dispatch)
        }),
        {}
      ),
    [formFieldsMapper, dispatch]
  );

  return (
    <div className={classSet({'de': true, 'drag': isDragging})}>
      <FormRender
        formFieldsMapper={draggableFormFieldsMapper}
        layoutMapper={layoutMapper}
        onSubmit={() => undefined}
        schema={schema}
      />
    </div>
   )
};
