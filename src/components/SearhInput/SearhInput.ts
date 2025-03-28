// @ts-ignore
import template from './SearhInput.hbs?raw';
import Block from '../../utils/Block';

export class createSearhInput extends Block {
    constructor() {
        super('<div class="search-bar" id="search_bar">', {
            template: template,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
