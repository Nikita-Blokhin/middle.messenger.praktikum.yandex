import Block from '../../utils/Block';
import './ChatWindow.scss';
import { withStore } from '../../utils/Store';
import chatsAPI from '../../api/ChatsAPI';
import WebSocketTransport from '../../utils/WebSocketTransport';
import { MessageController } from '../../controller/ChatController';
// @ts-ignore
import template from './ChatWindow.hbs?raw';
import { createMessageForm } from '../../components/MessageForm/MessageForm';
import { createMessage } from '../../components/Message/Message';
import { createImgButton } from '../../components/ImgButton/ImgButton';
import { createAuthForm } from '../../components/AuthForm/AuthForm';
import { createButton } from '../../components/Button/Button';
import { createInputForm } from '../../components/InputForm/InputForm';

interface ChatWindowProps {
    title: string
    avatar: string
    chat_id: string
}

export class createChatWindow extends Block {
    private webSocket: WebSocketTransport | null = null;
    private messageController: MessageController;
  
    constructor(props: ChatWindowProps) {
        super('<div><div/>', {
            ...props,
            events: {
                // onSendMessage: (e: SubmitEvent) => this.onSendMessage(e),
            },
        });
        
    
        this.messageController = new MessageController();
    }
  
    init() {
        this.children.messages = [];
    
        // Connect to WebSocket when selected chat changes
        this.connectToChat();
    }
  
    componentDidUpdate(oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
    // If selected chat changed, update WebSocket connection
        if (oldProps.chat_id !== newProps.chat_id && newProps.chat_id) {
            this.connectToChat();
        }
    
        return true;
    }
  
    private async connectToChat() {
        const { title, avatar, chat_id } = this.props;
        const chatAPI = new chatsAPI();
        let userId = 0;
        chatAPI.getChatUsers(this.props.chat_id).then((data) => {
            userId = Number(data[0].id);
        });
        // const userId = chatAPI.getChatUsers(chat_id).then(
        //     (data) => {
        //         console.log(data)
        //     }
        // )
    
        if (!chat_id) {
            return;
        }
    
        try {
            // Close previous connection if exists
            if (this.webSocket) {
                this.webSocket.close();
                this.webSocket = null;
            }
      
            // Get WebSocket token for the chat
            const response = await chatAPI.getToken(chat_id);
            if (!response) {
                console.error('Failed to get token for chat');
                return;
            }
      
            // Create new WebSocket connection
            this.webSocket = new WebSocketTransport(
                userId, chat_id, response.token
            );
      
            // Set up event handlers
            this.webSocket.on('open', () => {
                console.log('WebSocket connection established');
                // Request last messages on connection
                this.webSocket?.sendMessage('0');
            });
      
            this.webSocket.on('close', () => {
                console.log('WebSocket connection closed');
            });
      
            this.webSocket.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
      
            this.webSocket.on('message', (data) => {
                // Handle incoming messages
                this.handleIncomingMessages(data);
            });
        } catch (error) {
            console.error('Error connecting to chat:', error);
        }
    }
  
    private handleIncomingMessages(data: any) {
    // Parse the message data if needed
        let messages = data;
    
        // If the message is a string, try to parse it as JSON
        if (typeof data === 'string') {
            try {
                messages = JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse message data:', e);
                return;
            }
        }
    
        // If it's an array of old messages
        if (Array.isArray(messages)) {
            // Store messages in reverse order to show newest at the bottom
            messages.reverse();
            this.messageController.addMessages(messages, this.props.chat_id);
        } 
        // If it's a single message
        else if (messages && typeof messages === 'object') {
            this.messageController.addMessage(messages, this.props.chat_id);
        }
    }
  
    // private onSendMessage(message) {
    // e.preventDefault();

    // // Get message input element
    // const form = e.target as HTMLFormElement;
    // const messageInput = form.querySelector('input[name="message"]') as HTMLInputElement;

    // if (!messageInput || !messageInput.value.trim()) {
    //     return;
    // }

    // const message = messageInput.value.trim();

    // Send message through WebSocket
    // if (this.webSocket) {
    //     this.webSocket.sendMessage(message);
    
