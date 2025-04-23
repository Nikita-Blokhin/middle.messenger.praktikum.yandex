import EventBus from './EventBus';

export interface State {
    user: Record<string, unknown> | null
    chats?: Array<Record<string, unknown>>
    messages?: Record<string, Array<Record<string, unknown>>>
    currentChat?: Record<string, unknown> | null
    [key: string]: unknown
};

export class Store extends EventBus {
    private static __instance: Store;
    private state: State = {
        user: null,
        chats: [],
        messages: {},
        currentChat: null,
    };
    listener: Map<string, Array<(value: unknown) => void>> = new Map();

    constructor() {
        super();
        if (Store.__instance) {
            return Store.__instance;
        };

        Store.__instance = this;
    };

    public static getInstance(): Store {
        if (!Store.__instance) {
            Store.__instance = new Store();
        };

        return Store.__instance;
    };

    public getState(): State {
        return this.state;
    };

    public set(path: string, value: unknown): void {
        this.state = {
            ...this.state,
            [path]: value,
        };

        if (this.listener.has(path)) {
            const listener = this.listener.get(path) || [];
            listener.forEach((listener) => listener(value));
        };
    };

    public get(path: string): unknown {
        return this.state[path];
    };

    public subscribe(path: string, callback: (value: unknown) => void): () => void {
        if (!this.listener.has(path)) {
            this.listener.set(path, []);
        };

        const listener = this.listener.get(path) || [];
        listener.push(callback);
        this.listener.set(path, listener);

        return () => {
            const index = listener.indexOf(callback);
            if (index !== -1) {
                listener.splice(index, 1);
                this.listener.set(path, listener);
            };
        };
    };

    public reset(): void {
        this.state = {
            user: null,
            chats: [],
            messages: {},
            currentChat: null,
        };
    };
};

export default Store.getInstance();
