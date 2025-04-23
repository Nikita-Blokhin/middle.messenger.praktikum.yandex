import './Chat.scss';
// @ts-ignore
import template from './Chat.hbs?raw';
import BasePage from '../BasePage';
// @ts-ignore
import template_SideBar from '../../layouts/SideBar/SideBar.hbs?raw';
import { createSideBar } from '../../layouts/SideBar/SideBar';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createSearhInput } from '../../components/SearhInput/SearhInput';
import { createButton } from '../../components/Button/Button';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createInputForm } from '../../components/InputForm/InputForm';
import AuthController from '../../controller/AuthController';
import router, { Routes } from '../../core/router';
import ChatsAPI from '../../api/ChatsAPI';
import { ResourceURL } from '../../utils/HttpTransport';
import isEqual from '../../utils/IsEqual';

export default class ChatsPage extends BasePage {
    constructor() {
        super('div', 'Chats-page');
    };

    render_page() {
        const user = AuthController.fetchUser();
        if (!user) return  router.go(Routes.Index);
        const chat_api = new ChatsAPI;
        const content = this.getContent();
        content.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;
        const element_ChatWindow: HTMLDivElement = tempContainer.querySelector('#chatwindow')!;
        const searhBarElement: HTMLElement = tempContainer.querySelector('#search_container')!;
        const contactsElement: HTMLElement = tempContainer.querySelector('#contacts_container')!;
        
        AuthController.fetchUser().then(result => {
            const meId = result.id;
            const meLogin = result.login;
            
            searhBarElement.appendChild(new createImgButton({
                img_src: result.avatar == '' ? '/avatar.svg' : ResourceURL + result.avatar,
                img_alt: 'аватар',
                class_name: 'contact-avatar',
                id_name: 'Avatar',
                onClick() {
                    router.go(Routes.Profile);
                },
            }).element!);
    
            searhBarElement.appendChild(new createSearhInput().element!);

            contactsElement!.before(
                new createButton ({
                    label: 'Создать чат',
                    class_name: 'add-chat-btn',
                    type_name: 'primary',
                    id_name: 'chat_add',
                    onClick: () => {
                        if (create_chat_form.getContent()!.style.display == 'none') {
                            create_chat_form.show();
                        } else { create_chat_form.hide(); }
                    }
                }).element!
            );
            const create_chat_form = new createAuthForm ({
                id_form: 'create_chat_form',
                class_name: 'create-chat-form',
                formData: {
                    title: ''
                },
                onSubmit: (data) => {
                    data.preventDefault();
                    chat_api.createChat(create_chat_form.getFormData().title as string);
                    create_chat_form.hide();
                    this.render();
                }
            });
    
            const inputForm = new createInputForm({
                required: 'required',
                label: 'Название чата',
                class_name__group: 'authorization-group',
                class_name__label: 'authorization-label',
                class_name__input: 'authorization-input',
                id_name: 'title'
            });
    
            contactsElement!.before(create_chat_form.element!);
            create_chat_form.hide();
            if (inputForm.element) {
                create_chat_form.element!.appendChild(inputForm.element);
            } else {
                console.error('Ошибка при создании input form для create_chat_title');
            };
    
            const button = new createButton({
                label: 'Создать',
                class_name: 'authorization-button',
                id_name: 'create_chat_btn',
            });
    
            if (button.element) {
                create_chat_form.element!.appendChild(button.element);
            } else {
                console.error('Button element не найден!');
            };

            const chat_window_flag = '';
            let old_result = [];
            chat_api.getChats().then(result => {
                old_result = result;
                contactsElement.appendChild(new createSideBar({result, tempContainer, element_ChatWindow, meId, meLogin, chat_window_flag}).render());
            });
            
            setInterval(() => {chat_api.getChats().then(result => {
                if (!isEqual(old_result, result)) {
                    contactsElement.replaceChildren('');
                    contactsElement.appendChild(new createSideBar({result, tempContainer, element_ChatWindow, meId, meLogin, chat_window_flag}).render());
                    old_result = result;
                }
            });
            }, 1000);

            content.appendChild(tempContainer.firstElementChild!);
        });
    };
};
