// @ts-ignore
import template from './SideBar.hbs?raw';
import Block from '../../utils/Block';
import { createChatWindow } from '../ChatWindow/ChatWindow';
import { createContactItem } from '../../components/ContactItem/ContactItem';
import { createButton } from '../../components/Button/Button';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createInputForm } from '../../components/InputForm/InputForm';
import { ResourceURL } from '../../utils/HttpTransport';
import formatTime from '../../utils/DateFormatter';
import ChatsAPI from '../../api/ChatsAPI';

export interface SideBarProps {
    result: any
    tempContainer: HTMLDivElement
    element_ChatWindow: HTMLDivElement
    meId: number
    meLogin: string
    chat_window_flag: string
};

let chat_window_flag = '';

export class createSideBar extends Block {
    constructor(props: SideBarProps) {
        super('', {
            ...props,
            template: template
        });
    };

    render() {
        const chat_api = new ChatsAPI;
        const compile = this.compile(template as string, this.props);
        const contactElement: HTMLElement = compile.querySelector('#contacts')!;
        

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

        compile.appendChild(create_chat_form.element!);
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

        let chat_window = new createChatWindow({
            title:'', avatar: '', chat_id: '', userId: this.props.meId
        }).render();
        
        const contactFormData: (any)[][] = [];
        const ClassNameContactItem: string = 'contact-item';
        const ClassNameContactAvatar: string = 'contact-avatar';
        const ClassNameContactInfo: string = 'contact-info';
        const ClassNameContactHeader: string = 'contact-header';
        const ClassNameContactName: string = 'contact-name';
        const ClassNameContactMessage: string = 'contact-message';
        const ClassNameMessageInfo: string = 'message-info';
        const ClassNameUnreadBadge: string = 'unread-badge';
        const ClassNameContactTime: string = 'contact-time';

        contactElement.replaceChildren('');
        
        this.props.result.map((item: { [T: string]: string; }) => (
            contactFormData.push([
                item['id'], item['avatar'] ? ResourceURL + item['avatar'] : '/avatar.svg', item['title'],
                item['last_message'], item['unread_count']
            ])
        ));

        contactFormData.map(item => (
            contactElement.appendChild(new createContactItem({
                id_name: 'id_' + String(item[0]),
                class_name_contact_item: ClassNameContactItem,
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
                contact_message: item[3]
                    ? item[3].user.login == this.props.meLogin
                        ? 'Вы: ' + item[3].content
                        : item[3].content
                    : '',
                unread_badge: Number(item[4]) < 10 ? item[4] : '9+',
                contact_time: item[3] ? formatTime(item[3].time): '',
                onClick: () => {
                    if (chat_window_flag.length == 0) {
                        chat_window = new createChatWindow({
                            title: item[2], avatar: item[1], chat_id: item[0], userId: this.props.meId
                        }).render();
                        chat_window_flag = 'id_' + String(item[0]);
                        this.props.element_ChatWindow.appendChild(chat_window);
                        contactElement.querySelector(`#${'id_' + String(item[0])}`)!.className = ClassNameContactItem + ' active';
                    } else if ( chat_window_flag === `id_${item[0]}` ) {
                        this.props.element_ChatWindow.replaceChildren('');
                        contactElement.querySelector(`#${'id_' + String(item[0])}`)!.className = ClassNameContactItem;
                        chat_window_flag = '';
                    } else {
                        this.props.element_ChatWindow.replaceChildren('');
                        contactElement.querySelector(`#${chat_window_flag}`)!.className = ClassNameContactItem;
                        chat_window = new createChatWindow({
                            title: item[2], avatar: item[1], chat_id: item[0], userId: this.props.meId
                        }).render();
                        this.props.element_ChatWindow.appendChild(chat_window);
                        contactElement.querySelector(`#${'id_' + String(item[0])}`)!.className = ClassNameContactItem + ' active';
                        chat_window_flag = 'id_' + String(item[0]);
                    }
                }
            }).element!)
        ));

        return compile;
    };
}

