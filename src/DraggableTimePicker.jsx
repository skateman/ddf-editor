import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';

import DraggableInput from './DraggableInput';

const DraggableTimePicker = (_, dispatch) => {
  const Component = DraggableInput(formFieldsMapper[componentTypes.DATE_PICKER], dispatch);
  const fn = ({...props}) => <Component variant="date-time" {...props}/>;
  return fn;
};

export default DraggableTimePicker;