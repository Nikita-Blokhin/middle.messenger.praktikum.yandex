// @ts-ignore
import template from './SearhInput.hbs?raw';
import Block from '../../utils/Block';

export interface SearhInputProps {};

export class createSearhInput extends Block {
    constructor(props: SearhInputProps) {
        super(`<div class="search-bar" id="search_bar">`, {
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
