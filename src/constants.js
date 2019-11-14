import { componentTypes, dataTypes } from '@data-driven-forms/react-form-renderer';

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    defaultSchema: {
      type: 'text',
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    defaultSchema: {
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.CHECKBOX]: {},
  [componentTypes.SELECT]: {
    defaultSchema: {
      dataType: dataTypes.STRING,
      isClearable: true,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' }
      ]
    }
  },
  [componentTypes.RADIO]: {
    defaultSchema: {
      dataType: dataTypes.STRING,
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' }
      ]
    }
  },
  [componentTypes.DATE_PICKER]: {
    defaultSchema: {
      disabledDays: [{
        before: 'today'
      }],
      variant: 'date'
    }
  },
  [componentTypes.TAG_CONTROL]: {},
  [componentTypes.SUB_FORM]: {},
  [componentTypes.TABS]: {},
  [componentTypes.TAB_ITEM]: {}
};
