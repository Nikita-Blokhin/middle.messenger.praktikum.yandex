import './Chat.scss';
// @ts-ignore
import template from './Chat.hbs?raw';
import BasePage from '../BasePage';
// @ts-ignore
import template_SideBar from '../../layouts/SideBar/SideBar.hbs?raw';
import '../../layouts/SideBar/SideBar.scss';
import { createContactItem } from '../../components/ContactItem/ContactItem';
import { createSearhInput } from '../../components/SearhInput/SearhInput';
// @ts-ignore
import template_ChatWindow from '../../layouts/ChatWindow/ChatWindow.hbs?raw';
import '../../layouts/ChatWindow/ChatWindow.scss';
import { createMessageForm } from '../../components/MessageForm/MessageForm';
import { createMessage } from '../../components/Message/Message';
import { createDateDivider } from '../../components/DateDivider/DateDivider';
import AuthController from '../../controller/AuthController';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import router, { Routes } from '../../core/router';

export default class ChatsPage extends BasePage {
    // @ts-ignore
    constructor(props = {}) {
        super('div', 'Chats-page');
    };

    render() {
        const user = AuthController.fetchUser();
        if (!user) return  router.go(Routes.Index);
        let src_avatar = '';
        AuthController.fetchUser().then(result => {
            src_avatar = result.avatar == 'null' ? '/picture.svg' : result.avatar;
        });
        const content = this.getContent();
        content.innerHTML = '';

        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = template;

        const element_SideBar: HTMLDivElement = tempContainer.querySelector('#sidebar')!;
        element_SideBar.innerHTML = template_SideBar;

        const ClassNameContactItem: string = 'contact-item';
        const ClassNameContactAvatar: string = 'contact-avatar';
        const ClassNameContactInfo: string = 'contact-info';
        const ClassNameContactHeader: string = 'contact-header';
        const ClassNameContactName: string = 'contact-name';
        const ClassNameContactMessage: string = 'contact-message';
        const ClassNameMessageInfo: string = 'message-info';
        const ClassNameUnreadBadge: string = 'unread-badge';
        const ClassNameContactTime: string = 'contact-time';
        const contactFormData: (string)[][] = [
            ['0', '', 'Андрей', 'Изображение', '2', '10:49'],
            ['1', '', 'Киноклуб', 'Вы: стикер', '', '12:00'],
            ['2', '', 'Илья', 'Друзья, у меня для вас особенный выпуск новостей!...', '15', '15:12'],
            ['3', '', 'Вадим', 'Вы: Круто!', '', '11:56'],
            ['4', '', 'тет-а-теты', 'И Human Interface Guidelines и Material Design рекомендуют...', '', 'Ср'],
            ['5', '', '1, 2, 3', 'Миллионы россиян ежедневно проводят десятки часов свое...', '', 'Пн'],
            ['6', '', 'Design Destroyer', 'В 2008 году художник Jon Rafman начал собирать...', '', 'Пн'],
            ['7', '', 'Day.', 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', '', '1 Мая 2020']
        ];

        const contactElement: HTMLElement = tempContainer.querySelector('#contacts')!;
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
                onClick: () => alert('Кнопка нажата!')
            }).element!)
        ));

        const searhBarElement: HTMLElement | null = tempContainer.querySelector('#search_container');
        if (searhBarElement) {
            searhBarElement.appendChild(new createImgButton({
                img_src: src_avatar? src_avatar : '/avatar.svg',
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


        const element_ChatWindow: HTMLDivElement = tempContainer.querySelector('#chatwindow')!;
        element_ChatWindow.innerHTML = template_ChatWindow;
        
        const messageFormData: (string) [][] = [
            [
                '0', 'incoming',
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то' +
                'момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все' +
                'знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все' +
                'еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с' +
                'пленкой.',
                '11:56'
            ],
            [
                '1', 'incoming',
                'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так' +
                'никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на' +
                'аукционе за 45000 евро.',
                '11:57'
            ],
            [
                '2', 'outgoing',
                'Круто!',
                '12:00'
            ],
        ];
        const messageContainerElement: HTMLElement = tempContainer.querySelector('#messages_container')!;
        messageContainerElement.appendChild(new createDateDivider({
            id_name: '0',
            date_text: '24 марта'
        }).element!);
        messageFormData.map(item => (
            messageContainerElement.appendChild(new createMessage({
                id_name: item[0],
                class_name_position: item[1],
                message_text: item[2],
                time_text: item[3]
            }).element!)
        ));
        
        const messageFormElement: HTMLElement = tempContainer.querySelector('#message_form_wrapper')!;
        messageFormElement.appendChild(new createMessageForm({
            formData: {
                message: ''
            },
            onSubmit: (data) => { 
                console.log('Форма отправлена:', data);
                alert('Данные в консоле');
            }
        }).element!);

        content.appendChild(tempContainer.firstElementChild!);
    };
};
