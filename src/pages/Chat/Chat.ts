import "./Chat.scss";
// @ts-ignore
import template from './Chat.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#chat');
if (element) {
    element.innerHTML = template;
};
