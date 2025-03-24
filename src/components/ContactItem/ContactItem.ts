// @ts-ignore
import template from './ContactItem.hbs?raw';
import createItem from '../../utils/createItem';

function createContactItem(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        id_name: '',
        class_name_contact_item: '',
        class_name_contact_avatar: '',
        class_name_contact_info: '',
        class_name_contact_header: '',
        class_name_contact_name: '',
        class_name_contact_message: '',
        class_name_message_info: '',
        class_name_unread_badge: '',
        class_name_contact_time: '',
        avatar_src: '',
        contact_name: '',
        contact_message: '',
        unread_badge: '',
        contact_time: '',
        onClick: () => {}
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const button: Element | null  = createItem(template, mergedOptions);
    if (button) {
        button.addEventListener('click', mergedOptions.onClick);
    }
    return button;
};

export default createContactItem;
