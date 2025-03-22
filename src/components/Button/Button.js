import template from './Button.hbs?raw';
import createItem from '../../utils/createItem';

function createButton(options) {
    const defaultOptions = {
        label: 'Кнопка',
        class_name: [''],
        class_name_span: '',
        id_name: 'button-id',
        onClick: () => {}
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    const button = createItem(template, mergedOptions);
    button.addEventListener('click', mergedOptions.onClick);

    return button;
};

export default createButton;
