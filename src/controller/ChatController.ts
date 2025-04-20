import { Store } from '../utils/Store.ts';
import ChatsAPI from '../api/ChatsAPI.ts';

class ChatController {
    private sockets: { [chatId: number]: WebSocket } = {};
    private api: ChatsAPI;
    private store: Store;

    constructor() {
        this.api = new ChatsAPI();
        this.store = Store.getInstance();
    };

    public getChatToken(chatId: number) {
        return this.api
            .getToken(chatId)
            .then((data) => {
                const token = JSON.parse(data.responseText).token;
                this.store.set(`token_${chatId}`, token);
                return token;
            })
            .catch((err) => console.log('Ошибка при получении токена', err));
    }

    public connectToChat(chatId: number) {
        console.log(this.sockets);
        this.getChatToken(chatId)
            .then((token) => {
                const userId = (this.store.getState().user!).id;
                const socketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
                const socket = new WebSocket(socketUrl) as WebSocket;
                this.sockets[chatId] = socket;

                socket.addEventListener('open', () => {
                    console.log(`WS-соединение установлено (чат ${chatId}). Запрашиваем старые сообщения...`);
                    socket.send(
                        JSON.stringify({
                            content: '0',
                            type: 'get old'
                        })
                    );
                });

                socket.addEventListener('message', (event: MessageEvent) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (Array.isArray(data)) {
                            const reversed = data.reverse();
                            this.store.set('messages', {
                                ...this.store.getState().messages,
                                [chatId]: reversed
                            });
                            this.store.set('errorMessage', JSON.stringify(reversed));
                        } else if (data.type === 'message' || data.type === 'file') {
                            const currentMessages = this.store.getState().messages?.[chatId] || [];
                            const newMessages = [...currentMessages, data];
                            this.store.set('messages', {
                                ...this.store.getState().messages,
                                [chatId]: newMessages
                            });
                            this.store.set('errorMessage', JSON.stringify(newMessages));
                        }
                    } catch (error) {
                        console.error('Ошибка обработки входящего сообщения:', error);
                    }
                });

                socket.addEventListener('close', (closeEvent: CloseEvent) => {
                    if (!closeEvent.wasClean) {
                        console.log('WS обрыв. Попытка переподключиться через 3 сек...');
                        setTimeout(() => this.connectToChat(chatId), 3000);
                    }
                    console.log(`Код: ${closeEvent.code} | Причина: ${closeEvent.reason}`);
                });

                socket.addEventListener('error', (errorEvent: Event) => {
                    console.error('Ошибка в WebSocket:', errorEvent);
                });
            })
            .catch((error) => {
                console.error('Ошибка при подключении к чату:', error);
            });
    }

    public sendMessage(chatId: number, messageText: string) {
        const socket = this.sockets[chatId];
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    content: messageText,
                    type: 'message'
                })
            );
            console.log('Сообщение отправлено в WebSocket:', messageText);
        } else {
            console.log('WebSocket соединение не установлено или уже закрыто.');
        }
    }
}

export default new ChatController;
