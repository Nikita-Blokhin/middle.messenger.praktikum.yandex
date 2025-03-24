// @ts-ignore
import template from './DateDivider.hbs?raw';
import createItem from '../../utils/createItem';

function createDateDivider(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        id_name: '',
        date_text: ''
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const date_divider: Element | null  = createItem(template, mergedOptions);
    return date_divider;
};

export default createDateDivider;
