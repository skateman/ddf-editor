import { componentTypes, dataTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const postProcessValidation = ({ isRequired, validate : [{ pattern }] = [{}] }) => {
  const validate = !pattern && !isRequired ? undefined : [
    pattern ? { type: validatorTypes.PATTERN_VALIDATOR, pattern } : undefined,
    isRequired ? { type: validatorTypes.REQUIRED } : undefined
  ].filter(Boolean);

  return { isRequired, validate };
};

const postProcessInitialValues = ({ initialValue = [], options = [], multi }) => {
  const opts = options.map(option => option.value);

  if (!multi) {
    return { initialValue: opts.includes(initialValue) ? initialValue : undefined };
  }

  const filtered = initialValue.filter(value => opts.includes(value));
  return { initialValue: filtered.length > 0 ? filtered : undefined };
}

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
    component: componentTypes.CHECKBOX,
    DDF: {
      postProcess: postProcessValidation
    }
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
  component: componentTypes.TEXT_FIELD,
  DDF: {
    postProcess: postProcessValidation
  },
};

const editSchemas = {
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
    {
      name: 'multi',
      label: 'Multiselect',
      component: componentTypes.CHECKBOX,
      DDF: {
        synchronize: 'multi',
      }
    },
    {
      ...dataType,
      DDF: {
        synchronize: 'dataType'
      }
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'initialValue',
      type: 'hidden',
      DDF: {
        postProcess: postProcessInitialValues
      }
    },
    {
      name: 'options',
      label: 'Options',
      component: componentTypes.FIELD_ARRAY,
      itemDefault: {},
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'label',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'value',
        }
      ]
    }
  ],
  [componentTypes.RADIO]: [
    ...commonFields,
    {
      ...dataType,
      DDF: {
        synchronize: 'dataType'
      }
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'initialValue',
      type: 'hidden',
      DDF: {
        postProcess: postProcessInitialValues
      }
    },
    {
      name: 'options',
      label: 'Options',
      component: componentTypes.FIELD_ARRAY,
      itemDefault: {},
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'label',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'value',
        }
      ]

    }
  ],
  [componentTypes.DATE_PICKER]: [
    ...commonFields,
    {
      name: 'disabledDays[0][before]',
      label: 'Disable past dates',
      component: componentTypes.CHECKBOX,
      DDF: {
        synchronize: 'disabledDays',
        postProcess: ({ disabledDays: [{ before: disablePast }] = [{}] }) => ({ disabledDays: disablePast ? [{ before: 'today' }] : undefined })
      }
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
      ],
      DDF: {
        synchronize: 'variant'
      }
    },
    {
      name: 'initialValue',
      label: 'Default value',
      component: componentTypes.DATE_PICKER,
      DDF: {
        preProcess: ({ variant, disabledDays }) => ({ variant, disabledDays })
      }
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

export default editSchemas;
