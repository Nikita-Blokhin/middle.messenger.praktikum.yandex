import "../Auth.scss";
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
// @ts-ignore
import template from './Authorization.hbs?raw';
import { nanoid } from 'nanoid';

const element: HTMLDivElement | null = document.querySelector('#Authorization');
if (element) {
    element.innerHTML = template;
};

const ClassNameGroup: string = 'Authorization__group';
const ClassNameLabel: string = 'Authorization__label';
const ClassNameInput: string = 'Authorization__input';
const inputFormData: string[][] = [
  ['Логин', 'login'], ['Пароль', 'password']
];
const formElement: HTMLElement | null = document.getElementById('AuthorizationForm');

if (formElement) {
  inputFormData.map(item => (
        formElement.appendChild(new createInputForm({
            label: item[0],
            class_name__group: ClassNameGroup,
            class_name__label: ClassNameLabel,
            class_name__input: ClassNameInput,
            id_name: item[1]
        }).element!)
    ));

    // @ts-ignore
    const button = new createButton({
        label: 'Авторизоваться',
        class_name: 'Authorization__button',
        id_name: nanoid(6),
        onClick: () => {
            alert('Кнопка нажата!');
        }
    });

    if (button.element) {
        formElement.appendChild(button.element);
    };
};

const form = document.getElementById('AuthorizationForm');
if (form) {
    form.addEventListener('submit', () => {
        const data: Record<string, any> = {};
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        console.log(data);
        alert(String(data));
    });
};
