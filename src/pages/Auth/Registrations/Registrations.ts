import "../Auth.scss";
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
// @ts-ignore
import template from './Registrations.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#Registrations');
if (element) {
    element.innerHTML = template;
};

const ClassNameGroup: string = 'Authorization__input-group';
const ClassNameLabel: string = 'Authorization__label';
const ClassNameInput: string = 'Authorization__input';
const formElement: HTMLElement | null = document.getElementById('RegistrationForm');
const inputFormData: string[][] = [
  ['Почта', 'email'], ['Логин', 'login'], ['Имя', 'first_name'],
  ['Фамилия', 'second_name'], ['Телефон', 'phone'], ['Пароль', 'password'],
  ['Пароль (еще раз)', 'password_retry']
];

if (formElement){
    inputFormData.map(item => (
        formElement.appendChild(new createInputForm({
            label: item[0],
            class_name__group: ClassNameGroup,
            class_name__label: ClassNameLabel,
            class_name__input: ClassNameInput,
            id_name: item[1]
        }).element!)
    ));
    const button = new createButton({
        id_name: 'registration',
        label: 'Зарегистрироваться',
        class_name: 'Authorization__button',
        onClick: () => alert('Кнопка нажата!')
    }).element;
    if (button) {
        formElement.appendChild(button);
    };
};
