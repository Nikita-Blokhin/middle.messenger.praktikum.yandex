import "../Auth.scss";
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
import inputDataToConsole from '../../../utils/DataToConsole.js';
// @ts-ignore
import template from './Authorization.hbs?raw';
import { nanoid } from 'nanoid';

const element: HTMLDivElement = document.querySelector('#Authorization')!;
element.innerHTML = template;

const ClassNameGroup: string = 'authorization-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const inputFormData: string[][] = [
  ['Логин', 'login'], ['Пароль', 'password']
];

const authElement: HTMLElement = document.getElementById('Authorization_wrapper')!;
authElement?.appendChild(
    new createAuthForm({
        class_name_wrapper: 'authorization-block',
        label_h1: 'Вход',
        id_form: 'AuthorizationForm',
        href_link: '../Registrations/Registrations.html',
        text_link: 'Нет аккаунта?'
    }).element!
);

const formElement: HTMLElement = document.getElementById('AuthorizationForm')!;
inputFormData.map(item => (
    formElement.appendChild(new createInputForm({
        label: item[0],
        class_name__group: ClassNameGroup,
        class_name__label: ClassNameLabel,
        class_name__input: ClassNameInput,
        id_name: item[1]
    }).element!)
));

formElement.appendChild(new createButton({
    label: 'Авторизоваться',
    class_name: 'authorization-button',
    id_name: nanoid(6),
    }).element!);

formElement.addEventListener('submit', () => inputDataToConsole(formElement));
