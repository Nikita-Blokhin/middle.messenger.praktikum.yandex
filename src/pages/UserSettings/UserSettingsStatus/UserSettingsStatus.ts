import '../UserSettings.scss';
import { createDetailRow } from '../../../components/DetailRow/DetailRow.js';
import { createButton } from '../../../components/Button/Button.js';
import { createImgButton } from '../../../components/ImgButton/ImgButton.js';
// @ts-ignore
import template from './UserSettingsStatus.hbs?raw';

const element: HTMLDivElement = document.querySelector('#UserSettings')!;
element.innerHTML = template;

const ClassNameRow: string = 'detail-row';
const ClassNameLabel: string = 'detail-label';
const ClassNameValue: string = 'detail-value';
const ClassNameButton: string = 'usersettings-action';
const ClassNmaeButtonLogout: string = ' usersettings-logout';
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

const containerElement: HTMLElement = document.getElementById('UserSettingsBack_show')!;
containerElement.appendChild(new createImgButton({
    class_name: 'back-button',
    img_src: '/back_button.svg',
    img_alt: 'back button',
    id_name: 'back_btn_show',
    onClick: () => alert('Кнопка нажата!')
}).element!);

const rowElement: HTMLElement = document.getElementById('UserSettingsDetails_show')!;
rowData.map(item => (
    rowElement.appendChild(new createDetailRow({
        label: item[0],
        class_name__row: ClassNameRow,
        class_name__label: ClassNameLabel,
        class_name__value: ClassNameValue,
        id_name: item[1],
        value: item[2]
    }).element!)
));

const actionElment: HTMLElement = document.getElementById('UserSettingsActions_show')!;

buttonData.map(item => {actionElment.appendChild(new createButton({
    label: item[0],
    class_name: ClassNameButton +  (item[1] === 'logout_show' ? ClassNmaeButtonLogout : ''),
    id_name: item[1],
    onClick: () => alert('Кнопка нажата!')
}).element!);
});
