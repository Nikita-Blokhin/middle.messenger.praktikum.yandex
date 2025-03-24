import "./SideBar.scss";
import createContactItem from '../../components/ContactItem/ContactItem';
import createSearhInput from '../../components/SearhInput/SearhInput';
// @ts-ignore
import template from './SideBar.hbs?raw';

const element: HTMLDivElement | null = document.querySelector('#sidebar');
if (element) {
    element.innerHTML = template;
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
const contactFormData: (string | number)[][] = [
  [0, '', 'Андрей', 'Изображение', '2', '10:49'],
  [1, '', 'Киноклуб', 'Вы: стикер', '', '12:00'],
  [2, '', 'Илья', 'Друзья, у меня для вас особенный выпуск новостей!...', '15', '15:12'],
  [3, '', 'Вадим', 'Вы: Круто!', '', '11:56'],
  [4, '', 'тет-а-теты', 'И Human Interface Guidelines и Material Design рекомендуют...', '', 'Ср'],
  [5, '', '1, 2, 3', 'Миллионы россиян ежедневно проводят десятки часов свое...', '', 'Пн'],
  [6, '', 'Design Destroyer', 'В 2008 году художник Jon Rafman начал собирать...', '', 'Пн'],
  [7, '', 'Day.', 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', '', '1 Мая 2020']
];
const contactElement: HTMLElement | null = document.getElementById('contacts');

if (contactElement) {
  contactFormData.map(item => (
      contactElement.appendChild(createContactItem({
        id_name: item[0],
        class_name_contact_item: ClassNameContactItem + (item[0] === 3 ? ' active' : ''),
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
    }))
  ));
};

const searhBarElement: HTMLElement | null = document.getElementById('search_bar');
if (searhBarElement) {
    searhBarElement.appendChild(createSearhInput({}))
};
