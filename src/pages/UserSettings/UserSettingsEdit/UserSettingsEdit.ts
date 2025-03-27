import '../UserSettings.scss';
import { createInputForm } from '../../../components/InputForm/InputForm';
import { createButton } from '../../../components/Button/Button';
import { createImgButton } from '../../../components/ImgButton/ImgButton';
// @ts-ignore
import template from './UserSettingsEdit.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#UserSettingsEdit');
if (element) {
    element.innerHTML = template;
};

const ClassNameGroup: string = 'Authorization__group';
const ClassNameLabel: string = 'Authorization__label';
const ClassNameInput: string = 'Authorization__input';
const rowData: string[][] = [
  ['Почта', 'email', 'pochta@yandex.ru'],
  ['Логин', 'login', 'ivanivanov'],
  ['Имя', 'first_name', 'Иван'],
  ['Фамилия', 'second_name', 'Иванов'],
  ['Имя в чате', 'display_name', 'Иван'],
  ['Телефон', 'phone', '+7 (909) 967 30 30']  
];

const containerElement: HTMLElement | null = document.getElementById('UserSettingsBack');
if (containerElement) {
    containerElement.appendChild(new createImgButton({
        class_name: 'back-button',
        img_src: '/back_button.svg',
        img_alt: 'back button',
        id_name: 'back_btn',
        onClick: () => alert('Кнопка нажата!')
    }).element!);
};

const rowElement: HTMLElement | null = document.getElementById('UserSettingsDetails');
if (rowElement) {
    rowData.map(item => (
        rowElement.appendChild(new createInputForm({
            label: item[0],
            id_name: item[1],
            class_name__group: ClassNameGroup,
            class_name__label: ClassNameLabel,
            class_name__input: ClassNameInput,
        }).element!)
    ));
};

const actionElment: HTMLElement | null = document.getElementById('UserSettingsActions');
if (actionElment) {
    actionElment.appendChild(new createButton({
        label: 'Сохранить',
        class_name: 'Authorization__button',
        id_name: 'UserSettingsEditSave',
        onClick: () => alert('Кнопка нажата!')
    }).element!);
};
