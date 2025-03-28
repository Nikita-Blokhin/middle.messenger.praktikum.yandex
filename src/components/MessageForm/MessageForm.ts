// @ts-ignore
import template from './MessageForm.hbs?raw';
import Block from '../../utils/Block';

export class createMessageForm extends Block {
    constructor() {
        super('<form class="message-input-container" id="messageForm"><form/>', {
            template: template,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
