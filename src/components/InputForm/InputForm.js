import template from './InputForm.hbs?raw';
import createItem from '../../utils/createItem';

function createInputForm(options) {
    const defaultOptions = {
        label: 'Поле',
        class_name__group: '',
        class_name__label: '',
        class_name__input: '',
        id_name: 'input-id'
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    return createItem(template, mergedOptions);
};

export default createInputForm;
