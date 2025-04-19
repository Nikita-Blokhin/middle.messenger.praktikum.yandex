import '../UserSettings.scss';
import { createDetailRow } from '../../../components/DetailRow/DetailRow.js';
import { createButton } from '../../../components/Button/Button.js';
import { createImgButton } from '../../../components/ImgButton/ImgButton.js';
import { createHeader } from '../../../components/Header/Header.js';
import { createInputAvatar } from '../../../components/InputAvatar/InputAvatar.js';
import { createAvatar } from '../../../components/Avatar/Avatar.js';
// @ts-ignore
import template from './UserSettingsStatus.hbs?raw';
import BasePage from '../../BasePage.js';
import AuthController from '../../../controller/AuthController.js';
import UsersAPI from '../../../api/UserAPI.js';
import router, { Routes } from '../../../core/router.js';

export default class ProfilePage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'User-info-page');
    };

    render_page() {
        const user = AuthController.fetchUser();
        if (!user) return  router.go(Routes.Index);
        const api = new UsersAPI;
        const content = this.getContent();
        content.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;

        const ClassNameRow: string = 'detail-row';
        const ClassNameLabel: string = 'detail-label';
        const ClassNameValue: string = 'detail-value';
        const ClassNameButton: string = 'usersettings-action';
        const ClassNameButtonLogout: string = ' usersettings-logout';
        const rowData: string [][] = [
            ['Почта', 'email_show', ''],
            ['Логин', 'login_show', ''],
            ['Имя', 'first_name_show', ''],
            ['Фамилия', 'second_name_show', ''],
            ['Имя в чате', 'display_name_show', ''],
            ['Телефон', 'phone_show', '']  
        ];
        const buttonData: any[][] = [
            ['Изменить данные', 'change_data_show', () => router.go(Routes.EditProfile)],
            ['Изменить пароль', 'change_password_show', () => router.go(Routes.PasswordProfile)],
            ['Выйти', 'logout_show', () => AuthController.logout()]
        ];

        const containerElement: HTMLElement = tempContainer.querySelector('#UserSettingsBack_show')!;
        containerElement.appendChild(new createImgButton({
            class_name: 'back-button',
            img_src: '/back_button.svg',
            img_alt: 'back button',
            id_name: 'back_btn_show',
            onClick: () => router.go(Routes.Messenger)
        }).element!);
        const headerElement: HTMLElement = tempContainer.querySelector('#UserSettingsHeader_show')!;
        const rowElement: HTMLElement = tempContainer.querySelector('#UserSettingsDetails_show')!;
        const inputElement: HTMLElement = tempContainer.querySelector('#UserSettingsHeader_input')!;
        AuthController.fetchUser().then(result => {
            if (headerElement) {
                inputElement.before(new createAvatar({
                    img_src: result.avatar ? result.avatar : '/avatar.svg',
                    img_alt: 'аватар',
                    class_name: 'usersettings-avatar'
                }).element!);
                inputElement.appendChild(new createInputAvatar({
                    onChange: (e) => {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        if (!target || !target.files || !target.files[0]) return;

                        const file = target.files[0];
                        try {
                            const formData = new FormData();
                            formData.append('avatar', file, file.name);
                            api.updateAvatar(formData);
                            this.render();
                        } catch (error) {
                            console.error('Ошибка загрузки аватара:', error);
                        }
                    },
                }).element!);
                headerElement.appendChild(new createHeader({
                    value: result.display_name ? result.display_name : result.first_name,
                    class_name: 'usersettings-name',
                    id_name: 'display_name'
                }).element!);
            };
            
            rowData[0][2] = result.email;
            rowData[1][2] = result.login;
            rowData[2][2] = result.first_name;
            rowData[3][2] = result.second_name;
            rowData[4][2] = result.display_name;
            rowData[5][2] = result.phone;
            rowData.map(item => (
                rowElement.appendChild(new createDetailRow({
                    label: item[0],
                    class_name__row: ClassNameRow,
                    class_name__label: ClassNameLabel,
                    class_name__value: ClassNameValue,
                    id_name: item[1],
                    value: item[2] as string
                }).element!)
            ));
        });

        const actionElment: HTMLElement = tempContainer.querySelector('#UserSettingsActions_show')!;

        buttonData.map(item => {actionElment.appendChild(new createButton({
            label: item[0],
            class_name: ClassNameButton +  (item[1] === 'logout_show' ? ClassNameButtonLogout : ''),
            id_name: item[1],
            onClick: item[2]
        }).element!);
        });
        content.appendChild(tempContainer.firstElementChild!);
    }
}