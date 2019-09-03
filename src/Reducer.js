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
     case 'before':
       return 0;
     case 'after':
       return 1;
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
      // As there is no deletion, the target index doesn't change
      const positionAdjust = parsePosition(action.position);

      fields.splice(index + positionAdjust, 0, {
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
          field: targetField,
          index: targetIndex
        }
      } = traverse({ source: action.source, target: action.target }, state.schema);

      // The initial value of the position adjustment comes from the before/after position
      let positionAdjust = parsePosition(action.position);

      // Delete the source item from its original location
      sourceFields.splice(sourceIndex, 1);

      // If both the source and target are in the same array, the indexes might be changed upon deletion. This can
      // be corrected by decrementing the positionAdjust by 1
      if (sourceFields === targetFields && targetFields[targetIndex] !== targetField) {
        positionAdjust -= 1;
      }


      // Push the source item to its new adjusted position before or after the target
      targetFields.splice(targetIndex + positionAdjust, 0, sourceField);

      return { ...state, isDragging: false };
    }
    case 'newTab': {
      const { target: { field } } = traverse({ target: action.target }, state.schema);
      field.fields.push({
        component: 'tab-item',
        name: randomName('tab-item', state.fieldCounter, state.schema),
        title: `Tab ${state.fieldCounter['tab-item']}`,
        fields: []
      });

      return { ...state };
    }
    case 'delete': {
      const { source: { fields, index } } = traverse({source : action.source}, state.schema);

      fields.splice(index, 1);

      return { ...state }
    }
    default:
      throw new Error();
  }
}
