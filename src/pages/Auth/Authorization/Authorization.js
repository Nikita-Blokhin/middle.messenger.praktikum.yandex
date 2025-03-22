import "../Auth.scss";
import createButton from '../../../components/Button/Button.js';
import createInputForm from '../../../components/InputForm/InputForm.js';
import template from './Authorization.hbs?raw';

document.querySelector('#Authorization').innerHTML = template;
const ClassNameGroup = 'Authorization__group';
const ClassNameLabel = 'Authorization__label';
const ClassNameInput = 'Authorization__input';
const inputFormData = [
  ['Логин', 'login'], ['Пароль', 'password']
];
const formElement = document.getElementById('AuthorizationForm');
inputFormData.map(item => (
    formElement.appendChild(createInputForm({
      label: item[0],
      class_name__group: ClassNameGroup,
      class_name__label: ClassNameLabel,
      class_name__input: ClassNameInput,
      id_name: item[1]
  }))
));
formElement.appendChild(createButton({
    label: 'Авторизоваться',
    class_name: ['Authorization__button'],
    id_name: 'Authorization__button',
    onClick: () => alert('Кнопка нажата!')
}));
