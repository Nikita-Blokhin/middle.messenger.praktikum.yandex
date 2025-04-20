import EventBus from './EventBus';

export interface State {
    user: Record<string, any> | null
    chats?: Array<Record<string, any>>
    messages?: Record<string, Array<Record<string, any>>>
    currentChat?: Record<string, any> | null
    [key: string]: any
};

export class Store extends EventBus {
    private static __instance: Store;
    private state: State = {
        user: null,
        chats: [],
        messages: {},
        currentChat: null,
    };
    listener: Map<string, Array<(value: any) => void>> = new Map();

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

    public set(path: string, value: any): void {
        this.state = {
            ...this.state,
            [path]: value,
        };

        if (this.listener.has(path)) {
            const listener = this.listener.get(path) || [];
            listener.forEach((listener) => listener(value));
        };
    };

    public get(path: string): any {
        return this.state[path];
    };

    public subscribe(path: string, callback: (value: any) => void): () => void {
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

export function withStore(mapStateToProps: (state: Record<string, any>) => Record<string, any>) {
    return function<P extends Record<string, any>>(Component: new (props: P) => Block) {
        return class WithStore extends Component {
            private store: Store;
            private unsubscribe: () => void;

            constructor(props: P) {
                const store = Store.getInstance();

                super({
                    ...props,
                    ...mapStateToProps(store.getState()),
                });

                this.store = store;
        
                this.unsubscribe = this.store.on('update', {
                    this: setProps({
                        ...mapStateToProps(store.getState()),
                    })
                });
            }

            componentWillUnmount() {
                this.unsubscribe();
            }
        };
    };
}

export default Store.getInstance();
