// @ts-ignore
import template from './InputForm.hbs?raw';
import createItem from '../../utils/createItem';

function createInputForm(options: Record<string, any>): Element {
    const defaultOptions: Record<string, string> = {
        label: 'Поле',
        class_name__group: '',
        class_name__label: '',
        class_name__input: '',
        id_name: 'input-id'
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    return createItem(template, mergedOptions);
};

export default createInputForm;
