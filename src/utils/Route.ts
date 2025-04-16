/* eslint-disable no-undef */
import isEqual from './IsEqual';
import Block from './Block';

class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: null | Block;
    private _props: Record<string, unknown>;
    constructor(pathname: string, view: typeof Block, props: Record<string, unknown>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    };

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        };
    };

    leave() {
        if (this._block) {
            this._block.hide();
        };
    };

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    };

    private _renderDom(query: string, block: Block) {
        const root = document.querySelector(query);
        if (root) {
            root.textContent = '';
            root.append(block.getContent()!);
        }
    };

    getParams(pathname: string): Record<string, string> | null {
        const paramNames = [...this._pathname.matchAll(/:([a-zA-Z]+)/g)].map((match) => match[1]);
        const routePattern = this._pathname.replace(/:([a-zA-Z]+)/g, '([^/]+)');
        const regExp = new RegExp(`^${routePattern}$`);
        const matches = pathname.match(regExp);

        if (!matches) {
            return null;
        };

        return paramNames.reduce<Record<string, string>>((params, paramName, index) => {
            params[paramName] = matches[index + 1];
            return params;
        }, {});
    }

    render() {
        const params = this.getParams(window.location.pathname);

        if (!this._block) {
            //@ts-ignore
            this._block = new this._blockClass({ ...params });
            this._renderDom(this._props.rootQuery as string, this._block!);
            return;
        };

        this._block.show();
    };
};

export default class Router {
    private static __instance: Router;
    private history!: History;
    private routes: Route[] = [];
    private readonly _rootQuery: string = '';
    private _currentRoute: null | Route = null;
    private _isProtected = false;
    private _authRoute = '/';
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        };

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    };

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    };

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    };

    _onRoute(pathname: string) {
        if (this._isProtected && !this._isUserLoggedIn() && pathname !== this._authRoute && pathname !== '/sign-up') {
            console.log(`Защищенный маршрут, перенаправление на ${this._authRoute}`);
            this.go(this._authRoute);
            return;
        }
        let route = this.getRoute(pathname);
        if (!route) {
            if (this._currentRoute) this._currentRoute.leave();
            route = this.getRoute('/client-error');
        };

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        };

        if (route) {
            this._currentRoute = route;
            route.render();
        };
    };

    go(pathname: string) {
        window.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    };

    back() {
        this.history.back();
    };

    forward() {
        this.history.forward();
    };

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    };

    setProtectedRoutes(isProtected: boolean, authRoute = '/') {
        this._isProtected = isProtected;
        this._authRoute = authRoute;
    };

    private _isUserLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }
};
