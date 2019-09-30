import { componentTypes } from '@data-driven-forms/react-form-renderer';

const createSchema = () => ({
  fields: [
    {
      component: componentTypes.TABS,
      name: 'tabs',
      fields: [
        {
          component: componentTypes.TAB_ITEM,
          name: 'tab-item-1',
          title: 'Tab 1',
          fields: [
            {
              component: componentTypes.SUB_FORM,
              name: 'sub-form-1',
              title: 'Basic info',
              fields: [
                {
                  name: 'username',
                  label: 'Username',
                  component: componentTypes.TEXT_FIELD,
                  type: 'text',
                },
                {
                  name: 'password',
                  label: 'Password',
                  component: componentTypes.TEXT_FIELD,
                  type: 'password',
                },
              ]
            },
            {
              component: componentTypes.SUB_FORM,
              name: 'sub-form-2',
              title: 'Options',
              fields: [
                {
                  component: componentTypes.CHECKBOX,
                  name: 'remember',
                  label: 'Remember me',
                },
                {
                  component: componentTypes.SELECT,
                  name: "select-field-1",
                  label: "Dropdown 1",
                  options: [
                    {
                      value: 'foo',
                      label: 'foo'
                    },
                    {
                      value: 'bar',
                      label: 'bar'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          component: componentTypes.TAB_ITEM,
          name: 'tab-item-2',
          title: 'Tab 2',
          fields: [
            {
              component: componentTypes.SUB_FORM,
              name: 'sub-form-3',
              title: 'Extras',
              fields: []
            }
          ]
        }
      ]
    }
  ],
});

export default createSchema;
