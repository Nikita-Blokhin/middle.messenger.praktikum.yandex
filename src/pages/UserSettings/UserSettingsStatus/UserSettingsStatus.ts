import "../UserSettings.scss";
import createDetailRow from '../../../components/DetailRow/DetailRow.js';
import createButton from '../../../components/Button/Button.js';
import createImgButton from '../../../components/ImgButton/ImgButton.js';
// @ts-ignore
import template from './UserSettingsStatus.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#UserSettings');
if (element) {
    element.innerHTML = template;
};

const ClassNameRow: string = 'detail_row';
const ClassNameLabel: string = 'detail_label';
const ClassNameValue: string = 'detail_value';
const ClassNameButton: string = 'UserSettings__action';
const ClassNmaeButtonLogout: string = 'UserSettings__logout';
const rowData: string [][] = [
  ['Почта', 'email_show', 'pochta@yandex.ru'],
  ['Логин', 'login_show', 'ivanivanov'],
  ['Имя', 'first_name_show', 'Иван'],
  ['Фамилия', 'second_name_show', 'Иванов'],
  ['Имя в чате', 'display_name_show', 'Иван'],
  ['Телефон', 'phone_show', '+7 (909) 967 30 30']  
];
const buttonData: string[][] = [
  ['Изменить данные', 'change_data_show'],
  ['Изменить пароль', 'change_password_show'],
  ['Выйти', 'logout_show']
];

const containerElement: HTMLElement | null = document.getElementById('UserSettingsBack_show');
if (containerElement) {
  containerElement.appendChild(createImgButton({
      class_name: ['back-button'],
      img_src: '/back_button.svg',
      img_alt: 'back button',
      id_name: 'back_btn_show',
      onClick: () => alert('Кнопка нажата!')
  }));
};

const rowElement: HTMLElement | null = document.getElementById('UserSettingsDetails_show');
if (rowElement) {
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
};

const actionElment: HTMLElement | null = document.getElementById('UserSettingsActions_show');
if (actionElment) {
  buttonData.map(item => {actionElment.appendChild(createButton({
        label: item[0],
        class_name: [ClassNameButton, (item[1] === 'logout_show' ? ClassNmaeButtonLogout : '')],
        id_name: item[1],
        onClick: () => alert('Кнопка нажата!')
    }))
  });
};
