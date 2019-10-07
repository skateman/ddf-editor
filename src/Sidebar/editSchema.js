import { componentTypes } from '@data-driven-forms/react-form-renderer';

import { EDITABLE_PAIRS } from './EditablePairs';

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

const submitAs = {
  name: 'submitAs',
  label: 'Submit as',
  component: componentTypes.SELECT,
  options: [
    { label: 'String', value: 'string' },
    { label: 'Integer', value: 'integer' }
  ]
};

const defaultString = {
  name: 'initialValue',
  label: 'Default value',
  component: componentTypes.TEXT_FIELD
};

export const editSchema = {
  [componentTypes.TEXT_FIELD]: [
    ...commonFields,
    defaultString,
    submitAs,
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
    defaultString,
    submitAs
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
    submitAs,
    {
      name: 'options',
      label: 'Options',
      component: EDITABLE_PAIRS
    }
  ],
  [componentTypes.RADIO]: [
    ...commonFields,
    submitAs,
    {
      name: 'options',
      label: 'Options',
      component: EDITABLE_PAIRS
    }
  ],
  [componentTypes.DATE_PICKER]: [
    ...commonFields,
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
};

export const dialogDetailsSchema = {
  fields: [
    {
      name: 'name',
      label: 'Name',
      component: componentTypes.TEXT_FIELD,
    },
    {
      name: 'description',
      label: 'Description',
      component: componentTypes.TEXTAREA_FIELD,
      rows: 6
    }
  ]
};
