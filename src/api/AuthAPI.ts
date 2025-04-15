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

    async signup(data: SignupData): Promise<XMLHttpRequest> {
        return this.http.post('/auth/signup', { data });
    }

    async signin(data: SigninData): Promise<XMLHttpRequest> {
        return this.http.post('/auth/signin', { data });
    }

    async logout(): Promise<XMLHttpRequest> {
        return this.http.post('/auth/logout');
    }

    async getUser(): Promise<XMLHttpRequest> {
        return this.http.get('/auth/user');
    };
};
