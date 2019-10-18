// This function can recursively traverse the schema to find an item with the passed name
// and apply the passed function on its parent. The return value is always a shallow copy
// of the incoming data. As this happens on each level of the recursion, the final result
// is a deep copy of the object including the changes applied by the passed function. The
// function is able to work with any object on any depth, except the very first one.
export const traverse = (data, name, fn) => {
  // When the name is set to undefined, we are actually working with the top-level dialog
  // information. As the passed function always operates with an array, this special case
  // needs a little hack. If there is a return array from the function, the first element
  // is extracted as the return value of the traversal.
  if (!name) {
    const _data = fn([data], 0);
    return _data ? { ..._data[0] } : { ...data };
  }

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
export const find = (data, name) => {
  let item = undefined;
  traverse(data, name, (fields, idx) => {
    item = fields[idx];
  });
  return item;
};

// Schema manipulation functions for inserting into an array in an immutable manner
export const insert = {
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

export const remove = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];
export const replace = (array, item, index) => [...array.slice(0, index), item, ...array.slice(index + 1)];

// Helper function to remove fields from an object that are set to `undefined`
export const compact = object =>
  Object.keys(object).reduce(
    (obj, key) =>
      object[key] === undefined ? obj : { ...obj, [key]: object[key] },
    {}
  );

// Function to generate a locally-unique identifier for a given item kind
export const genIdentifier = (kind, { ...fieldCounter }, haystack) => {
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
};
