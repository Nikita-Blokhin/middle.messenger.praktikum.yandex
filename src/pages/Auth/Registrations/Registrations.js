import "../Auth.scss";
import createButton from '../../../components/Button/Button.js';
import createInputForm from '../../../components/InputForm/InputForm.js';
import template from './Registrations.hbs?raw';

document.querySelector('#Registrations').innerHTML = template;
const ClassNameGroup = 'Authorization__input-group';
const ClassNameLabel = 'Authorization__label';
const ClassNameInput = 'Authorization__input';
const formElement = document.getElementById('RegistrationForm');
const inputFormData = [
  ['Почта', 'email'], ['Логин', 'login'], ['Имя', 'first_name'],
  ['Фамилия', 'second_name'], ['Телефон', 'phone'], ['Пароль', 'password'],
  ['Пароль (еще раз)', 'password_retry']
];
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
    label: 'Зарегистрироваться',
    class_name: ['Authorization__button'],
    onClick: () => alert('Кнопка нажата!')
}));
