import template from './ImgButton.hbs?raw';
import createItem from '../../utils/createItem';

function createImgButton(options) {
    const defaultOptions = {
        label: 'Кнопка',
        class_name: [''],
        img_src: '',
        img_alt: '',
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

export default createImgButton;
