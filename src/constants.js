import { componentTypes } from '@data-driven-forms/react-form-renderer';

import DraggableInput from './Draggable/Input';
import DraggableSection from './Draggable/Section';
import DraggableTabs from './Draggable/Tabs';

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Text Box',
      icon: 'fa fa-font',
    },
    defaultSchema: {
      type: 'text',
      submitAs: 'string'
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Text Area',
      icon: 'fa fa-file-text-o',
    },
    defaultSchema: {
      submitAs: 'string'
    }
  },
  [componentTypes.CHECKBOX]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Checkbox',
      icon: 'fa fa-check-square-o',
    }
  },
  [componentTypes.SELECT]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Dropdown',
      icon: 'fa fa-caret-square-o-down',
    },
    defaultSchema: {
      submitAs: 'string',
      options: [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
      ]
    }
  },
  [componentTypes.RADIO]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Radio Button',
      icon: 'fa fa-circle-o',
    },
    defaultSchema: {
      submitAs: 'string',
      options: [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
      ]
    }
  },
  [componentTypes.DATE_PICKER]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Datepicker',
      icon: 'fa fa-calendar',
    },
    defaultSchema: {
      variant: 'date'
    }
  },
  [componentTypes.TAG_CONTROL]: {
    decorator: DraggableInput,
    toolbox: {
      title: 'Tag Control',
      icon: 'fa fa-tags',
    }
  },
  [componentTypes.SUB_FORM]: {
    decorator: DraggableSection
  },
  [componentTypes.TABS]: {
    decorator: DraggableTabs,
  },
  [componentTypes.TAB_ITEM]: {}
};

export const itemTypes = {
  INPUT: 'input',
  SECTION: 'section',
  TAB_ITEM: 'tab-item',
  OPTION: 'option'
};
