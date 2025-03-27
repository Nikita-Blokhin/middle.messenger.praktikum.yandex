import "../Error.scss";
// @ts-ignore
import template from './404.hbs?raw';

const element: HTMLDivElement = document.querySelector('#error404')!;
element.innerHTML = template;
