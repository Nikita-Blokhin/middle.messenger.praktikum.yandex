import '../UserSettings.scss';
import { createInputForm } from '../../../components/InputForm/InputForm';
import { createButton } from '../../../components/Button/Button';
import { createImgButton } from '../../../components/ImgButton/ImgButton';
import { createSettingsForm } from '../../../components/SettingsForm/SettingsForm';
// @ts-ignore
import template from './UserSettingsEdit.hbs?raw';
import BasePage from '../../BasePage';
import UsersAPI from '../../../api/UserAPI';
import router, { Routes } from '../../../core/router.js';
import AuthController from '../../../controller/AuthController.js';

export default class EditProfilePage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'User-edit-page');
    };

    render_page() {
        const user = AuthController.fetchUser();
        if (!user) return  router.go(Routes.Index);
        const api = new UsersAPI;
        const content = this.getContent();
        content.innerHTML = '';
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;
        const rowElement: HTMLElement = tempContainer.querySelector('#UserSettingsDetails')!;
        const rowData: string[][] = [
            ['Почта', 'email', ''],
            ['Логин', 'login', ''],
            ['Имя', 'first_name', ''],
            ['Фамилия', 'second_name', ''],
            ['Имя в чате', 'display_name', ''],
            ['Телефон', 'phone', '']  
        ];
        const settingsForm = new createSettingsForm({
            settings_type: 'settings_form',
            formData: {},
            onSubmit: (data: { preventDefault: Function; }) => {
                data.preventDefault();
                if (settingsForm.validateAllInputs()) {
                    api.updateProfile(settingsForm.getFormData() as Record<string, string>);
                    setTimeout(() => {router.go(Routes.Profile);}, 500);
                }
            }
        });
        rowElement.appendChild(settingsForm.element!);
        const formElement: HTMLElement = tempContainer.querySelector('#settings_form')!;
        AuthController.fetchUser().then(result => {
            rowData[0][2] = result.email;
            rowData[1][2] = result.login;
            rowData[2][2] = result.first_name;
            rowData[3][2] = result.second_name;
            rowData[4][2] = result.display_name;
            rowData[5][2] = result.phone;
            
            rowData.map(item => (
                formElement.appendChild(new createInputForm({
                    required: item[1] == 'display_name' ? '' : 'required',
                    value: item[2],
                    label: item[0],
                    id_name: item[1],
                    placeholder_text: item[2],
                    class_name__group: ClassNameGroup,
                    class_name__label: ClassNameLabel,
                    class_name__input: ClassNameInput,
                }).element!)
            ));
            formElement.appendChild(new createButton({
                label: 'Сохранить',
                class_name: 'authorization-button',
                id_name: 'UserSettingsEditSave'
            }).element!);
        });

        const ClassNameGroup: string = 'authorization-group';
        const ClassNameLabel: string = 'authorization-label';
        const ClassNameInput: string = 'authorization-input';
        

        const backElement: HTMLElement = tempContainer.querySelector('#UserSettingsBack')!;
        backElement.appendChild(new createImgButton({
            class_name: 'back-button',
            img_src: '/back_button.svg',
            img_alt: 'back button',
            id_name: 'back_btn',
            onClick: () => router.go(Routes.Profile)
        }).element!);

        content.appendChild(tempContainer.firstElementChild!);
    }
}
