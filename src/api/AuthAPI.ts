import HTTPTransport from '../utils/HttpTransport.ts';

export interface SignupData {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
}

export interface SigninData {
    login: string
    password: string
}

export interface UserInfo {
    id: number
    first_name: string
    second_name: string
    display_name: string | null
    login: string
    email: string
    phone: string
    avatar: string | null
}


export default class AuthAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    async signUp(data: Record<string, string>) {
        const response = await this.http.post('/auth/signup', { data });
        return JSON.parse(response.responseText);
    }

    async signIn(data: Record<string, string>) {
        const response = await this.http.post('/auth/signin', { data });
        return JSON.parse(response.responseText);
    }

    async logout() {
        const response = await this.http.post('/auth/logout');
        return JSON.parse(response.responseText);
    }

    async getUser() {
        const response = await this.http.get('/auth/user');
        return JSON.parse(response.responseText);
    }
};
