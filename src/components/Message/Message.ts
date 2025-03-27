// @ts-ignore
import template from './Message.hbs?raw';
import Block from '../../utils/Block';

export interface InputFormProps {
    id_name: string
    class_name_position: string
    message_text: string
    time_text: string
};

export class createMessage extends Block {
    constructor(props: InputFormProps) {
        super(`<div class="message ${props.class_name_position}" id="${props.id_name}">><div>`, {
        ...props,
        template: template,
        attrs: {},
        events: {}
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
