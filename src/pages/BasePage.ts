// Базовый класс для всех страниц
export default abstract class BasePage {
    private _element: HTMLElement;
    private _isShown = false;

    constructor(tagName = 'div', className = '') {
        this._element = document.createElement(tagName);
        if (className) {
            this._element.className = className;
        }
        this.render();
    }

    render() {
    // Переопределяется в дочерних классах
    }

    getContent(): HTMLElement {
        return this._element;
    }

    show() {
        this._isShown = true;
        this._element.style.display = 'block';
    }

    hide() {
        this._isShown = false;
        this._element.style.display = 'none';
    }

    isShown(): boolean {
        return this._isShown;
    }
}
