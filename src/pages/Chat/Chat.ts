import './Chat.scss';
// @ts-ignore
import template from './Chat.hbs?raw';
import BasePage from '../BasePage';

export default class ChatsPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'Chats-page');
    };

    render() {
        const element: HTMLDivElement | null = document.querySelector('#app');
        if (element) {
            element.innerHTML = template;
        };
    };
};
