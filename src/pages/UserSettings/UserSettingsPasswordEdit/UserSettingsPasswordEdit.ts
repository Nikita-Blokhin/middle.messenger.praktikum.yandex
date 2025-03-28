import '../UserSettings.scss';
import { createInputForm } from '../../../components/InputForm/InputForm';
import { createButton } from '../../../components/Button/Button';
import { createImgButton } from '../../../components/ImgButton/ImgButton';
import { createSettingsForm } from '../../../components/SettingsForm/SettingsForm';
import inputDataToConsole from '../../../utils/DataToConsole';
// @ts-ignore
import template from './UserSettingsPasswordEdit.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#UserSettingsPasswordEdit')!;
element.innerHTML = template;

element.appendChild(new createSettingsForm({
    settings_type: 'UserSettingsPassword'
}).element!);

const ClassNameGroup: string = 'authorization-group';
const ClassNameLabel: string = 'authorization-label';
const ClassNameInput: string = 'authorization-input';
const rowData: string[][] = [
    ['Старый пароль', 'oldPassword'],
    ['Новый пароль', 'newPassword'],
    ['Повторите новый пароль', 'newPassword_retry']
];

const containerElement: HTMLElement = document.getElementById('UserSettingsPasswordBack')!;
containerElement.appendChild(new createImgButton({
    class_name: 'back-button',
    img_src: '/back_button.svg',
    img_alt: 'back button',
    id_name: 'back_btn',
    onClick: () => alert('Кнопка нажата!')
}).element!);

const rowElement: HTMLElement = document.getElementById('UserSettingsPasswordDetails')!;
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

const actionElment: HTMLElement = document.getElementById('UserSettingsPasswordActions')!;
actionElment.appendChild(new createButton({
    label: 'Сохранить',
    class_name: 'authorization-button',
    id_name: 'UserSettingsEditSave'
}).element!);

const formElement: HTMLElement = document.getElementById('UserSettingsPasswordForm')!;
formElement.addEventListener('submit', () => inputDataToConsole(formElement));
