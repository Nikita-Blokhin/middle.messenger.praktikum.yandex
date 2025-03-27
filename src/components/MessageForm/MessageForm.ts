// @ts-ignore
import template from './MessageForm.hbs?raw';
import Block from '../../utils/Block';

export interface MessageFormProps {};

export class createMessageForm extends Block {
  constructor(props: MessageFormProps) {
    super(`<form class="message-input-container" id="messageForm"><form/>`, {
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
