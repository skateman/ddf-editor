import { formFieldsMapper } from '@data-driven-forms/pf3-component-mapper';
import PlayerInput from './Input';

export const playerFields = Object.keys(formFieldsMapper)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: PlayerInput(formFieldsMapper[key])
    }),
    {}
  );
