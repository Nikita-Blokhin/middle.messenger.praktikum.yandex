import "../Error.scss";
// @ts-ignore
import template from './500.hbs?raw';

const element: HTMLDivElement = document.querySelector('#error500')!;
element.innerHTML = template;
