// This function does a deep traversal of the haystack for the needles.
const traverse = ({ ...needles }, haystack, found = {}) => {
  if (typeof haystack === 'object' && Array.isArray(haystack.fields)) {
    haystack.fields.forEach((field, index) => {
      Object.keys(needles).forEach((needle) => {
        if (field.name === needles[needle]) {
          found[needle] = { fields:haystack.fields, field, index };
        }
      });

      traverse(needles, field, found);
    });
  }

  return found;
};

const parsePosition = (position) => {
   switch (position) {
     case 'after':
       return 1;
     case 'before':
       return -1;
     default:
       throw new Error();
   }
};

const randomName = (kind, fieldCounter, haystack) => {
  // Initialize the fieldCounter for the given component if not available
  if (!fieldCounter[kind]) {
    fieldCounter[kind] = 0;
  }

  let name, found;
  // Generate a name with an incremented number until there is no name collision
  do {
    name = `${kind}-${++fieldCounter[kind]}`;
    ({ found } = traverse({ found: name }, haystack));
  } while(found);

  return name;
};

export default (state, { type, ...action }) => {
  switch (type) {
    case 'dragStart':
      return { ...state, isDragging: true };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'dropNew': {
      const { target: { fields, index } } = traverse({target : action.target}, state.schema);
      const correction = parsePosition(action.position);

      fields.splice(index + correction, 0, {
        component: action.kind,
        name: randomName(action.kind, state.fieldCounter, state.schema),
        label: action.title
      });

      return { ...state, isDragging: false };
    }
    case 'dropExisting': {
      const {
        source: {
          fields: sourceFields,
          field: sourceField,
          index: sourceIndex
        },
        target: {
          fields: targetFields,
          index: targetIndex
        }
      } = traverse({ source: action.source, target: action.target }, state.schema);

      // The initial value of the index correction comes from the before/after position
      let correction = parsePosition(action.position);

      // If the context of the drag & drop happens in a single array
      if (sourceFields === targetFields) {
        // Ignore the operation if the item would be moved to its original place
        if (sourceIndex === targetIndex + correction) {
          return { ...state };
        }

        // The length of the target array is changing upon deletion
        correction -= 1;
      }

      sourceFields.splice(sourceIndex, 1); // Delete the source item from its original location
      targetFields.splice(targetIndex + correction, 0, sourceField); // Push the source item to its new location

      return { ...state, isDragging: false };
    }
    default:
      throw new Error();
  }
}
