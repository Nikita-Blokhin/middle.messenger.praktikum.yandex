import '../Auth.scss';
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
// @ts-ignore
import template from './Registrations.hbs?raw';

const element: HTMLDivElement = document.querySelector('#Registrations')!;
element.innerHTML = template;

const ClassNameGroup: string = 'authorization-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const inputFormData: string[][] = [
    ['Почта', 'email'], ['Логин', 'login'], ['Имя', 'first_name'],
    ['Фамилия', 'second_name'], ['Телефон', 'phone'], ['Пароль', 'password'],
    ['Пароль (еще раз)', 'password_retry']
];

const authElement: HTMLElement | null = document.getElementById('Registration_header');
authElement?.after (
    new createAuthForm({
        id_form: 'RegistrationForm',
        formData: {
            login: '',
            password: '',
            email: '',
            first_name: '',
            second_name: '',
            phone: '',
            password_retry: '',
        },
        onSubmit: (data) => { 
            console.log('Форма отправлена:', data);
            alert('Данные в консоле');
        }
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
