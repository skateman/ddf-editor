import { componentTypes } from '@data-driven-forms/react-form-renderer';

const createSchema = () => ({
  fields: [
    {
      component: componentTypes.TABS,
      name: 'tabs',
      visible: true,
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
              visible: true,
              fields: [
                {
                  name: 'username',
                  label: 'Username',
                  visible: true,
                  component: componentTypes.TEXT_FIELD,
                  submitAs: 'string',
                  type: 'text',
                },
                {
                  name: 'password',
                  label: 'Password',
                  visible: false,
                  component: componentTypes.TEXT_FIELD,
                  submitAs: 'string',
                  type: 'password',
                },
              ]
            },
            {
              component: componentTypes.SUB_FORM,
              name: 'sub-form-2',
              title: 'Options',
              visible: true,
              fields: [
                {
                  component: componentTypes.CHECKBOX,
                  name: 'remember',
                  label: 'Remember me',
                  visible: true,
                },
                {
                  component: componentTypes.SELECT,
                  name: "select-field-1",
                  label: "Dropdown 1",
                  visible: true,
                  submitAs: 'string',
                  initialValue: 'foo',
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
          visible: true,
          fields: [
            {
              component: componentTypes.SUB_FORM,
              name: 'sub-form-3',
              title: 'Extras',
              visible: true,
              fields: []
            }
          ]
        }
      ]
    }
  ],
});

export default createSchema;
