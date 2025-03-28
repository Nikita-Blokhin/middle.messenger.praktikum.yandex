import "../UserSettings.scss";
import createInputForm from '../../../components/InputForm/InputForm';
import createButton from '../../../components/Button/Button';
import createImgButton from '../../../components/ImgButton/ImgButton';
import template from './UserSettingsEdit.hbs?raw';

document.querySelector('#UserSettingsEdit').innerHTML = template;
const ClassNameGroup = 'Authorization__group';
const ClassNameLabel = 'Authorization__label';
const ClassNameInput = 'Authorization__input';
const rowData = [
  ['Почта', 'email', 'pochta@yandex.ru'],
  ['Логин', 'login', 'ivanivanov'],
  ['Имя', 'first_name', 'Иван'],
  ['Фамилия', 'second_name', 'Иванов'],
  ['Имя в чате', 'display_name', 'Иван'],
  ['Телефон', 'phone', '+7 (909) 967 30 30']  
];

const containerElement = document.getElementById('UserSettingsBack');
containerElement.appendChild(createImgButton({
    class_name: ['back-button'],
    img_src: '/back_button.svg',
    img_alt: 'back button',
    id_name: 'back_btn',
    onClick: () => alert('Кнопка нажата!')
}));
const rowElement = document.getElementById('UserSettingsDetails');
rowData.map(item => (
    rowElement.appendChild(createInputForm({
      label: item[0],
      id_name: item[1],
      class_name__group: ClassNameGroup,
      class_name__label: ClassNameLabel,
      class_name__input: ClassNameInput,
  }))
));
const actionElment = document.getElementById('UserSettingsActions');
actionElment.appendChild(createButton({
    label: 'Сохранить',
    class_name: ['Authorization__button'],
    id_name: 'UserSettingsEditSave',
    onClick: () => alert('Кнопка нажата!')
}));
