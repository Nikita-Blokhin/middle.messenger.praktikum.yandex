// @ts-ignore
import template from './SideBar.hbs?raw';
import Block from '../../utils/Block';
import { createChatWindow } from '../ChatWindow/ChatWindow';
import { createContactItem } from '../../components/ContactItem/ContactItem';
import { ResourceURL } from '../../utils/HttpTransport';
import formatTime from '../../utils/DateFormatter';

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
        const compile = this.compile(template as string, this.props);
        const contactElement: HTMLElement = compile.querySelector('#contacts')!;
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

