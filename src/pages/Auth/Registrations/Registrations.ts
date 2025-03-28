import "../Auth.scss";
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
import inputDataToConsole from '../../../utils/DataToConsole.js';
// @ts-ignore
import template from './Registrations.hbs?raw';

const element: HTMLDivElement = document.querySelector('#Registrations')!;
element.innerHTML = template;

const ClassNameGroup: string = 'authorization-input-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const inputFormData: string[][] = [
  ['Почта', 'email'], ['Логин', 'login'], ['Имя', 'first_name'],
  ['Фамилия', 'second_name'], ['Телефон', 'phone'], ['Пароль', 'password'],
  ['Пароль (еще раз)', 'password_retry']
];

const authElement: HTMLElement | null = document.getElementById('Registrations_wrapper');
authElement?.appendChild(
    new createAuthForm({
        class_name_wrapper: 'authorization-block',
        label_h1: 'Регистрация',
        id_form: 'RegistrationForm',
        href_link: '../Authorization/Authorization.html',
        text_link: 'Войти'
    }).element!
);

const formElement: HTMLElement = document.getElementById('RegistrationForm')!;

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
    id_name: 'registration',
    label: 'Зарегистрироваться',
    class_name: 'authorization-button'
}).element!);

formElement.addEventListener('submit', () => inputDataToConsole(formElement));
