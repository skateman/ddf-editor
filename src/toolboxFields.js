import { componentTypes, dataTypes } from '@data-driven-forms/react-form-renderer';

const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: 'fa fa-font',
    defaultSchema: {
      type: 'text',
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
    defaultSchema: {
      dataType: dataTypes.STRING
    }
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  [componentTypes.SELECT]: {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
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
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
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
    title: 'Datepicker',
    icon: 'fa fa-calendar',
    defaultSchema: {
      disabledDays: [{
        before: 'today'
      }],
      variant: 'date'
    }
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

export default toolboxFields;
