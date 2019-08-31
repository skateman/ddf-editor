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

export default (state, { type, ...action }) => {
  switch (type) {
    case 'dragStart':
      return { ...state, isDragging: true };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'dropExisting':
      var {
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
      var correction = parsePosition(action.position);

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

      return { ...state };
    default:
      throw new Error();
  }
}
