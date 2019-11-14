import { componentTypes, layoutComponents } from '@data-driven-forms/react-form-renderer';

import Input from './Input';
import Section from './Section';
import Tabs from './Tabs';
import FormWrapper from './FormWrapper';

const draggables = {
  [componentTypes.TEXT_FIELD]: Input,
  [componentTypes.TEXTAREA_FIELD]: Input,
  [componentTypes.CHECKBOX]: Input,
  [componentTypes.SELECT]: Input,
  [componentTypes.RADIO]: Input,
  [componentTypes.DATE_PICKER]: Input,
  [componentTypes.TAG_CONTROL]: Input,
  [componentTypes.SUB_FORM]: Section,
  [componentTypes.TABS]: Tabs,
  [layoutComponents.FORM_WRAPPER]: FormWrapper,
};

const decorator = mapper => Object.keys(mapper).reduce(
  (obj, key) => ({
    ...obj,
    [key]: draggables[key] ? draggables[key](mapper[key]) : mapper[key]
  }),
  {}
);

export default decorator;
