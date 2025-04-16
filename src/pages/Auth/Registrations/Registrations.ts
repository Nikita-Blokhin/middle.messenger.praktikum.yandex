import '../Auth.scss';
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
// @ts-ignore
import template from './Registrations.hbs?raw';
import BasePage from '../../BasePage';
import router from '../../../core/router';
import AuthController from '../../../controller/AuthController.js';

export default class SignUpPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
    // Явно передаем строку 'div' как tagName
        super('div', 'login-page');
    }

    render() {
        const content = this.getContent();
        content.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;

        const ClassNameGroup: string = 'authorization-group';
        const ClassNameLabel: string = 'authorization-label';
        const ClassNameInput: string = 'authorization-input';
        const inputFormData: string[][] = [
            ['Почта', 'email'], ['Логин', 'login'], ['Имя', 'first_name'],
            ['Фамилия', 'second_name'], ['Телефон', 'phone'], ['Пароль', 'password'],
            ['Пароль (еще раз)', 'password_retry']
        ];

        const authElement = tempContainer.querySelector('#Registration_header');
        const formElement = tempContainer.querySelector('#Registration_header');
        
        if (!authElement || !formElement) {
            console.error('Required elements not found in template');
            return;
        }

        const authForm = new createAuthForm({
            id_form: 'RegistrationForm',
            formData: {
                login: '',
                password: '',
                email: '',
                first_name: '',
                second_name: '',
                phone: '',
                password_retry: '',
            }
        });

        if (!authForm.element) {
            console.error('Auth form element не найден!');
            return;
        }

        for (const [label, idName] of inputFormData) {
            const inputForm = new createInputForm({
                label: label,
                class_name__group: ClassNameGroup,
                class_name__label: ClassNameLabel,
                class_name__input: ClassNameInput,
                id_name: idName
            });

            if (inputForm.element) {
                authForm.element.appendChild(inputForm.element);
            } else {
                console.error(`Ошибка при создании input form для ${idName}`);
            }
        }

        const button = new createButton({
            label: 'Зарегистрироваться',
            class_name: 'authorization-button',
            id_name: 'registration',
            onClick: () => {
                AuthController.signUp(authForm.getFormData() as Record<string, string>).catch((error) => {
                    console.error('Ошибка входа:', error);
                });
                console.log('Форма отправлена:', authForm.getFormData());
            }
        });

        if (button.element) {
            authForm.element.appendChild(button.element);
        } else {
            console.error('Button element не найден!');
        }

        const signUpLink = formElement.querySelector('a[href="/signin"]');
        if (signUpLink) {
            signUpLink.addEventListener('click', (e) => {
                e.preventDefault();
                router.go('/signin');
            });
        }

        authElement.after(authForm.element);
        content.appendChild(tempContainer.firstElementChild!);
    }
}