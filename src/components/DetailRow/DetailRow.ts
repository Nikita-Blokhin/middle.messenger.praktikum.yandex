// @ts-ignore
import template from './DetailRow.hbs?raw';
import createItem from '../../utils/createItem';

function createDetailRow(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        label: 'Поле',
        value: 'Значение',
        class_name__row: '',
        class_name__label: '',
        class_name__value: '',
        id_value: 'input-id',
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    return createItem(template, mergedOptions);
};

export default createDetailRow;
