class EventBus {
    public listeners: { [key: string]: Function[] } = {};

    public on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        };

        this.listeners[event].push(callback);
    };

    public off(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            throw new Error(`Событие отсутствует: ${event}`);
        };

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    };

    public emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Событие отсутствует: ${event}`);
        };

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    };
};

export default EventBus;
