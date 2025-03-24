// @ts-ignore
import template from './ImgButton.hbs?raw';
import createItem from '../../utils/createItem';

function createImgButton(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        label: 'Кнопка',
        class_name: [''],
        img_src: '',
        img_alt: '',
        id_name: 'button-id',
        onClick: () => {}
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const button: Element | null  = createItem(template, mergedOptions);
    if (button) {
        button.addEventListener('click', mergedOptions.onClick);
    };
    return button;
};

export default createImgButton;
