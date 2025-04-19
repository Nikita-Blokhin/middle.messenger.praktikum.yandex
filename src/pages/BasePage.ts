import Block from '../utils/Block';

export default abstract class BasePage extends Block {
    private _element_page: HTMLElement;
    private _isShown = false;

    constructor(tagName = 'div', className = '') {
        super();
        this._element_page = document.createElement(tagName);
        if (className) {
            this._element_page.className = className;
        };
        this.render_page();
    };

    render_page() {};

    getContent(): HTMLElement {
        return this._element_page;
    };

    show() {
        this._isShown = true;
        this._element_page.style.display = 'block';
    };

    hide() {
        this._isShown = false;
        this._element_page.style.display = 'none';
    };

    isShown(): boolean {
        return this._isShown;
    };
};