    // Clear input after sending
    // messageInput.value = '';
    //     }
    // }
  
    render() {
        const chat_api = new chatsAPI();
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
    
        if (messageContainerElement) {messageFormData.map(item => {
            messageContainerElement.appendChild(new createMessage({
                id_name: item[0],
                class_name_position: item[1],
                message_text: item[2],
                time_text: item[3]
            }).element!);
        });}
        const message_form = new createMessageForm({
            formData: {
                message: ''
            },
            onClick: () => {
                this.webSocket?.on('open', ()=>{});
                if (this.webSocket) {
                    this.webSocket.sendMessage(message_form.getFormData().message as string);
                }
            }
        });
        compile.querySelector('#message_form_wrapper')!.appendChild(
            message_form.element!
        );
        return compile;
    };
};


// Connect component to store to get messages and user info
const mapStateToProps = (state: Record<string, any>) => {
    const selectedChatId = state.selectedChat;
  
    return {
        selectedChat: selectedChatId,
        messages: state.messages?.[selectedChatId] || [],
        userId: state.user?.id,
    };
};

export const ChatWindow = withStore(mapStateToProps)(createChatWindow);

// @ts-ignore
// import template from './ChatWindow.hbs?raw';
// import Block from '../../utils/Block';
// import { createMessageForm } from '../../components/MessageForm/MessageForm';
// import { createMessage } from '../../components/Message/Message';
// import { createImgButton } from '../../components/ImgButton/ImgButton';
// import { createAuthForm } from '../../components/AuthForm/AuthForm';
// import { createButton } from '../../components/Button/Button';
// import { createInputForm } from '../../components/InputForm/InputForm';
// import ChatsAPI from '../../api/ChatsAPI';
// // import ChatController from '../../controller/ChatController';
// // import ConnectedMessageList from '../../components/MessageList/MessageList';
// import { MessageController } from '../../controller/ChatController';

// export interface AuthFormProps {
//     title: string
//     avatar: string
//     chat_id: string
// };

// export class createChatWindow extends Block {
//     constructor(props: AuthFormProps) {
//         super('<div></div>', {
//             ...props,
//             template: template,
//             events: {}
//         });
//     };

//     render() {
//         const chat_api = new ChatsAPI();
//         console.log(
//             chat_api.getChatUsers(this.props.chat_id).then((data) => {
//                 console.log(data[0].id);
//             })
//         );
//         const chatController = new MessageController();
//         const compile = this.compile(template as string, this.props);
//         const messageContainerElement: HTMLElement = compile.querySelector('#messages_container')!;
//         const headerContainerElement: HTMLElement = compile.querySelector('#chat_header')!;
//         const actions = new createAuthForm(
//             {
//                 id_form: 'chat_actions',
//                 class_name: 'chat_actions'
//             }
//         );
//         actions.hide();
//         headerContainerElement.appendChild(actions.element!);
//         const actionsContainerElement: HTMLElement = compile.querySelector('#chat_actions')!;
//         headerContainerElement.appendChild(
//             new createImgButton({
//                 img_src: '/more.svg',
//                 img_alt: 'more_button',
//                 class_name: 'more-button',
//                 type_name: 'primary',
//                 id_name: 'more_button',
//                 onClick: () => {
//                     if (actions.getContent()!.style.display == 'none') {
//                         actions.show();
//                     } else { 
//                         actions.hide();
//                         create_chat_form.hide();
//                         delete_chat_form.hide();
//                     }
//                 }
//             }).element!
//         );
//         const add_user = new createButton({
//             label: 'Добавить пользователя',
//             class_name: 'add-chat-user-button',
//             type_name: 'primary',
//             id_name: 'add_user',
//             onClick: () => {
//                 create_chat_form.show();
//                 delete_chat_form.hide();
//             }
//         });
//         const delete_user = new createButton({
//             label: 'Удалить пользователя',
//             class_name: 'delete-chat-user-button',
//             type_name: 'primary',
//             id_name: 'add_user',
//             onClick: () => {
//                 delete_chat_form.show();
//                 create_chat_form.hide();
//             }
//         });
//         actionsContainerElement.appendChild(add_user.element!);
//         actionsContainerElement.appendChild(delete_user.element!);

