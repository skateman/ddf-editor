import { componentTypes } from '@data-driven-forms/react-form-renderer';

export const toolboxFields = {
  [componentTypes.TEXT_FIELD]: {
    title: 'Text Box',
    icon: 'fa fa-font',
  },
  [componentTypes.TEXTAREA_FIELD]: {
    title: 'Text Area',
    icon: 'fa fa-file-text-o',
  },
  [componentTypes.CHECKBOX]: {
    title: 'Checkbox',
    icon: 'fa fa-check-square-o',
  },
  [componentTypes.SELECT]: {
    title: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
  },
  [componentTypes.RADIO]: {
    title: 'Radio Button',
    icon: 'fa fa-circle-o',
  },
  [componentTypes.DATE_PICKER]: {
    title: 'Datepicker',
    icon: 'fa fa-calendar',
  },
  [componentTypes.TIME_PICKER]: {
    title: 'Timepicker',
    icon: 'fa fa-clock-o',
  },
  [componentTypes.TAG_CONTROL]: {
    title: 'Tag Control',
    icon: 'fa fa-tags',
  },
};

