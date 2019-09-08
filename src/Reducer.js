import { componentTypes } from '@data-driven-forms/react-form-renderer';

// This function does a deep traversal of the haystack for the needles.
const traverse = ({ ...needles }, haystack, found = {}) => {
  if (typeof haystack === 'object' && Array.isArray(haystack.fields)) {
    haystack.fields.forEach((field, index) => {
      Object.keys(needles).forEach((needle) => {
        if (field.name === needles[needle]) {
          found[needle] = { parent:haystack, field, index };
        }
      });

      traverse(needles, field, found);
    });
  }

  return found;
};

const parsePosition = (position) => {
   switch (position) {
     case 'before':
       return 0;
     case 'after':
       return 1;
     default:
       throw new Error();
   }
};

const genIdentifier = (kind, { ...fieldCounter }, haystack) => {
  // Initialize the fieldCounter for the given component kind if not available
  if (!fieldCounter[kind]) {
    fieldCounter[kind] = 0;
  }

  let id, found;
  // Generate a new ID by incrementing until there is no name collision
  do {
    id = ++fieldCounter[kind];
    ({ found } = traverse({ found: `${kind}-${id}` }, haystack));
    // console.log(fieldCounter, `${kind}-${id}`, found);
  } while(found);

  return [id, fieldCounter];
}

export default (state, { type, ...action }) => {
  switch (type) {
    case 'dragStart':
      return { ...state, isDragging: action.itemType };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'dropNew': {
      const { target: { parent, field, index } } = traverse({target : action.target}, state.schema);

      const [id, fieldCounter] = genIdentifier(action.kind, state.fieldCounter, state.schema);

      const item = {
        component: action.kind,
        name: `${action.kind}-${id}`,
        label: `${action.title}-${id}`
      };

      // Dropping an item as a child, e.g. into an empty section
      if (action.position === 'child') {
        field.fields.push(item)
      } else {
        parent.fields.splice(index + parsePosition(action.position), 0, item);
      }

      return {...state, fieldCounter, isDragging: false};
    }
    case 'dropExisting': {
      const {
        source: {
          parent: sourceParent,
          field: sourceField,
          index: sourceIndex
        },
        target: {
          parent: targetParent,
          field: targetField,
          index: targetIndex
        }
      } = traverse({ source: action.source, target: action.target }, state.schema);

      // Delete the source item from its original location
      sourceParent.fields.splice(sourceIndex, 1);

      // Dropping an item as a child, e.g. into an empty section
      if (action.position === 'child') {
        targetField.fields.push(sourceField);
      } else {
        // The initial value of the position adjustment comes from the before/after position
        let positionAdjust = parsePosition(action.position);

        // If both the source and target are in the same array, the indexes might be changed upon deletion. This can
        // be corrected by decrementing the positionAdjust by 1
        if (sourceParent === targetParent && targetParent.fields[targetIndex] !== targetField) {
          positionAdjust -= 1;
        }

        // Push the source item to its new adjusted position before or after the target
        targetParent.fields.splice(targetIndex + positionAdjust, 0, sourceField);
      }

      return { ...state, isDragging: false };
    }
    case 'newSection': {
      const { target: { field } } = traverse({ target: action.target }, state.schema);

      const [id, fieldCounter] = genIdentifier(componentTypes.SUB_FORM, state.fieldCounter, state.schema);

      field.fields.push({
        component: componentTypes.SUB_FORM,
        name: `${componentTypes.SUB_FORM}-${id}`,
        title: `Section ${id}`,
        fields: []
      });

      return { ...state, fieldCounter };
    }
    case 'newTab': {
      const { target: { field } } = traverse({ target: action.target }, state.schema);

      // Foe a better experience, a new tab always contains an new empty section
      const [tId, fc] = genIdentifier(componentTypes.TAB_ITEM, state.fieldCounter, state.schema);
      const [sId, fieldCounter] = genIdentifier(componentTypes.SUB_FORM, fc, state.schema);

      field.fields.push({
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
      });

      return { ...state, fieldCounter };
    }
    case 'delete': {
      const { source: { parent, index } } = traverse({source : action.source}, state.schema);

      parent.fields.splice(index, 1);

      return { ...state }
    }
    default:
      throw new Error();
  }
}
