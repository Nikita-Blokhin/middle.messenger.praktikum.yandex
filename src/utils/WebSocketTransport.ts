export interface Message {
    chat_id: number
    time: string
    type: string
    user_id: number
    content: string
    file?: {
        id: number
        user_id: number
        path: string
        filename: string
        content_type: string
        content_size: number
        upload_date: string
    }
};

export default class WebSocketTransport {
    private socket: WebSocket;
    private pingInterval: number | null = null;
    private eventHandlers: Record<string, Function[]> = {
        open: [],
        close: [],
        message: [],
        error: [],
    };
    private readonly PING_INTERVAL_MS = 30000;

    constructor(userId: number, chatId: number, token: string) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this.setupListeners();
    };

    private setupListeners() {
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.startPinging();
            this.getMessages();
        });

        // this.socket.addEventListener('close', (event) => {
        //     if (this.pingInterval) {
        //         clearInterval(this.pingInterval);
        //         this.pingInterval = null;
        //     };

        //     if (event.wasClean) {
        //         console.log('Соединение закрыто чисто');
        //     } else {
        //         console.log('Обрыв соединения');
        //     };

        //     console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        // });

        this.socket.addEventListener('error', (event) => {
            console.error('Ошибка', event);
        });
    };

    private startPinging() {
        this.pingInterval = window.setInterval(() => {
            this.ping();
        }, this.PING_INTERVAL_MS);
    };

    public addMessageListener(callback: (messages: Message | Message[]) => void) {
        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);

            if (Array.isArray(data)) {
                callback(data.reverse());
            } else if (data.type === 'message') {
                callback(data);
            };
        });
    };

    public sendMessage(content: string) {
        this.socket.send(
            JSON.stringify({
                content,
                type: 'message',
            }),
        );
    };

    public getMessages(offset = 0) {
        this.socket.send(
            JSON.stringify({
                content: offset.toString(),
                type: 'get old',
            }),
        );
    };

    public ping() {
        this.socket.send(
            JSON.stringify({
                type: 'ping',
            }),
        );
    };

    public close() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        };
        this.socket.close();
    };

    public on(event: 'open' | 'close' | 'message' | 'error', callback: Function): void {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].push(callback);
        }
    }
};
