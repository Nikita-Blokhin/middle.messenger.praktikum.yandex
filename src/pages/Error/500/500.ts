import '../Error.scss';
// @ts-ignore
import template from './500.hbs?raw';
import BasePage from '../../BasePage';

export default class ErrorPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', '500-page');
    };

    render() {
        const content = this.getContent();
        content.innerHTML = '';

        content.innerHTML = template;
    };
};
