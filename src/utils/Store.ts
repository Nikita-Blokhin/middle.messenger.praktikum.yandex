export interface State {
    user: Record<string, any> | null
    chats?: Array<Record<string, any>>
    messages?: Record<string, Array<Record<string, any>>>
    currentChat?: Record<string, any> | null
    [key: string]: any
};

export class Store {
    private static __instance: Store;
    private state: State = {
        user: null,
        chats: [],
        messages: {},
        currentChat: null,
    };
    private listeners: Map<string, Array<(value: any) => void>> = new Map();

    constructor() {
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

    public set(path: string, value: any): void {
        this.state = {
            ...this.state,
            [path]: value,
        };

        if (this.listeners.has(path)) {
            const listeners = this.listeners.get(path) || [];
            listeners.forEach((listener) => listener(value));
        };
    };

    public get(path: string): any {
        return this.state[path];
    };

    public subscribe(path: string, callback: (value: any) => void): () => void {
        if (!this.listeners.has(path)) {
            this.listeners.set(path, []);
        };

        const listeners = this.listeners.get(path) || [];
        listeners.push(callback);
        this.listeners.set(path, listeners);

        return () => {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
                this.listeners.set(path, listeners);
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
