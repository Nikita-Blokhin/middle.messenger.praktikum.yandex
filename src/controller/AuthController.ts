import AuthAPI from '../api/AuthAPI.ts';
import router from '../core/router.ts';

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    };

    async signIn(data: Record<string, string>) {
        try {
            await this.api.signIn(data);
            await this.fetchUser();
            router.go('/chats');
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            throw error;
        };
    };

    async signUp(data: Record<string, string>) {
        try {
            await this.api.signUp(data);
            await this.fetchUser();
            router.go('/chats');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            throw error;
        };
    };

    async logout() {
        try {
            await this.api.logout();
            router.go('/');
        } catch (error) {
            console.error('Ошибка выхода:', error);
            throw error;
        };
    };

    async fetchUser() {
        try {
            const user = await this.api.getUser();
            return user;
        } catch (error) {
            console.error('Ошибка получения данных пользователя:', error);
            throw error;
        };
    };
}
export default new AuthController();
