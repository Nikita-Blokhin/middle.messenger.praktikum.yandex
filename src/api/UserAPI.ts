import HTTPTransport from '../utils/HttpTransport.ts';

class UsersAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    };

    async updateProfile(data: Record<string, string>) {
        const response = await this.http.put('/user/profile', { data });
        return JSON.parse(response.responseText);
    };

    async updateAvatar(formData: FormData) {
        const response = await this.http.put('/user/profile/avatar', {
            data: formData
        });
        
        return JSON.parse(response.responseText);
    };

    async updatePassword(data: { oldPassword: string; newPassword: string }) {
        await this.http.put('/user/password', { data });
    };

    async searchUser(login: string) {
        const response = await this.http.post('/user/search', { data: { login } });
        return JSON.parse(response.responseText);
    };
};

export default UsersAPI;
