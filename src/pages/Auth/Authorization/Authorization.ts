import '../Auth.scss';
import { createButton } from '../../../components/Button/Button.js';
import { createInputForm } from '../../../components/InputForm/InputForm.js';
import { createAuthForm } from '../../../components/AuthForm/AuthForm.js';
// @ts-ignore
import template from './Authorization.hbs?raw';
import BasePage from '../../BasePage';
import router from '../../../core/router';
import AuthController from '../../../controller/AuthController.js';

export default class LoginPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'login-page');
    }

    render() {
        const content = this.getContent();
        content.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;

        const ClassNameGroup = 'authorization-group';
        const ClassNameLabel = 'authorization-label';
        const ClassNameInput = 'authorization-input';
        const inputFormData = [
            ['Логин', 'login'],
            ['Пароль', 'password'],
        ];

        const authBlock = tempContainer.querySelector('#Authorization_block');
        const authHeader = tempContainer.querySelector('#Authorization_header');

        if (!authBlock || !authHeader) {
            console.error('Required elements not found in template');
            return;
        }

        // Создаем форму авторизации
        const authForm = new createAuthForm({
            id_form: 'AuthorizationForm',
            formData: {
                login: '',
                password: '',
            }
        });

        // Проверяем, что форма создалась корректно
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
                id_name: idName,
            });

            if (inputForm.element) {
                authForm.element.appendChild(inputForm.element);
            } else {
                console.error(`Ошибка при создании input form для ${idName}`);
            }
        }

        // Создаем и добавляем кнопку
        const button = new createButton({
            label: 'Авторизоваться',
            class_name: 'authorization-button',
            id_name: 'authorization',
            onClick: () => {
                AuthController.signIn(authForm.getFormData() as Record<string, string>).catch((error) => {
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

        // Вставляем форму после заголовка
        authHeader.after(authForm.element);

        // Добавляем обработчик для ссылки регистрации
        const signUpLink = authBlock.querySelector('a[href="/signup"]');
        if (signUpLink) {
            signUpLink.addEventListener('click', (e) => {
                e.preventDefault();
                router.go('/signup');
            });
        }

        // Теперь добавляем весь подготовленный контент на страницу
        content.appendChild(tempContainer.firstElementChild!);
    }
}

