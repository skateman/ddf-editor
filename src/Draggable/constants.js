import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import { dialogItemKinds } from '../constants';

const partial = (fn, ...apply) => (...args) => fn(...apply, ...args);

export const draggableFields = Object.keys(dialogItemKinds)
  .filter(key => dialogItemKinds[key].decorator)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: partial(dialogItemKinds[key].decorator, formFieldsMapper[key])
    }),
    {}
  );
