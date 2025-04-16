import '../Auth.scss';
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
// @ts-ignore
import template from './Authorization.hbs?raw';

const element: HTMLDivElement = document.querySelector('#Authorization')!;
element.innerHTML = template;

const ClassNameGroup: string = 'authorization-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const inputFormData: string[][] = [
    ['Логин', 'login'], ['Пароль', 'password']
];

const authElement: HTMLElement = document.getElementById('Authorization_header')!;
authElement?.after(
    new createAuthForm({
        id_form: 'AuthorizationForm',
        formData: {
            login: '',
            password: ''
        },
        onSubmit: (data) => { 
            console.log('Форма отправлена:', data);
            alert('Данные в консоле');
        }
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
    id_name: 'authorization',
}).element!);
