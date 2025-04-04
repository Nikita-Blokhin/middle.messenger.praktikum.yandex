import "../UserSettings.scss";
import createInputForm from '../../../components/InputForm/InputForm';
import createButton from '../../../components/Button/Button';
import createImgButton from '../../../components/ImgButton/ImgButton';
import template from './UserSettingsPasswordEdit.hbs?raw';

document.querySelector('#UserSettingsPasswordEdit').innerHTML = template;
const ClassNameGroup = 'Authorization__group';
const ClassNameLabel = 'Authorization__label';
const ClassNameInput = 'Authorization__input';
const rowData = [
  ['Старый пароль', 'oldPassword'],
  ['Новый пароль', 'newPassword'],
  ['Повторите новый пароль', 'newPassword_retry']
];
const containerElement = document.getElementById('UserSettingsPasswordBack');
containerElement.appendChild(createImgButton({
    class_name: ['back-button'],
    img_src: '/back_button.svg',
    img_alt: 'back button',
    id_name: 'back_btn_password',
    onClick: () => alert('Кнопка нажата!')
}));
const rowElement = document.getElementById('UserSettingsPasswordDetails');
rowData.map(item => (
    rowElement.appendChild(createInputForm({
      label: item[0],
      id_name: item[1],
      class_name__group: ClassNameGroup,
      class_name__label: ClassNameLabel,
      class_name__input: ClassNameInput,
  }))
));
const actionElment = document.getElementById('UserSettingsPasswordActions');
actionElment.appendChild(createButton({
    label: 'Сохранить',
    class_name: ['Authorization__button'],
    id_name: 'UserSettingsPasswordEditSave',
    onClick: () => alert('Кнопка нажата!')
}));
