// import partial from 'lodash.partial';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';

import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import DraggableTabs from './DraggableTabs';

const partial = (fn, ...apply) => (...args) => fn(...apply, ...args);

// These two fields are not part of the toolbox, but still usable for drag&drop
const nonToolboxFields = {
  [componentTypes.SUB_FORM]: partial(DraggableSection, formFieldsMapper[componentTypes.SUB_FORM]),
  [componentTypes.TABS]: DraggableTabs
};

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

export const draggableFields = Object.keys(toolboxFields).reduce(
  (obj, key) => ({
    ...obj,
    [key]: partial(DraggableInput, formFieldsMapper[key])
  }),
  nonToolboxFields
);

export const itemTypes = {
  INPUT: 'input',
  SECTION: 'section',
  TAB_ITEM: 'tab-item'
};
