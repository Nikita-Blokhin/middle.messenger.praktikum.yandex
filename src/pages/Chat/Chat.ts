import "./Chat.scss";
// @ts-ignore
import template from './Chat.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#chat');
if (element) {
    element.innerHTML = template;
};

// document.querySelector('#Chat').innerHTML = `
//   <div>
//       Это чат
//       <input id="message" name="message" autocomplete="off" />
//   </div>
// `;
