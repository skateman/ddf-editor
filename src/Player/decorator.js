import PlayerInput from './Input';

const decorator = mapper => Object.keys(mapper)
  .reduce(
    (obj, key) => ({
      ...obj,
      [key]: PlayerInput(mapper[key])
    }),
    {}
  );

export default decorator;
