import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { dialogItemKinds } from './constants';

import { traverse, find, insert, remove, replace, compact, genIdentifier } from './schema';

export default (state, { type, ...action }) => {
  switch (type) {
    case 'editStart': {
      const item = find(state.schema, action.target);
      return { ...state, edit: { target: action.target, item }};
    }
    case 'editSave': {
      const schema = traverse(state.schema, action.target, (fields, idx) => replace(fields, compact({ ...fields[idx], ...action.values }), idx));

      return { ...state, schema, edit: undefined };
    }
    case 'editEnd':
      return { ...state, edit: undefined }
    case 'dragStart':
      return { ...state, isDragging: action.itemType };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'dropNew': {
      const [id, fieldCounter] = genIdentifier(action.kind, state.fieldCounter, state.schema);

      const item = {
        component: action.kind,
        name: `${action.kind}-${id}`,
        label: `${action.title} ${id}`,
        visible: true,
        ...dialogItemKinds[action.kind].defaultSchema
      };

      const schema = traverse(state.schema, action.target, (fields, idx) => insert[action.position](fields, item, idx));

      return {...state, schema, fieldCounter, isDragging: false};
    }
    case 'dropExisting': {
      let item;

      const _schema = traverse(state.schema, action.source, (fields, idx) => {
        item = fields[idx];
        return remove(fields, idx);
      });


      const schema = traverse(_schema, action.target, (fields, idx) => {
        return insert[action.position](fields, item, idx);
      });

      return { ...state, schema, isDragging: false };
    }
    case 'newSection': {
      const [id, fieldCounter] = genIdentifier(componentTypes.SUB_FORM, state.fieldCounter, state.schema);

      const item = {
        component: componentTypes.SUB_FORM,
        name: `${componentTypes.SUB_FORM}-${id}`,
        title: `Section ${id}`,
        visible: true,
        fields: []
      };

      const schema = traverse(state.schema, action.target, (fields, idx) => {
        return insert['child'](fields, item, idx);
      });

      return { ...state, schema, fieldCounter };
    }
    case 'newTab': {
      // Foe a better experience, a new tab always contains an new empty section
      const [tId, fc] = genIdentifier(componentTypes.TAB_ITEM, state.fieldCounter, state.schema);
      const [sId, fieldCounter] = genIdentifier(componentTypes.SUB_FORM, fc, state.schema);

      const item = {
        component: componentTypes.TAB_ITEM,
        name: `${componentTypes.TAB_ITEM}-${tId}`,
        title: `Tab ${tId}`,
        visible: true,
        fields: [
          {
            component: componentTypes.SUB_FORM,
            name: `${componentTypes.SUB_FORM}-${sId}`,
            title: `Section ${sId}`,
            fields: []
          }
        ]
      };

      const schema = traverse(state.schema, action.target, (fields, idx) => insert['child'](fields, item, idx));

      return { ...state, schema, fieldCounter };
    }
    case 'delete': {
      const schema = traverse(state.schema, action.source, remove);
      // If the deleted item is currently being edited, it should be removed from the state
      const edit = state.edit && action.source !== state.edit.target ? state.edit : undefined;
      return { ...state, schema, edit };
    }
    default:
      throw new Error();
  }
};
