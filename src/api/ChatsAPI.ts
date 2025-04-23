import HTTPTransport from '../utils/HttpTransport.ts';

class ChatsAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    };

    async getChats() {
        const response = await this.http.get('/chats');
        return JSON.parse(response.responseText);
    };

    async createChat(title: string) {
        const response = await this.http.post('/chats', { data: { title } });
        return JSON.parse(response.responseText);
    };

    async deleteChat(chatId: number) {
        const response = await this.http.delete('/chats', { data: { chatId } });
        return JSON.parse(response.responseText);
    };

    async getChatUsers(chatId: number) {
        const response = await this.http.get(`/chats/${chatId}/users`);
        return JSON.parse(response.responseText);
    };

    async addUserToChat(chatId: number, userId: number) {
        await this.http.put('/chats/users', { data: { chatId, users: [userId] } });
    };

    async removeUserFromChat(chatId: number, userId: number) {
        await this.http.delete('/chats/users', { data: { chatId, users: [userId] } });
    };

    async getToken(chatId: number) {
        const response = await this.http.post(`/chats/token/${chatId}`);
        return JSON.parse(response.responseText).token;
    };

    async updateAvatar(formData: FormData) {
        const response = await this.http.put('/chats/avatar', {
            data: formData
        });
        return JSON.parse(response.responseText);
    };
};

export default ChatsAPI;

