import "../UserSettings.scss";
import createDetailRow from '../../../components/DetailRow/DetailRow.js';
import createButton from '../../../components/Button/Button.js';
import template from './UserSettingsStatus.hbs?raw';

document.querySelector('#UserSettings').innerHTML = template;
const ClassNameRow = 'detail_row';
const ClassNameLabel = 'detail_label';
const ClassNameValue = 'detail_value';
const ClassNameButton = 'UserSettings__action';
const ClassNmaeButtonLogout = 'UserSettings__logout';
const rowData = [
  ['Почта', 'email_show', 'pochta@yandex.ru'],
  ['Логин', 'login_show', 'ivanivanov'],
  ['Имя', 'first_name_show', 'Иван'],
  ['Фамилия', 'second_name_show', 'Иванов'],
  ['Имя в чате', 'display_name_show', 'Иван'],
  ['Телефон', 'phone_show', '+7 (909) 967 30 30']  
];
const buttonData = [
  ['Изменить данные', 'change_data_show'],
  ['Изменить пароль', 'change_password_show'],
  ['Выйти', 'logout_show']
];
const containerElement = document.getElementById('UserSettingsBack_show');
containerElement.appendChild(createButton({
    label: "←",
    class_name: ['back-button'],
    class_name_span: "UserSettings__back",
    id_name: 'back_btn_show',
    onClick: () => alert('Кнопка нажата!')
}));
const rowElement = document.getElementById('UserSettingsDetails_show');
rowData.map(item => (
    rowElement.appendChild(createDetailRow({
      label: item[0],
      class_name__row: ClassNameRow,
      class_name__label: ClassNameLabel,
      class_name__value: ClassNameValue,
      id_value: item[1],
      value: item[2]
  }))
));
const actionElment = document.getElementById('UserSettingsActions_show');
buttonData.map(item => {actionElment.appendChild(createButton({
      label: item[0],
      class_name: [ClassNameButton, (item[1] === 'logout_show' ? ClassNmaeButtonLogout : '')],
      id_name: item[1],
      onClick: () => alert('Кнопка нажата!')
  }))
});
