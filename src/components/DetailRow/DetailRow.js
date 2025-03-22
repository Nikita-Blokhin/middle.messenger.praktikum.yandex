import template from './DetailRow.hbs?raw';
import createItem from '../../utils/createItem';

function createDetailRow(options) {
    const defaultOptions = {
        label: 'Поле',
        value: 'Значение',
        class_name__row: '',
        class_name__label: '',
        class_name__value: '',
        id_value: 'input-id',
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    return createItem(template, mergedOptions);
};

export default createDetailRow;