//         const create_chat_form = new createAuthForm ({
//             id_form: 'user_chat_form',
//             class_name: 'create-chat-form',
//             formData: {
//                 userId: 0
//             },
//             onSubmit: (data) => {
//                 data.preventDefault();
//                 chat_api.addUserToChat(this.props.chat_id, Number(create_chat_form.getFormData().userId));
//                 create_chat_form.hide();
//                 delete_chat_form.hide();
//                 actions.hide();
//                 this.render();
//             }
//         });

//         const inputForm = new createInputForm({
//             required: 'required',
//             label: 'ID пользоваетля',
//             class_name__group: 'authorization-group',
//             class_name__label: 'authorization-label',
//             class_name__input: 'authorization-input',
//             id_name: 'userId'
//         });

//         headerContainerElement.appendChild(create_chat_form.element!);
//         create_chat_form.hide();
//         if (inputForm.element) {
//             create_chat_form.element!.appendChild(inputForm.element);
//         } else {
//             console.error('Ошибка при создании input form для create_chat_title');
//         };

//         const button = new createButton({
//             label: 'Добавить',
//             class_name: 'add-chat-user-button',
//             id_name: 'create_chat_btn',
//         });

//         if (button.element) {
//             create_chat_form.element!.appendChild(button.element);
//         } else {
//             console.error('Button element не найден!');
//         };

//         const delete_chat_form = new createAuthForm ({
//             id_form: 'user_chat_delete-form',
//             class_name: 'create-chat-form',
//             formData: {
//                 userId: 0
//             },
//             onSubmit: (data) => {
//                 data.preventDefault();
//                 chat_api.removeUserFromChat(this.props.chat_id, Number(delete_chat_form.getFormData().userId));
//                 delete_chat_form.hide();
//                 actions.hide();
//                 this.render();
//             }
//         });

//         const inputDeleteForm = new createInputForm({
//             required: 'required',
//             label: 'ID пользоваетля',
//             class_name__group: 'authorization-group',
//             class_name__label: 'authorization-label',
//             class_name__input: 'authorization-input',
//             id_name: 'userId'
//         });

//         headerContainerElement.appendChild(delete_chat_form.element!);
//         delete_chat_form.hide();
//         if (inputDeleteForm.element) {
//             delete_chat_form.element!.appendChild(inputDeleteForm.element);
//         } else {
//             console.error('Ошибка при создании input form для create_chat_title');
//         };

//         const buttonDelete = new createButton({
//             label: 'Удалить',
//             class_name: 'delete-chat-user-button',
//             id_name: 'create_chat_btn',
//         });

//         if (buttonDelete.element) {
//             delete_chat_form.element!.appendChild(buttonDelete.element);
//         } else {
//             console.error('Button element не найден!');
//         };



//         const messageFormData: (string) [][] = [
//             [
//                 '0', 'incoming',
//                 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то' +
//                 'момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все' +
//                 'знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все' +
//                 'еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с' +
//                 'пленкой.',
//                 '11:56'
//             ],
//             [
//                 '1', 'incoming',
//                 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так' +
//                 'никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на' +
//                 'аукционе за 45000 евро.',
//                 '11:57'
//             ],
//             [
//                 '2', 'outgoing',
//                 'Круто!',
//                 '12:00'
//             ],
//         ];
    
//         if (messageContainerElement) {messageFormData.map(item => {
//             messageContainerElement.appendChild(new createMessage({
//                 id_name: item[0],
//                 class_name_position: item[1],
//                 message_text: item[2],
//                 time_text: item[3]
//             }).element!);
//         });}
//         const message_form = new createMessageForm({
//             formData: {
//                 message: ''
//             },
//             onClick: () => { 
//                 chatController.addMessage(message_form.getFormData(), this.props.chat_id);
//             }
//         });
//         compile.querySelector('#message_form_wrapper')!.appendChild(
//             message_form.element!
//         );
//         return compile;
//     };
// };
