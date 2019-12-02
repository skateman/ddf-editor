import { traverse, find, insert, remove, replace, compact, genIdentifier } from './schema';

export default (fn = (() => undefined)) => (state, { type, ...action }) => {
  switch (type) {
    case 'dragStart':
      return { ...state, isDragging: action.itemType };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'togglePreview':
      return { ...state, edit: undefined, preview: !action.preview }
    case 'editEnd':
      return { ...state, edit: undefined }
    case 'editStart': {
      const item = find(state.schema, action.target);
      return { ...state, edit: { target: action.target, item }};
    }
    case 'editSave': {
      // Merge together the original values with the changed ones
      const values = [...Object.keys(state.edit.item), ...Object.keys(action.values)].reduce(
        (obj, key) =>
          state.edit.item[key] === action.values[key]
            ? obj
            : { ...obj, [key]: action.values[key] },
        {}
      );

      const schema = traverse(state.schema, action.target, (fields, idx) => replace(fields, compact({ ...fields[idx], ...values }), idx));

      return { ...state, schema, edit: undefined };
    }
    case 'dropNew': {
      const [id, fieldCounter] = genIdentifier(action.kind, state.fieldCounter, state.schema);

      const item = {
        component: action.kind,
        name: `${action.kind}-${id}`,
        label: `${action.title} ${id}`,
        visible: true,
        ...action.defaultSchema
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
    case 'delete': {
      const schema = traverse(state.schema, action.source, remove);
      // If the deleted item is currently being edited, it should be removed from the state
      const edit = state.edit && action.source !== state.edit.target ? state.edit : undefined;
      return { ...state, schema, edit };
    }
    default: {
      // Try to run the external reducer if available
      const result = fn(state, { type, ...action }, { traverse, find, insert, remove, replace, compact, genIdentifier });
      if (result) {
        return result;
      } else {
        throw new Error();
      }
    }
  }
};
