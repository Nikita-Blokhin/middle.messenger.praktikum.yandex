import '../UserSettings.scss';
import { createInputForm } from '../../../components/InputForm/InputForm';
import { createButton } from '../../../components/Button/Button';
import { createImgButton } from '../../../components/ImgButton/ImgButton';
import { createSettingsForm } from '../../../components/SettingsForm/SettingsForm';
// @ts-ignore
import template from './UserSettingsPasswordEdit.hbs?raw';
import BasePage from '../../BasePage';
import UsersAPI from '../../../api/UserAPI';
import router, { Routes } from '../../../core/router';
import AuthController from '../../../controller/AuthController';

export default class PasswordProfilePage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'User-password-page');
    };

    render_page() {
        const user = AuthController.fetchUser();
        if (!user) return  router.go(Routes.Index);
        const api = new UsersAPI;
        const content = this.getContent();
        content.innerHTML = '';
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;

        const containerElement: HTMLElement = tempContainer.querySelector('#UserSettingsPasswordContainer')!;
        const settingsForm = new createSettingsForm({
            settings_type: 'UserSettingsPasswordForm',
            formData: {
                oldPassword: '',
                newPassword: '',
            },
            onSubmit: (data) => {
                data.preventDefault();
                if (settingsForm.validateAllInputs()) {
                    console.log(settingsForm.getFormData());
                    api.updatePassword(settingsForm.getFormData() as {oldPassword: string, newPassword: string});
                }
            }
        });
        containerElement.appendChild(settingsForm.element!);

        const ClassNameGroup: string = 'authorization-group';
        const ClassNameLabel: string = 'authorization-label';
        const ClassNameInput: string = 'authorization-input';
        const rowData: string[][] = [
            ['Старый пароль', 'oldPassword'],
            ['Новый пароль', 'newPassword'],
            ['Повторите новый пароль', 'newPassword_retry']
        ];

        const backElement: HTMLElement = tempContainer.querySelector('#UserSettingsPasswordBack')!;
        backElement.appendChild(new createImgButton({
            class_name: 'back-button',
            img_src: '/back_button.svg',
            img_alt: 'back button',
            id_name: 'back_btn',
            onClick: () => router.go(Routes.Profile)
        }).element!);

        const rowElement: HTMLElement = tempContainer.querySelector('#UserSettingsPasswordForm')!;
        rowData.map(item => (
            rowElement.appendChild(new createInputForm({
                required: 'required',
                label: item[0],
                id_name: item[1],
                placeholder_text: item[2],
                class_name__group: ClassNameGroup,
                class_name__label: ClassNameLabel,
                class_name__input: ClassNameInput,
            }).element!)
        ));

        rowElement.appendChild(new createButton({
            label: 'Сохранить',
            class_name: 'authorization-button',
            id_name: 'UserSettingsEditSave'
        }).element!);
        content.appendChild(tempContainer.firstElementChild!);
    }
}
