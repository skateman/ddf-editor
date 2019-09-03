import { componentTypes } from '@data-driven-forms/react-form-renderer';

const createSchema = () => ({
  fields: [
    {
      component: componentTypes.TABS,
      name: 'tabs',
      fields: [
        {
          component: componentTypes.TAB,
          name: 'tab-item-1',
          title: 'Tab 1',
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
          ]
        },
        {
          component: componentTypes.TAB,
          name: 'tab-item-2',
          title: 'Tab 2',
          fields: []
        }
      ]
    }
  ],
});

export default createSchema;
