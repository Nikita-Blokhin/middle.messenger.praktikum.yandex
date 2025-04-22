import './Chat.scss';
// @ts-ignore
import template from './Chat.hbs?raw';
import BasePage from '../BasePage';
// @ts-ignore
import template_SideBar from '../../layouts/SideBar/SideBar.hbs?raw';
import { createSideBar } from '../../layouts/SideBar/SideBar';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createSearhInput } from '../../components/SearhInput/SearhInput';
import AuthController from '../../controller/AuthController';
import router, { Routes } from '../../core/router';
import ChatsAPI from '../../api/ChatsAPI';
import { ResourceURL } from '../../utils/HttpTransport';

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

            const chat_window_flag = '';
            chat_api.getChats().then(result => {
                contactsElement.appendChild(new createSideBar({result, tempContainer, element_ChatWindow, meId, meLogin, chat_window_flag}).render());
            });
            setInterval(() => {chat_api.getChats().then(result => {
                contactsElement.replaceChildren('');
                contactsElement.appendChild(new createSideBar({result, tempContainer, element_ChatWindow, meId, meLogin, chat_window_flag}).render());
            });
            }, 1000);

            content.appendChild(tempContainer.firstElementChild!);
        });
    };
};
