import { componentTypes, dataTypes } from '@data-driven-forms/react-form-renderer';

import { OPTIONS } from './Options';
import { DEFAULT_DATE } from './DefaultDate';

const commonFields = [
  {
    name: 'name',
    label: 'Name',
    component: componentTypes.TEXT_FIELD
  },
  {
    name: 'label',
    label: 'Label',
    component: componentTypes.TEXT_FIELD
  },
  {
    name: 'description',
    label: 'Description',
    component: componentTypes.TEXT_FIELD
  },
  {
    name: 'helperText',
    label: 'Help',
    component: componentTypes.TEXT_FIELD
  },
  {
    name: 'visible',
    label: 'Visible',
    component: componentTypes.CHECKBOX
  },
  {
    name: 'isRequired',
    label: 'Required',
    component: componentTypes.CHECKBOX
  },
  {
    name: 'isReadOnly',
    label: 'Read only',
    component: componentTypes.CHECKBOX
  }
];

const dataType = {
  name: 'dataType',
  label: 'Submit as',
  component: componentTypes.SELECT,
  options: [
    { label: 'String', value: dataTypes.STRING },
    { label: 'Number', value: dataTypes.NUMBER }
  ]
};

const defaultString = {
  name: 'initialValue',
  label: 'Default value',
  component: componentTypes.TEXT_FIELD
};

const validator = {
  name: 'validate[0].pattern',
  label: 'Validator',
  component: componentTypes.TEXT_FIELD
};

export const editSchema = {
  [componentTypes.TEXT_FIELD]: [
    ...commonFields,
    validator,
    defaultString,
    dataType,
    {
      name: 'type',
      label: 'Input type',
      component: componentTypes.SELECT,
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Password', value: 'password' },
      ]
    }
  ],
  [componentTypes.TEXTAREA_FIELD]: [
    ...commonFields,
    validator,
    defaultString,
    dataType
  ],
  [componentTypes.CHECKBOX]: [
    ...commonFields,
    {
      name: 'initialValue',
      label: 'Checked',
      component: componentTypes.CHECKBOX
    }
  ],
  [componentTypes.SELECT]: [
    ...commonFields,
    dataType,
    {
      component: componentTypes.TEXT_FIELD,
      name: 'initialValue',
      type: 'hidden'
    },
    {
      name: 'options',
      label: 'Options',
      component: OPTIONS
    }
  ],
  [componentTypes.RADIO]: [
    ...commonFields,
    dataType,
    {
      component: componentTypes.TEXT_FIELD,
      name: 'initialValue',
      type: 'hidden'
    },
    {
      name: 'options',
      label: 'Options',
      component: OPTIONS
    }
  ],
  [componentTypes.DATE_PICKER]: [
    ...commonFields,
    {
      name: 'disabledDays[0][before]',
      label: 'Disable past dates',
      component: componentTypes.CHECKBOX
    },
    {
      name: 'variant',
      component: componentTypes.SELECT,
      label: 'Variant',
      options: [
        {
          label: 'Date',
          value: 'date'
        },
        {
          label: 'Datetime',
          value: 'date-time'
        }
      ]
    },
    {
      name: 'initialValue',
      label: 'Default value',
      component: componentTypes.DATE_PICKER
    }
  ],
  [componentTypes.TAG_CONTROL]: [
    ...commonFields
  ],
  [componentTypes.SUB_FORM]: [
    {
      name: 'name',
      label: 'Name',
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'title',
      label: 'Title',
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'description',
      label: 'Description',
      component: componentTypes.TEXTAREA_FIELD
    }
  ],
  [componentTypes.TAB_ITEM]: [
    {
      name: 'name',
      label: 'Name',
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'title',
      label: 'Title',
      component: componentTypes.TEXT_FIELD
    }
  ],
  undefined: [ // special case for the top-level dialog information
    {
      name: 'label',
      label: 'Label',
      component: componentTypes.TEXT_FIELD
    },
    {
      name: 'description',
      label: 'Description',
      component: componentTypes.TEXTAREA_FIELD,
      rows: 6
    },
  ]
};
