import './Chat.scss';
// @ts-ignore
import template from './Chat.hbs?raw';
import BasePage from '../BasePage';
// @ts-ignore
import template_SideBar from '../../layouts/SideBar/SideBar.hbs?raw';
import '../../layouts/SideBar/SideBar.scss';
import { createContactItem } from '../../components/ContactItem/ContactItem';
import { createSearhInput } from '../../components/SearhInput/SearhInput';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createInputForm } from '../../components/InputForm/InputForm';
import { createButton } from '../../components/Button/Button';
// @ts-ignore
import template_ChatWindow from '../../layouts/ChatWindow/ChatWindow.hbs?raw';
import '../../layouts/ChatWindow/ChatWindow.scss';
// import { createMessage } from '../../components/Message/Message';
import AuthController from '../../controller/AuthController';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createChatWindow } from '../../layouts/ChatWindow/ChatWindow';
import router, { Routes } from '../../core/router';
import ChatsAPI from '../../api/ChatsAPI';
import { ResourceURL } from '../../utils/HttpTransport';


export default class ChatsPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
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
        const element_chatApp: HTMLDivElement = tempContainer.querySelector('#chat_app')!;
        const element_SideBar: HTMLDivElement = tempContainer.querySelector('#sidebar')!;
        element_SideBar.innerHTML = template_SideBar;
        const element_ChatWindow: HTMLDivElement = tempContainer.querySelector('#chatwindow')!;
        const contactElement: HTMLElement = tempContainer.querySelector('#contacts')!;
        
        AuthController.fetchUser().then(result => {
            contactElement!.appendChild(
                new createButton ({
                    label: 'Создать чат',
                    class_name: 'authorization-button add-chat-btn',
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
                    this.render_page();
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

            element_chatApp.appendChild(create_chat_form.element!);
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



            const ClassNameContactItem: string = 'contact-item';
            const ClassNameContactAvatar: string = 'contact-avatar';
            const ClassNameContactInfo: string = 'contact-info';
            const ClassNameContactHeader: string = 'contact-header';
            const ClassNameContactName: string = 'contact-name';
            const ClassNameContactMessage: string = 'contact-message';
            const ClassNameMessageInfo: string = 'message-info';
            const ClassNameUnreadBadge: string = 'unread-badge';
            const ClassNameContactTime: string = 'contact-time';
            // const messageContainerElement: HTMLElement = tempContainer.querySelector('#messages_container')!;
            let chat_window = new createChatWindow({
                title:'', avatar: '', chat_id: ''
            });
            const chat_window_flag: createChatWindow[] = [];
            
            
            const contactFormData: (string)[][] = [];
            chat_api.getChats().then(result => {
                result.map((item: { [T: string]: string; }) => (
                    contactFormData.push([
                        item['id'], item['avatar'] ? ResourceURL + item['avatar'] : '/avatar.svg', item['title'],
                        item['last_message'], item['unread_count'], item['']
                    ])
                ));

                contactFormData.map(item => (
                    contactElement.appendChild(new createContactItem({
                        id_name: String(item[0]),
                        class_name_contact_item: ClassNameContactItem + (Number(item[0]) === 3 ? ' active' : ''),
                        class_name_contact_avatar: ClassNameContactAvatar,
                        class_name_contact_info: ClassNameContactInfo,
                        class_name_contact_header: ClassNameContactHeader,
                        class_name_contact_name: ClassNameContactName,
                        class_name_contact_message: ClassNameContactMessage,
                        class_name_message_info: ClassNameMessageInfo,
                        class_name_unread_badge: ClassNameUnreadBadge + (item[4] ? '' : ' hidden'),
                        class_name_contact_time: ClassNameContactTime,
                        avatar_src: item[1],
                        contact_name: item[2],
                        contact_message: item[3],
                        unread_badge: Number(item[4]) < 10 ? item[4] : '9+',
                        contact_time: item[5],
                        onClick: () => {
                            if (chat_window_flag.length == 0) {
                                chat_window = new createChatWindow({title: item[2], avatar: item[1], chat_id: item[0]});
                                chat_window_flag.push(chat_window);
                                element_ChatWindow.appendChild(chat_window.render());
                            } else if ( chat_window_flag[0].props.title === item[2] ) {
                                chat_window.element!.remove();
                                chat_window_flag.pop();
                            } else {
                                chat_window.element!.remove();
                                chat_window = new createChatWindow({title: item[2], avatar: item[1], chat_id: item[0]});
                                element_ChatWindow.appendChild(chat_window.render());
                                chat_window_flag.pop();
                                chat_window_flag.push(chat_window);
                            }
                        }
                    }).element!)
                ));
            });
            

            const searhBarElement: HTMLElement | null = tempContainer.querySelector('#search_container');
            if (searhBarElement) {
                searhBarElement.appendChild(new createImgButton({
                    img_src: result.avatar == '' ? '/avatar.svg' : ResourceURL + result.avatar,
                    img_alt: 'аватар',
                    class_name: 'contact-avatar',
                    id_name: 'Avatar',
                    onClick() {
                        router.go(Routes.Profile);
                    },
                }).element!);
            };
            if (searhBarElement) {
                searhBarElement.appendChild(new createSearhInput().element!);
            };
  
            // const messageFormData: (string) [][] = [
            //     // [
            //     //     '0', 'incoming',
            //     //     'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то' +
            //     //     'момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все' +
            //     //     'знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все' +
            //     //     'еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с' +
            //     //     'пленкой.',
            //     //     '11:56'
            //     // ],
            //     // [
            //     //     '1', 'incoming',
            //     //     'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так' +
            //     //     'никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на' +
            //     //     'аукционе за 45000 евро.',
            //     //     '11:57'
            //     // ],
            //     // [
            //     //     '2', 'outgoing',
            //     //     'Круто!',
            //     //     '12:00'
            //     // ],
            // ];
            
            // if (messageContainerElement) messageFormData.map(item => (
            //     messageContainerElement.appendChild(new createMessage({
            //         id_name: item[0],
            //         class_name_position: item[1],
            //         message_text: item[2],
            //         time_text: item[3]
            //     }).element!)
            // ));
            
            
            content.appendChild(tempContainer.firstElementChild!);
        });
        
    };
};
