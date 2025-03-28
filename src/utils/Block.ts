import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

declare global {
    interface FormData {
        entries(): IterableIterator<[string, string | Blob]>;
    }
};

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const;

    private _element: HTMLElement | null = null;
    private _meta: { template: string; props: any } | null = null;
    public eventBus: Function;
    public props: Record<string, any>;
    public id = nanoid(6);
    public children: Record<string, Block | Block[]>;

    private regularExpressions: {
        email: RegExp
        login: RegExp
        password: RegExp
        first_name: RegExp
        second_name: RegExp
        phone: RegExp
        message: RegExp
    };
    public inputValidationHandlers: Map<string, (value: string) => boolean>;
    private errorMessages: Map<string, string>;

    constructor(template: string = '', oldProps: Record<string, any> = {}) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        const { props, children } = this._getChildrenAndProps(oldProps);
        this.children = children;
        this.props = this._makePropsProxy(props);

        this._meta = {
            template,
            props
        };

        this.regularExpressions = {
            first_name:/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
            second_name: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
            login: /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$/,
            email: /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
            phone: /^\+?[0-9]{10,15}$/,
            message: /^(?!\s*$).+/
        };
        
        this.inputValidationHandlers = new Map([
            ['first_name', this.regularExpressions.first_name.test.bind(this.regularExpressions.first_name)],
            ['email', this.regularExpressions.email.test.bind(this.regularExpressions.email)],
            ['login', this.regularExpressions.login.test.bind(this.regularExpressions.login)],
            ['password', this.regularExpressions.password.test.bind(this.regularExpressions.password)],
            ['password_retry', this.regularExpressions.password.test.bind(this.regularExpressions.password)],
            ['oldPassword', this.regularExpressions.password.test.bind(this.regularExpressions.password)],
            ['newPassword', this.regularExpressions.password.test.bind(this.regularExpressions.password)],
            ['newPassword_retry', this.regularExpressions.password.test.bind(this.regularExpressions.password)],
            ['second_name', this.regularExpressions.second_name.test.bind(this.regularExpressions.second_name)],
            ['display_name', this.regularExpressions.second_name.test.bind(this.regularExpressions.second_name)],
            ['phone', this.regularExpressions.phone.test.bind(this.regularExpressions.phone)],
            ['message', this.regularExpressions.message.test.bind(this.regularExpressions.message)]
        ]);

        this.errorMessages = new Map([
            ['first_name', 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'],
            ['email', 'укажите электронную почту'],
            ['login', 'латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов'],
            ['password', 'обязательно хотя бы одна заглавная буква и цифра'],
            ['password_retry', 'обязательно хотя бы одна заглавная буква и цифра'],
            ['oldPassword', 'обязательно хотя бы одна заглавная буква и цифра'],
            ['newPassword', 'обязательно хотя бы одна заглавная буква и цифра'],
            ['newPassword_retry', 'обязательно хотя бы одна заглавная буква и цифра'],
            ['second_name', 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'],
            ['display_name', 'первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'],
            ['phone', 'состоит из цифр, может начинается с плюса, 10-15 символов'],
            ['message', 'не должно быть пустым']
        ]);

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    };

    private _addInputValidation() {
        if (!this._element) return;
        if (!this.inputValidationHandlers) return;

        const inputs = this._element.querySelectorAll('input');
        if (!inputs || inputs.length === 0) return;

        inputs.forEach((input) => {
            const name = input.getAttribute('name');
            if (!name) return;
            if (!this.inputValidationHandlers.has(name)) return;
            const validateFn = this.inputValidationHandlers.get(name)!;
            this._removeErrorSpan(input);
            
            const inputHandler = (event: Event) => {
                const target = event.target as HTMLInputElement;
                const isValid = validateFn(target.value);
                console.log(`Validation for ${name}: ${target.value} - ${isValid}`);
                this._updateValidationUI(target, name, isValid);
            };
            
            (input as any)._validationHandler = inputHandler;

            input.addEventListener('input', inputHandler);

            const isValid = validateFn(input.value);
            this._updateValidationUI(input, name, isValid);
        });
    };
    private _updateValidationUI(input: HTMLInputElement, fieldName: string, isValid: boolean) {
        if (!this.errorMessages) return;
        
        this._removeErrorSpan(input);
        
        if (!isValid && input.value !== '') {
            const errorMessage = this.errorMessages.get(fieldName) || 'Invalid input';
            this._addErrorSpan(input, errorMessage);
            input.classList.add('invalid');
            input.classList.remove('valid');
        } else if (input.value !== '') {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.remove('valid', 'invalid');
        };
    };

    private _addErrorSpan(input: HTMLInputElement, message: string) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'input-error';
        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '12px';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '4px';
        
        if (input.parentNode) {
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        };
    };

    private _removeErrorSpan(input: HTMLInputElement) {
        const nextSibling = input.nextSibling;
        if (nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE) {
            const element = nextSibling as HTMLElement;
            if (element.className === 'input-error') {
                element.parentNode?.removeChild(element);
            };
        };
    };

    private _handleFormSubmit = (event: Event) => {
        event.preventDefault();
        
        if (!this._element) return;
        if (!this.inputValidationHandlers) return;
        
        const formData = new FormData(this._element as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        let isValid = true;

        Object.entries(data).forEach(([name, value]) => {
            if (!this.inputValidationHandlers.has(name)) return;
            
            const validateFn = this.inputValidationHandlers.get(name)!;
            const result = validateFn(value as string);
            console.log(`Валидация ${name}: ${value} - ${result}`);

            const input = this._element?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
            if (input) {
                this._updateValidationUI(input, name, result);
            };
            
            if (!result) isValid = false;
        });

        if (isValid) {
            console.log('Form data:', data);
        } else {
            console.warn('Валидация формы провалилась');
        };
    };

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };

    private _createResources(): void {
        const { template } = this._meta!;
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template;
        this._element = fragment.content.firstChild as HTMLElement;
    };

    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };

    private _getChildrenAndProps(propsAndChildren: Record<string, any>) {
        const children: Record<string, Block | Block[]> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    props[key] = value;
                } else {
                    value.forEach((obj) => {
                        if (obj instanceof Block) {
                            children[key] = value;
                        } else {
                            props[key] = value;
                        }
                    });
                };
                return;
            };
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            };
        });

        return { children, props };
    };

    private _componentDidMount(): void {
        this.componentDidMount();
    };
    
    componentDidMount(): void {};

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };

    private _componentDidUpdate(oldProps: Record<string, Record<string, any>>, newProps: any): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        };
        this._render();
    };

    // @ts-ignore
    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return true;
    };

    public setProps = (nextProps: Record<string, any>): void => {
        if (!nextProps) {
            return;
        };

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    };

    private _addEvents() {
        if (!this._element) return;
        
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            const handler = events[eventName];
            if (typeof handler === 'function' && this._element) {
                this._element.addEventListener(eventName, handler);
            };
        });
        
        if (this._element.tagName.toLowerCase() === 'form') {
            this._element.addEventListener('submit', this._handleFormSubmit);
        };
    };

    private _addAttributes() {
        if (!this._element) return;
        
        const { attr = {} } = this.props;

        if (this.props.withInternalId) {
            this._element.setAttribute('data-id', this.id);
        };

        Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
            this._element!.setAttribute(key, value as string);
        });
    };

    private _removeEvents() {
        if (!this._element) return;
        
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            const handler = events[eventName];
            if (typeof handler === 'function') {
                this._element!.removeEventListener(eventName, handler);
            };
        });

        if (this._element.tagName.toLowerCase() === 'form') {
            this._element.removeEventListener('submit', this._handleFormSubmit);
        };

        const inputs = this._element.querySelectorAll('input');
        if (inputs) {
            inputs.forEach(input => {
                const handler = (input as any)._validationHandler;
                if (handler) {
                    input.removeEventListener('input', handler);
                    delete (input as any)._validationHandler;
                };
            });
        };
    };

    compile(template: string, props: Record<string, any>): DocumentFragment {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child
                    .map((component: Block) => {
                        return `<div data-id="${component.id}"></div>`;
                    })
                    .join('');
            } else {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
            };
        });

        const fragment = document.createDocumentFragment();
        const compiledTemplate = Handlebars.compile(template);
        const tempElement = document.createElement('div');
        tempElement.innerHTML = compiledTemplate(propsAndStubs);

        while (tempElement.firstChild) {
            fragment.appendChild(tempElement.firstChild);
        };

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((component: Block) => {
                    const stub = fragment.querySelector(`[data-id="${component.id}"]`);
                    if (stub) {
                        stub.replaceWith(component.getContent());
                    };
                });
            } else {
                const stub = fragment.querySelector(`[data-id="${child.id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                };
            };
        });

        return fragment;
    };

    private _render() {
        this._removeEvents();
        const block = this.render();

        if (this._element && this._element instanceof HTMLElement) {
            if (!this._element.children || this._element.children.length === 0) {
                this._element.appendChild(block.cloneNode(true));
            } else {
                const clonedBlock = block.cloneNode(true);
                while (this._element.firstChild) {
                    this._element.removeChild(this._element.firstChild);
                }
                this._element.appendChild(clonedBlock);
            };

            this._addEvents();
            this._addAttributes();
            this._addInputValidation();
        };
    };

    render(): DocumentFragment {
        return this.compile(this._meta?.template ?? '', this.props);
    };

    getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Такого элемента нет!');
        };
        return this._element;
    };

    private _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string): any {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any): boolean {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty(): boolean {
                throw new Error('Нет доступа');
            }
        });
    };

    private _createDocumentElement(template: string): HTMLElement {
        return document.createElement(template);
    };

    show(): void {
        this.getContent()!.style.display = 'block';
    };

    hide(): void {
        this.getContent()!.style.display = 'none';
    };

    public validateAllInputs(): boolean {
        if (!this._element) return false;
        if (!this.inputValidationHandlers) return false;
        
        const inputs = this._element.querySelectorAll('input');
        let isValid = true;

        if (inputs) {
            inputs.forEach(input => {
                const name = input.getAttribute('name');
                if (!name) return;
                if (!this.inputValidationHandlers.has(name)) return;
                
                const validateFn = this.inputValidationHandlers.get(name)!;
                const value = (input as HTMLInputElement).value;
                const result = validateFn(value);

                this._updateValidationUI(input as HTMLInputElement, name, result);
                
                console.log(`Валидация ${name}: ${value} - ${result}`);
                if (!result) isValid = false;
            });
        };

        return isValid;
    };

    public getFormData(): Record<string, string | Blob> {
        if (!this._element) return {};
        
        const formData = new FormData(this._element as HTMLFormElement);
        return Object.fromEntries(formData.entries());
    };

    public logFormData(): void {
        const data = this.getFormData();
        console.log('Form data:', data);
    };

    public validateAndLog(): void {
        const isValid = this.validateAllInputs();
        if (isValid) {
            this.logFormData();
        } else {
            console.warn('Валидация формы провалилась');
        };
    };
};

export default Block;
