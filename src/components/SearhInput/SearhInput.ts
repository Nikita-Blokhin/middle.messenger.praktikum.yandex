// @ts-ignore
import template from './SearhInput.hbs?raw';
import createItem from '../../utils/createItem';

function createSearhInput(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        onClick: () => {}
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const input: Element | null  = createItem(template, mergedOptions);
    if (input) {
        input.addEventListener('click', mergedOptions.onClick);
    };
    return input;
};

export default createSearhInput;
