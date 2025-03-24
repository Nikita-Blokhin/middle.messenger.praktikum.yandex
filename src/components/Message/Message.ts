// @ts-ignore
import template from './Message.hbs?raw';
import createItem from '../../utils/createItem';

function createMessage(options: Record<string, any>): Element {
    const defaultOptions: Record<string, any> = {
        id_name: '',
        class_name_position: '',
        message_text: '',
        time_text: ''
    };

    const mergedOptions: Record<string, any> = {
        ...defaultOptions,
        ...options
    };
    const message: Element | null  = createItem(template, mergedOptions);
    return message;
};

export default createMessage;
