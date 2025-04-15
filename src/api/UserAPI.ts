import HTTPTransport from '../utils/HttpTransport.ts';
import type { UserInfo } from './AuthAPI';

export interface PasswordData {
  oldPassword: string
  newPassword: string
};

export interface UserProfileData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
};

export default class UserAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    };

    async updateProfile(data: UserProfileData): Promise<UserInfo> {
        return this.http.put('/user/profile', { data }).then((response) => JSON.parse(response as string));
    };

    async updateAvatar(formData: FormData): Promise<UserInfo> {
        return this.http
            .put('/user/profile/avatar', {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => JSON.parse(response as string));
    };

    async updatePassword(data: PasswordData): Promise<XMLHttpRequest> {
        return this.http.put('/user/password', { data }).then((response) => response);
    };

    async getUserById(id: number): Promise<UserInfo> {
        return this.http.get(`/user/${id}`).then((response) => JSON.parse(response as string));
    };

    async searchUser(login: string): Promise<UserInfo[]> {
        return this.http.post('/user/search', { data: { login } }).then((response) => JSON.parse(response as string));
    };
};
