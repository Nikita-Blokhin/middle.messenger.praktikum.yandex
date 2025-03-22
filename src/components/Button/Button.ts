// @ts-ignore
import template from './Button.hbs?raw';
import createItem from '../../utils/createItem';

function createButton(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        label: 'Кнопка',
        class_name: [''],
        class_name_span: '',
        id_name: 'button-id',
        onClick: () => {}
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const button: Element | null = createItem(template, mergedOptions);
    if (button) {
        button.addEventListener('click', mergedOptions.onClick);
    }

    return button;
};

export default createButton;
