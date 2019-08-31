import { componentTypes } from '@data-driven-forms/react-form-renderer';

const createSchema = () => ({
  fields: [
    {
      name: 'username',
      label: 'Username',
      component: componentTypes.TEXT_FIELD,
    }, {
      name: 'password',
      label: 'Password',
      component: componentTypes.TEXT_FIELD,
      type: 'password',
    }, {
      component: componentTypes.CHECKBOX,
      name: 'remember',
      label: 'Remember me',
    }
  ],
});

export default createSchema;
