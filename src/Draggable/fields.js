import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import { dialogItemKinds } from '../constants';

const fields = Object.keys(dialogItemKinds)
  .filter(key => dialogItemKinds[key].decorator)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: dialogItemKinds[key].decorator(formFieldsMapper[key])
    }),
    {}
  );

export default fields;
