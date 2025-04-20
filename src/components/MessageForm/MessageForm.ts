// @ts-ignore
import template from './MessageForm.hbs?raw';
import Block from '../../utils/Block';

export interface MessageFormProps {
    formData?: {
        message: string
    }
    onSubmit?: (data: any) => void
    onClick?: (event: MouseEvent) => void
};

export class createMessageForm extends Block {
    constructor(props: MessageFormProps) {
        super('<form class="message-input-container" id="messageForm"><form/>', {
            ...props,
            template: template,
            events: {
                submit: props.onSubmit,
                click: props.onClick
            }
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
