import '../Error.scss';
// @ts-ignore
import template from './404.hbs?raw';
import BasePage from '../../BasePage';

export default class NotFoundPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', '404-page');
    };

    render_page() {
        const content = this.getContent();
        content.innerHTML = '';

        content.innerHTML = template;
    };
};
