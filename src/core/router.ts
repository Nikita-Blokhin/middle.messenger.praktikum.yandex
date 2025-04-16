export class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: any;
    private _props: Record<string, any>;

    constructor(pathname: string, view: any, props: Record<string, any> = {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
            this._block.getContent().remove();
            this._block = null;
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            const root = document.querySelector('#app');
            if (root) {
                root.appendChild(this._block.getContent());
            }
            this._block.show();
            return;
        }

        this._block.show();
    }
}

export class Router {
    private static __instance: Router;
    private _routes: Route[] = [];
    private _history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, block: any, props: Record<string, any> = {}) {
        const route = new Route(pathname, block, props);
        this._routes.push(route);
        return this;
    }

    start() {
    // Обработчик на изменение адреса в адресной строке
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute(window.location.pathname);
        };

        // Инициализация маршрута при загрузке страницы
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            // Если маршрут не найден, перенаправляем на страницу входа
            this.go('/');
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    getRoute(pathname: string) {
        return this._routes.find((route) => route.match(pathname));
    }
}

// Создаем экземпляр роутера
export default new Router('#app');
