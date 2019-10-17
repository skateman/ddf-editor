export default (state, { type, formOptions, ...action }) => {
  switch (type) {
    case 'initialize': {
      const { variant, disabledDays, options, initialValue } = action;
      return { variant, disabledDays, options, initialValue };
    }
    case 'updateDatePicker': {
      const { variant, disabledDays } = action;
      return { ...state, variant, disabledDays };
    }
    case 'newOption': {
      const options = [...formOptions.getState().values.options, { label: '', value: '' }];
      formOptions.change('options', options);
      return { ...state, options };
    }
    case 'delOption': {
      const _options = formOptions.getState().values.options;
      const options = [ ..._options.slice(0, action.source), ..._options.slice(action.source + 1)];
      formOptions.change('options', options);
      return { ...state, options };
    }
    case 'checkDefault': {
      const options = formOptions.getState().values.options;
      const value = action.checked ? null : options[action.source].value;
      setTimeout(() => formOptions.change('initialValue', value));
      return { ...state, options, initialValue: value };
    }
  }
};
