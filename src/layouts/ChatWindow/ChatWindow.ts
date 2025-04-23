import Block from '../../utils/Block';
import './ChatWindow.scss';
import chatsAPI from '../../api/ChatsAPI';
import WebSocketTransport from '../../utils/WebSocketTransport';
// @ts-ignore
import template from './ChatWindow.hbs?raw';
import { createMessageForm } from '../../components/MessageForm/MessageForm';
import { createMessage } from '../../components/Message/Message';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createButton } from '../../components/Button/Button';
import { createInputForm } from '../../components/InputForm/InputForm';
import { createSelectForm } from '../../components/SelectForm/SelectForm';
import { createInputAvatar } from '../../components/InputAvatar/InputAvatar';
import formatTime from '../../utils/DateFormatter';

interface ChatWindowProps {
    title: string
    avatar: string
    chat_id: string
    userId: number
}

export class createChatWindow extends Block {
    private webSocket: WebSocketTransport | null = null;
  
    constructor(props: ChatWindowProps) {
        super('<div><div/>', {
            ...props
        });
    }
  
    init() {
        this.connectToChat();
    }
  
    componentDidUpdate(oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
        if (oldProps.chat_id !== newProps.chat_id && newProps.chat_id) {
            this.connectToChat();
        }
    
        return true;
    }
  
    private async connectToChat() {
        const chatAPI = new chatsAPI();    
        if (!this.props.chat_id) {
            return;
        }
        try {
            if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = null;
            }
            const response = await chatAPI.getToken(this.props.chat_id);
            if (!response) {
                console.error('Failed to get token for chat');
                return;
            }
            this.webSocket = new WebSocketTransport(
                this.props.userId, this.props.chat_id, response
            );
            this.webSocket.on('open', () => {
                console.log('WebSocket connection established');
                this.webSocket?.sendMessage('0');
            });
        } catch (error) {
            console.error('Error connecting to chat:', error);
        }
    }

    render() {
        const chat_api = new chatsAPI();
        const compile = this.compile(template as string, this.props);
        const messageContainerElement: HTMLElement = compile.querySelector('#messages_container')!;
        const headerContainerElement: HTMLElement = compile.querySelector('#chat_header')!;
        const actions = new createAuthForm(
            {
                id_form: 'chat_actions',
                class_name: 'chat-actions'
            }
        );
        actions.hide();
        headerContainerElement.appendChild(actions.element!);
        const actionsContainerElement: HTMLElement = compile.querySelector('#chat_actions')!;
        const userInfoElement: HTMLElement = compile.querySelector('#user_details')!;

        if (userInfoElement) {
            const label_avatar = document.createElement('label');
            label_avatar.htmlFor = 'input_avatar';
            const avatar = document.createElement('img');
            avatar.src =  this.props.avatar ? this.props.avatar : '/avatar.svg';
            avatar.alt = 'аватар';
            avatar.className = 'user-avatar';
            userInfoElement.before(label_avatar);
            label_avatar.appendChild(avatar);
            userInfoElement.before(new createInputAvatar({
                onChange: (e) => {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    if (!target || !target.files || !target.files[0]) return;

                    const file = target.files[0];
                    try {
                        const formData = new FormData();
                        formData.append('chatId', this.props.chat_id);
                        formData.append('avatar', file, file.name);
                        chat_api.updateAvatar(formData);
                        setTimeout(() => this.render(), 3000);
                    } catch (error) {
                        console.error('Ошибка загрузки аватара:', error);
                    }
                },
            }).element!);
        }

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
            label: 'ID пользователя',
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
                
        const delete_chat_form = new createSelectForm ({
            id_form: 'user_chat_delete-form',
            class_name: 'create-chat-form',
            onSubmit: (data) => {
                data.preventDefault();
                chat_api.removeUserFromChat(this.props.chat_id, Number(delete_chat_form.getFormData().userId));
                delete_chat_form.hide();
                actions.hide();
                this.render();
            }
        });
        const selectInputElement: HTMLElement = delete_chat_form.element!.querySelector('#select_input')!;
        if (this.props.chat_id) chat_api.getChatUsers(this.props.chat_id).then(result => {
            result.map((item: { [T: string]: string | number; }) => {
                if (this.props.userId !== item.id) {
                    const option = document.createElement('option');
                    option.value = item.id as string;
                    option.textContent = item.login as string;
                    selectInputElement.appendChild(option);
                }
            });
        });

        headerContainerElement.appendChild(delete_chat_form.element!);
        delete_chat_form.hide();

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

        setTimeout(() => {
            let messageFormData = [];
            if (this.webSocket){
                this.webSocket!.getMessages(0);
                this.webSocket!.socket.addEventListener('message', (event) => {
                    if (!(event.data == '{"type":"pong"}')) {
                        messageFormData = JSON.parse(event.data);
                        if (Array.isArray(messageFormData)) {
                            if (messageContainerElement) {messageFormData.reverse().map(item => {
                                messageContainerElement.appendChild(new createMessage({
                                    id_name: item['id'],
                                    class_name_position: item['user_id'] == this.props.userId
                                        ? 'outgoing'
                                        : 'incoming',
                                    message_text: item['content'],
                                    time_text: formatTime(item['time'], true)
                                }).element!);
                            });}
                        } else if (messageFormData.type === 'message') {
                            messageContainerElement.appendChild(new createMessage({
                                id_name: messageFormData['id'],
                                class_name_position: messageFormData['user_id'] == this.props.userId
                                    ? 'outgoing'
                                    : 'incoming',
                                message_text: messageFormData['content'],
                                time_text: formatTime(messageFormData['time'], true)
                            }).element!);
                        };
                    }
                });
            }
        }, 1400);
        const message_form = new createMessageForm({
            formData: {
                message: ''
            },
            onSubmit: (data) => {
                data.preventDefault();
                if (message_form.validateAllInputs() && message_form.getFormData().message)
                    this.webSocket?.sendMessage(message_form.getFormData().message as string);
                // @ts-ignore
                message_form.element!.querySelector('#message')!.value = '';
                
            }
        });
        compile.querySelector('#message_form_wrapper')!.appendChild(
            message_form.element!
        );
        return compile;
    };
};
