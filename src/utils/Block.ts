import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

    private _element: HTMLElement | null = null;
    private _meta: { template: string; props: any } | null = null;
    public eventBus: Function;
    public props: any;
    public id = nanoid(6);
    public children: Record<string, Block | Block[]>;

    constructor(template: string = '', oldProps: any = {}) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        const { props, children } = this._getChildrenAndProps(oldProps);
        this.children = children;
        this.props = this._makePropsProxy(props);

        this._meta = {
            template,
            props
        };

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const { template } = this._meta!;
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template;
        this._element = fragment.content.firstChild as HTMLElement;
    }

    init(): void {
        this._createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _getChildrenAndProps(propsAndChildren: any) {
        const children: Record<string, Block | Block[]> = {}
        const props: Record<string, any> = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length === 0) {
            props[key] = value
            } else {
            value.forEach((obj) => {
                if (obj instanceof Block) {
                children[key] = value
                } else {
                props[key] = value
                }
            })
            }
            return
        }
        if (value instanceof Block) {
            children[key] = value
        } else {
            props[key] = value
        }
        })

        return { children, props }
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    };
    
    componentDidMount(): void {};

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };

    private _componentDidUpdate(oldProps: any, newProps: any): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        };
        this._render();
    };

    // @ts-ignore
    componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    };

    public setProps = (nextProps: any): void => {
        if (!nextProps) {
            return;
        };

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    };

    _addEvents() {
        const { events = {} } = this.props

        Object.keys(events).forEach((eventName) => {
        const handler = events[eventName]
        if (typeof handler === 'function' && this._element) {
            this._element?.addEventListener(eventName, events[eventName])
        }
        })
    }

     _addAttributes() {
        const { attr = {} } = this.props;

        if (this.props.withInternalId) {
            this._element?.setAttribute('data-id', this.id);
        }

        Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }

    _removeEvents() {
        const { events = {} } = this.props

        Object.keys(events).forEach((eventName) => {
        const handler = events[eventName]
        if (typeof handler === 'function' && this._element) {
            this._element.removeEventListener(eventName, handler)
        }
        })
    }

    compile(template: string, props: any): DocumentFragment {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child
                    .map((component: Block) => {
                        return `<div data-id="${component.id}"></div>`
                    })
                    .join('');
            } else {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
            }
        });

        const fragment = document.createDocumentFragment();
        const compiledTemplate = Handlebars.compile(template);
        const tempElement = document.createElement('div');
        tempElement.innerHTML = compiledTemplate(propsAndStubs);

        // Добавляем содержимое во fragment
        while (tempElement.firstChild) {
            fragment.appendChild(tempElement.firstChild);
        }

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((component: Block) => {
                    const stub = fragment.querySelector(`[data-id="${component.id}"]`);
                    if (stub) {
                        stub.replaceWith(component.getContent());
                    }
                });
            } else {
                const stub = fragment.querySelector(`[data-id="${child.id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            }
        });

        return fragment;
    }

    _render() {
        this._removeEvents();
        const block = this.render();

        if (this._element && this._element instanceof HTMLElement) {
            if (!this._element.children || this._element.children.length === 0) {
                this._element.appendChild(block.cloneNode(true));
            } else {
                // Используем appendChild в цикле вместо replaceChildren
                const clonedBlock = block.cloneNode(true);
                while (this._element.firstChild) {
                    this._element.removeChild(this._element.firstChild);
                }
                this._element.appendChild(clonedBlock);
            }

            this._addEvents();
            this._addAttributes();
        }
    }

    render(): DocumentFragment {
        return this.compile(this._meta?.template ?? '', this.props);
    }

    getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Такого элемента нет!')
        }
        return this._element;
    };

    private _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string): any {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any): boolean {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty(): boolean {
                throw new Error("Нет доступа");
            }
        });
    }

    private _createDocumentElement(template: string): HTMLElement {
        return document.createElement(template);
    }

    show(): void {
        this.getContent()!.style.display = "block";
    };

    hide(): void {
        this.getContent()!.style.display = "none";
    };
};

export default Block;
