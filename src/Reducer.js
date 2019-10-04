import { componentTypes } from '@data-driven-forms/react-form-renderer';

import { dialogItemKinds } from './constants';

// This function can recursively traverse the schema to find an item with the passed name
// and apply the passed function on its parent. The return value is always a shallow copy
// of the incoming data. As this happens on each level of the recursion, the final result
// is a deep copy of the object including the changes applied by the passed function. The
// function is able to work with any object on any depth, except the very first one.
const traverse = (data, name, fn) => {
  if (Array.isArray(data.fields)) {
    // Try to find the child object with the passed name among fields
    const idx = data.fields.findIndex(field => field.name === name);
    if (idx === -1) { // If the object is not found, proceed recursively on all children
      return { ...data, fields: data.fields.map(field => traverse(field, name, fn)) };
    }
    // Apply the passed function on the children
    return { ...data, fields: fn(data.fields, idx) };
  }

  return { ...data };
};

// Helper function to find an item by using traverse
const find = (data, name) => {
  let item = undefined;
  traverse(data, name, (fields, idx) => {
    item = fields[idx];
  });
  return item;
}

// Schema manipulation functions for inserting into an array in an immutable manner
const insert = {
  before: (array, item, index) => [
    ...array.slice(0, index),
    item,
    ...array.slice(index)
  ],
  after: (array, item, index) => [
    ...array.slice(0, index + 1),
    item,
    ...array.slice(index + 1)
  ],
  child: (array, item, index) => [
    ...array.slice(0, index),
    {
      ...array[index],
      fields: [...array[index].fields, item]
    },
    ...array.slice(index + 1)
  ]
};

const parseIndex = str => parseInt(str.replace(/options\[(\d+)\]/, '$1'));

const remove = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];
const replace = (array, item, index) => [...array.slice(0, index), item, ...array.slice(index + 1)];

// Function to generate a locally-unique identifier for a given item kind
const genIdentifier = (kind, { ...fieldCounter }, haystack) => {
  // Initialize the fieldCounter for the given component kind if not available
  if (!fieldCounter[kind]) {
    fieldCounter[kind] = 0;
  }

  let id, found = false;
  // Generate a new ID by incrementing until there is no name collision
  do {
    id = ++fieldCounter[kind];
    found = false;

    traverse(haystack, `${kind}-${id}`, (fields) => {
      found = true
      return [...fields];
    });
  } while(found);

  return [id, fieldCounter];
}

export default (state, { type, ...action }) => {
  switch (type) {
    case 'editStart': {
      const item = find(state.schema, action.target);
      return { ...state, edit: { target: action.target, item }};
    }
    case 'editOptionDelete': {
      const options = remove(state.edit.item.options, action.index);
      return { ...state, edit: { ...state.edit, item: { ...state.edit.item, options } } }
    }
    case 'editOptionAdd': {
      const options = [...state.edit.item.options || [], {}];
      return { ...state, edit: { ...state.edit, item: { ...state.edit.item, options } } }
    }
    case 'editOptionDrop': {
      const sourceIndex = parseIndex(action.source);
      const targetIndex = parseIndex(action.target);

      const __options = state.edit.item.options;
      const _options = remove(__options, sourceIndex);
      const options = insert[action.position](_options, __options[sourceIndex], _options.indexOf(__options[targetIndex]))

      return { ...state, edit: { ...state.edit, item: { ...state.edit.item, options } }, isDragging: false };
    }
    case 'editOptionStore': {
      return { ...state, edit: { ...state.edit, item: { ...state.edit.item, options: action.values } } }
    }
    case 'editSave': {
      if (action.values.name) {
        const duplicate = find(state.schema, action.values.name);
        if (duplicate) {
          const edit = { ...state.edit, error: 'The entered name already exists in the schema, duplications are not allowed.' };
          return { ...state, edit };
        }
      }

      const schema = traverse(state.schema, action.target, (fields, idx) => replace(fields, { ...fields[idx], ...state.edit.item, ...action.values }, idx));

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
}
