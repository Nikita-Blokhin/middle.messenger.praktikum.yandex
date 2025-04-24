import AuthAPI from '../api/AuthAPI.ts';
import router, { Routes } from '../core/router.ts';
import { Store } from '../utils/Store.ts';

class AuthController {
    private api: AuthAPI;
    private store: Store;
    private router: typeof router;

    constructor() {
        this.api = new AuthAPI();
        this.store = Store.getInstance();
        this.router = router;
    };

    async signIn(data: Record<string, string>) {
        try {
            await this.api.signIn(data);
            const user = await this.fetchUser();

            if (user) {
                this.router.go(Routes.Messenger);
            }
        } catch (error) {
            // @ts-ignore
            if (JSON.parse(error.responseText)['reason'] === 'User already in system') router.go(Routes.Messenger);
            console.error('Sign in error:', error);
            throw error;
        }
    }

    async signUp(data: Record<string, string>) {
        try {
            await this.api.signUp(data);
            const user = await this.fetchUser();

            if (user) {
                this.router.go(Routes.Messenger);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.api.logout();
            this.store.set('user', null);
            this.router.go(Routes.Index);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        };
    };

    async fetchUser() {
        try {
            const user = await this.api.getUser();
            if (user) {
                this.store.set('user', user);
            };
            return user;
        } catch (error) {
            // @ts-ignore
            if (JSON.parse(error.responseText)['reason'] === 'Cookie is not valid') router.go(Routes.Index);
            console.error('Fetch user error:', error);
            this.store.set('user', null);
            return null;
        };
    };
};

export default new AuthController();
