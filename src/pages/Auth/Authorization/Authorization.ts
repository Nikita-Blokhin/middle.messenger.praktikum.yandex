import "../Auth.scss";
import createButton from '../../../components/Button/Button.js';
import createInputForm from '../../../components/InputForm/InputForm.js';
// @ts-ignore
import template from './Authorization.hbs?raw';

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
      formElement.appendChild(createInputForm({
        label: item[0],
        class_name__group: ClassNameGroup,
        class_name__label: ClassNameLabel,
        class_name__input: ClassNameInput,
        id_name: item[1]
    }))
  ));

  const button: Element = createButton({
      label: 'Авторизоваться',
      class_name: ['Authorization__button'],
      id_name: 'Authorization__button',
      onClick: () => alert('Кнопка нажата!')
  });
  if (button) {
    formElement.appendChild(button);
  };
};
