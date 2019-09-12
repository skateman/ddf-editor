import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';

import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import DraggableTabs from './DraggableTabs';

const partial = (fn, ...apply) => (...args) => fn(...apply, ...args);

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    component: DraggableInput,
    toolbox: {
      title: 'Text Box',
      icon: 'fa fa-font',
    },
  },
  [componentTypes.TEXTAREA_FIELD]: {
    component: DraggableInput,
    toolbox: {
      title: 'Text Area',
      icon: 'fa fa-file-text-o',
    },
  },
  [componentTypes.CHECKBOX]: {
    component: DraggableInput,
    toolbox: {
      title: 'Checkbox',
      icon: 'fa fa-check-square-o',
    },
  },
  [componentTypes.SELECT]: {
    component: DraggableInput,
    toolbox: {
      title: 'Dropdown',
      icon: 'fa fa-caret-square-o-down',
    },
  },
  [componentTypes.RADIO]: {
    component: DraggableInput,
    toolbox: {
      title: 'Radio Button',
      icon: 'fa fa-circle-o',
    },
  },
  [componentTypes.DATE_PICKER]: {
    component: DraggableInput,
    toolbox: {
      title: 'Datepicker',
      icon: 'fa fa-calendar',
    },
  },
  [componentTypes.TIME_PICKER]: {
    component: DraggableInput,
    toolbox: {
      title: 'Timepicker',
      icon: 'fa fa-clock-o',
    },
  },
  [componentTypes.TAG_CONTROL]: {
    component: DraggableInput,
    toolbox: {
      title: 'Tag Control',
      icon: 'fa fa-tags',
    },
  },
  [componentTypes.TABS]: {
    component: DraggableTabs,
  },
  [componentTypes.SUB_FORM]: {
    component: DraggableSection,
  },
};

export const draggableFields = Object.keys(dialogItemKinds).reduce(
  (obj, key) => ({
    ...obj,
    [key]: partial(dialogItemKinds[key].component, formFieldsMapper[key])
  }),
  {}
);

export const itemTypes = {
  INPUT: 'input',
  SECTION: 'section',
  TAB_ITEM: 'tab-item'
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
