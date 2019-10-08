import { componentTypes } from '@data-driven-forms/react-form-renderer';

import DraggableInput from './Draggable/Input';
import DraggableSection from './Draggable/Section';
import DraggableTabs from './Draggable/Tabs';

export const dialogItemKinds = {
  [componentTypes.TEXT_FIELD]: {
    decorator: DraggableInput,
    defaultSchema: {
      type: 'text',
      submitAs: 'string'
    }
  },
  [componentTypes.TEXTAREA_FIELD]: {
    decorator: DraggableInput,
    defaultSchema: {
      submitAs: 'string'
    }
  },
  [componentTypes.CHECKBOX]: {
    decorator: DraggableInput,
  },
  [componentTypes.SELECT]: {
    decorator: DraggableInput,
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
    defaultSchema: {
      disabledDays: [{
        before: 'today'
      }],
      variant: 'date'
    }
  },
  [componentTypes.TAG_CONTROL]: {
    decorator: DraggableInput,
  },
  [componentTypes.SUB_FORM]: {
    decorator: DraggableSection
  },
  [componentTypes.TABS]: {
    decorator: DraggableTabs,
  },
  [componentTypes.TAB_ITEM]: {}
};
