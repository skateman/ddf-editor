import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';

import DraggableInput from './DraggableInput';
import DraggableSection from './DraggableSection';
import DraggableTabs from './DraggableTabs';
import { EDITABLE_PAIRS } from './EditablePairs';

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
    name: 'initialValue',
    label: 'Default value',
    component: componentTypes.TEXT_FIELD
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

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Text Box',
      icon: 'fa fa-font',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Text Area',
      icon: 'fa fa-file-text-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.CHECKBOX]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Checkbox',
      icon: 'fa fa-check-square-o',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.SELECT]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Dropdown',
      icon: 'fa fa-caret-square-o-down',
    },
    editSchema: {
      fields: [
        ...commonFields,
        {
          name: 'options',
          label: 'Options',
          component: EDITABLE_PAIRS
        }
      ]
    }
  },
  [componentTypes.RADIO]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Radio Button',
      icon: 'fa fa-circle-o',
    },
    editSchema: {
      fields: [
        ...commonFields,
        {
          name: 'options',
          label: 'Options',
          component: EDITABLE_PAIRS
        }
      ]
    }
  },
  [componentTypes.DATE_PICKER]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Datepicker',
      icon: 'fa fa-calendar',
    },
    editSchema: {
      fields: [
        ...commonFields,
        {
          name: 'variant',
          component: componentTypes.SELECT,
          label: 'Variant',
          initialValue: 'date',
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
      ]
    }
  },
  [componentTypes.TAG_CONTROL]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Tag Control',
      icon: 'fa fa-tags',
    },
    editSchema: {
      fields: [...commonFields]
    }
  },
  [componentTypes.SUB_FORM]: {
    decorator: DraggableSection,
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
    decorator: DraggableTabs,
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
  .filter(key => dialogItemKinds[key].decorator)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: partial(dialogItemKinds[key].decorator, formFieldsMapper[key])
    }),
    {}
  );

export const itemTypes = {
  INPUT: 'input',
  SECTION: 'section',
  TAB_ITEM: 'tab-item',
  OPTION: 'option'
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
