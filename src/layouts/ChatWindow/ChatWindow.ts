// @ts-ignore
import template from './ChatWindow.hbs?raw';
import Block from '../../utils/Block';
import { createMessageForm } from '../../components/MessageForm/MessageForm';
import { createMessage } from '../../components/Message/Message';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createButton } from '../../components/Button/Button';
import { createInputForm } from '../../components/InputForm/InputForm';
import ChatsAPI from '../../api/ChatsAPI';

export interface AuthFormProps {
    title: string
    avatar: string
    chat_id: string
};

export class createChatWindow extends Block {
    constructor(props: AuthFormProps) {
        super('<div></div>', {
            ...props,
            template: template,
            events: {}
        });
    };

    render() {
        const chat_api = new ChatsAPI();
        const compile = this.compile(template as string, this.props);
        const messageContainerElement: HTMLElement = compile.querySelector('#messages_container')!;
        const headerContainerElement: HTMLElement = compile.querySelector('#chat_header')!;
        const actions = new createAuthForm(
            {
                id_form: 'chat_actions',
                class_name: 'chat_actions'
            }
        );
        actions.hide();
        headerContainerElement.appendChild(actions.element!);
        const actionsContainerElement: HTMLElement = compile.querySelector('#chat_actions')!;
        headerContainerElement.appendChild(
            new createImgButton({
                img_src: '/more.svg',
                img_alt: 'more_button',
                class_name: 'more-button',
                type_name: 'primary',
                id_name: 'more_button',
                onClick: () => {
                    if (actions.getContent()!.style.display == 'none') {
                        actions.show();
                    } else { 
                        actions.hide();
                        create_chat_form.hide();
                        delete_chat_form.hide();
                    }
                }
            }).element!
        );
        const add_user = new createButton({
            label: 'Добавить пользователя',
            class_name: 'add-chat-user-button',
            type_name: 'primary',
            id_name: 'add_user',
            onClick: () => {
                create_chat_form.show();
                delete_chat_form.hide();
            }
        });
        const delete_user = new createButton({
            label: 'Удалить пользователя',
            class_name: 'delete-chat-user-button',
            type_name: 'primary',
            id_name: 'add_user',
            onClick: () => {
                delete_chat_form.show();
                create_chat_form.hide();
            }
        });
        actionsContainerElement.appendChild(add_user.element!);
        actionsContainerElement.appendChild(delete_user.element!);

        const create_chat_form = new createAuthForm ({
            id_form: 'user_chat_form',
            class_name: 'create-chat-form',
            formData: {
                userId: 0
            },
            onSubmit: (data) => {
                data.preventDefault();
                chat_api.addUserToChat(this.props.chat_id, Number(create_chat_form.getFormData().userId));
                create_chat_form.hide();
                delete_chat_form.hide();
                actions.hide();
                this.render();
            }
        });

        const inputForm = new createInputForm({
            required: 'required',
            label: 'ID пользоваетля',
            class_name__group: 'authorization-group',
            class_name__label: 'authorization-label',
            class_name__input: 'authorization-input',
            id_name: 'userId'
        });

        headerContainerElement.appendChild(create_chat_form.element!);
        create_chat_form.hide();
        if (inputForm.element) {
            create_chat_form.element!.appendChild(inputForm.element);
        } else {
            console.error('Ошибка при создании input form для create_chat_title');
        };

        const button = new createButton({
            label: 'Добавить',
            class_name: 'add-chat-user-button',
            id_name: 'create_chat_btn',
        });

        if (button.element) {
            create_chat_form.element!.appendChild(button.element);
        } else {
            console.error('Button element не найден!');
        };

        const delete_chat_form = new createAuthForm ({
            id_form: 'user_chat_delete-form',
            class_name: 'create-chat-form',
            formData: {
                userId: 0
            },
            onSubmit: (data) => {
                data.preventDefault();
                chat_api.removeUserFromChat(this.props.chat_id, Number(delete_chat_form.getFormData().userId));
                delete_chat_form.hide();
                actions.hide();
                this.render();
            }
        });

        const inputDeleteForm = new createInputForm({
            required: 'required',
            label: 'ID пользоваетля',
            class_name__group: 'authorization-group',
            class_name__label: 'authorization-label',
            class_name__input: 'authorization-input',
            id_name: 'userId'
        });

        headerContainerElement.appendChild(delete_chat_form.element!);
        delete_chat_form.hide();
        if (inputDeleteForm.element) {
            delete_chat_form.element!.appendChild(inputDeleteForm.element);
        } else {
            console.error('Ошибка при создании input form для create_chat_title');
        };

        const buttonDelete = new createButton({
            label: 'Удалить',
            class_name: 'delete-chat-user-button',
            id_name: 'create_chat_btn',
        });

        if (buttonDelete.element) {
            delete_chat_form.element!.appendChild(buttonDelete.element);
        } else {
            console.error('Button element не найден!');
        };



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
    
        if (messageContainerElement) messageFormData.map(item => (
            messageContainerElement.appendChild(new createMessage({
                id_name: item[0],
                class_name_position: item[1],
                message_text: item[2],
                time_text: item[3]
            }).element!)
        ));
        const message_form = new createMessageForm({
            formData: {
                message: ''
            },
            onClick: () => { 
                console.log('Форма отправлена:');
            }
        });
        compile.querySelector('#message_form_wrapper')!.appendChild(
            message_form.element!
        );
        return compile;
    };
};
