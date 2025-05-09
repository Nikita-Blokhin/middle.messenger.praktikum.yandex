import BasePage from '../pages/BasePage';

export enum Routes {
    Index = '/',
    Register = '/sign-up',
    Profile = '/settings',
    Messenger = '/messenger',
    Error404 = '/404',
    Error500 = '/500',
    EditProfile = '/settings/edit',
    PasswordProfile = '/settings/password'
}
type Props = Record<string, string | number>;
export class Route {
    private _pathname: string;
    private _blockClass: BasePage;
    private _block: any | null;
    private _props: Props;

    constructor(pathname: string, view: any, props: Props = {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        };
    };

    leave() {
        if (this._block) {
            this._block.hide();
            this._block.getContent().remove();
            this._block = null;
        };
    };

    match(pathname: string) {
        return pathname === this._pathname;
    };

    render() {
        if (!this._block) {
            // @ts-ignore
            this._block = new this._blockClass(this._props);
            const root = document.querySelector('#app');
            if (root) {
                root.appendChild(this._block!.getContent());
            };
            this._block!.show();
            return;
        };

        this._block.show();
    };
};

export class Router {
    private static __instance: Router;
    private _routes: Route[] = [];
    private _history: History = window.history;
    private _currentRoute: Route | null = null;
    // @ts-ignore
    private _rootQuery = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        };

        this._rootQuery = rootQuery;
        Router.__instance = this;
    };

    use(pathname: string, block: any, props: Props = {}) {
        const route = new Route(pathname, block, props);
        this._routes.push(route);
        return this;
    };

    start() {
        // @ts-ignore
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    };

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this.go('/');
            return;
        };

        if (this._currentRoute) {
            this._currentRoute.leave();
        };

        this._currentRoute = route;
        route.render();
    };

    go(pathname: string) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    };

    back() {
        this._history.back();
    };

    forward() {
        this._history.forward();
    };

    getRoute(pathname: string) {
        return this._routes.find((route) => route.match(pathname));
    };
};

export default new Router('#app');
