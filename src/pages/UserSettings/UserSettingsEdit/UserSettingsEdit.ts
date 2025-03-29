import '../UserSettings.scss';
import { createInputForm } from '../../../components/InputForm/InputForm';
import { createButton } from '../../../components/Button/Button';
import { createImgButton } from '../../../components/ImgButton/ImgButton';
import { createSettingsForm } from '../../../components/SettingsForm/SettingsForm';
// @ts-ignore
import template from './UserSettingsEdit.hbs?raw';

const element: HTMLDivElement = document.querySelector('#UserSettingsEdit')!;
element.innerHTML = template;

const containerElement: HTMLElement = document.getElementById('UserSettingsContainer')!;
containerElement.appendChild(new createSettingsForm({
    settings_type: 'UserSettings',
    formData: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        phone: '',
        display_name: '',
    },
    onSubmit: (data) => { 
        console.log('Форма отправлена:', data);
        alert('Данные в консоле');
    }
}).element!);

const ClassNameGroup: string = 'authorization-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const rowData: string[][] = [
    ['Почта', 'email', 'pochta@yandex.ru'],
    ['Логин', 'login', 'ivanivanov'],
    ['Имя', 'first_name', 'Иван'],
    ['Фамилия', 'second_name', 'Иванов'],
    ['Имя в чате', 'display_name', 'Иван'],
    ['Телефон', 'phone', '899912312312']  
];

const backElement: HTMLElement = document.getElementById('UserSettingsBack')!;
backElement.appendChild(new createImgButton({
    class_name: 'back-button',
    img_src: '/back_button.svg',
    img_alt: 'back button',
    id_name: 'back_btn',
    onClick: () => alert('Кнопка нажата!')
}).element!);

const rowElement: HTMLElement = document.getElementById('UserSettingsDetails')!;
rowData.map(item => (
    rowElement.appendChild(new createInputForm({
        label: item[0],
        id_name: item[1],
        placeholder_text: item[2],
        class_name__group: ClassNameGroup,
        class_name__label: ClassNameLabel,
        class_name__input: ClassNameInput,
    }).element!)
));

const actionElment: HTMLElement = document.getElementById('UserSettingsActions')!;
actionElment.appendChild(new createButton({
    label: 'Сохранить',
    class_name: 'authorization-button',
    id_name: 'UserSettingsEditSave'
}).element!);
