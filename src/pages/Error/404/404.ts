import "../Error.scss";
// @ts-ignore
import template from './404.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#error404');
if (element) {
    element.innerHTML = template;
};
