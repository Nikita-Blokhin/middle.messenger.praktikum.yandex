import "../Error.scss";
// @ts-ignore
import template from './500.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#error500');
if (element) {
    element.innerHTML = template;
};
