import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';

import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import DraggableTabs from './DraggableTabs';

const partial = (fn, ...apply) => (...args) => fn(...apply, ...args);

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
  }
];

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    component: DraggableInput,
    toolbox: {
      title: 'Text Box',
      icon: 'fa fa-font',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    component: DraggableInput,
    toolbox: {
      title: 'Text Area',
      icon: 'fa fa-file-text-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.CHECKBOX]: {
    component: DraggableInput,
    toolbox: {
      title: 'Checkbox',
      icon: 'fa fa-check-square-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.SELECT]: {
    component: DraggableInput,
    toolbox: {
      title: 'Dropdown',
      icon: 'fa fa-caret-square-o-down',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.RADIO]: {
    component: DraggableInput,
    toolbox: {
      title: 'Radio Button',
      icon: 'fa fa-circle-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.DATE_PICKER]: {
    component: DraggableInput,
    toolbox: {
      title: 'Datepicker',
      icon: 'fa fa-calendar',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.TIME_PICKER]: {
    component: DraggableInput,
    toolbox: {
      title: 'Timepicker',
      icon: 'fa fa-clock-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.TAG_CONTROL]: {
    component: DraggableInput,
    toolbox: {
      title: 'Tag Control',
      icon: 'fa fa-tags',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.SUB_FORM]: {
    component: DraggableSection,
    editSchema: {
      fields: [
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
      ]
    }
  },
  // The TABS component is mapped to be draggable, but it is unique and not editable. On the other hand
  // the TAB_ITEM component is not mapped but it is editable, therefore it has an editSchema.
  [componentTypes.TABS]: {
    component: DraggableTabs,
  },
  [componentTypes.TAB_ITEM]: {
    editSchema: {
      fields: [
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
      ]
    }
  },

};

export const draggableFields = Object.keys(dialogItemKinds)
  .filter(key => dialogItemKinds[key].component)
  .reduce(
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
