// @ts-ignore
import template from './ContactItem.hbs?raw';
import Block from '../../utils/Block';

export interface ContactItemProps {
    class_name_contact_item: string
    class_name_contact_avatar: string
    class_name_contact_info: string
    class_name_contact_header: string
    class_name_contact_name: string
    class_name_contact_message: string
    class_name_message_info: string
    class_name_unread_badge: string
    class_name_contact_time: string
    type_name?: string
    id_name: string
    avatar_src: string
    contact_name: string
    contact_message: string
    unread_badge: string
    contact_time: string
    onClick?: Function
};

export class createContactItem extends Block {
    constructor(props: ContactItemProps) {
        super(`<button class="${props.class_name_contact_item}" id="${props.id_name}" type="${props.type_name}"></button>`, {
            ...props,
            template: template,
            attrs: {},
            events: {
                click: props.onClick
            }
        });
        this.props.type_name = this.props.type_name ? this.props.type_name : 'button';
    };

    render() {
        return this.compile(template as string, this.props);

    };
};
