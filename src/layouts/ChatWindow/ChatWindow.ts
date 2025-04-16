import './ChatWindow.scss';
import { createMessageForm } from '../../components/MessageForm/MessageForm';
import { createMessage } from '../../components/Message/Message';
import { createDateDivider } from '../../components/DateDivider/DateDivider';
// @ts-ignore
import template from './ChatWindow.hbs?raw';

const element: HTMLDivElement = document.querySelector('#app')!;
element.innerHTML = template;

const contactFormData: (string) [][] = [
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
const messageContainerElement: HTMLElement = document.getElementById('messages_container')!;
messageContainerElement.appendChild(new createDateDivider({
    id_name: '0',
    date_text: '24 марта'
}).element!);
contactFormData.map(item => (
    messageContainerElement.appendChild(new createMessage({
        id_name: item[0],
        class_name_position: item[1],
        message_text: item[2],
        time_text: item[3]
    }).element!)
));

const messageFormElement: HTMLElement = document.getElementById('message_form_wrapper')!;
messageFormElement.appendChild(new createMessageForm({
    formData: {
        message: ''
    },
    onSubmit: (data) => { 
        console.log('Форма отправлена:', data);
        alert('Данные в консоле');
    }
}).element!);
