import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import Input from './Input';
import Section from './Section';
import Tabs from './Tabs';

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
};

export const fields = Object.keys(draggables)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: draggables[key](formFieldsMapper[key])
    }),
    { ...formFieldsMapper }
  );
