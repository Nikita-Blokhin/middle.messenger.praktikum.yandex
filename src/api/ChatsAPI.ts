// import HTTPTransport from '../utils/HttpTransport.ts';

// export interface ChatInfo {
//   id: number
//   title: string
//   avatar: string
//   unread_count: number
//   last_message: {
//     user: {
//       first_name: string
//       second_name: string
//       avatar: string
//       email: string
//       login: string
//       phone: string
//     }
//     time: string
//     content: string
//   } | null
// }

// export default class ChatsAPI {
//     private http: HTTPTransport;

//     constructor() {
//         this.http = new HTTPTransport();
//     }

//     async getChats(): Promise<ChatInfo[]> {
//         return this.http.get('/chats').then((response) => JSON.parse(response as string));
//     }

//     async createChat(title: string): Promise<{ id: number }> {
//         return this.http.post('/chats', { data: { title } }).then((response) => JSON.parse(response as string));
//     }

//     async deleteChat(chatId: number): Promise<XMLHttpRequest> {
//         return this.http.delete('/chats', { data: { chatId } }).then((response) => response);
//     }

//     async getUsers(chatId: number): Promise<Array<{ id: number; role: string }>> {
//         return this.http.get(`/chats/${chatId}/users`).then((response) => JSON.parse(response as string));
//     }

//     async addUsers(chatId: number, users: number[]): Promise<XMLHttpRequest> {
//         return this.http.put('/chats/users', { data: { chatId, users } }).then((response) => response);
//     }

//     async deleteUsers(chatId: number, users: number[]): Promise<XMLHttpRequest> {
//         return this.http.delete('/chats/users', { data: { chatId, users } }).then((response) => response);
//     }

//     async getToken(chatId: number): Promise<string> {
//         const response = await this.http.post(`/chats/token/${chatId}`);
//         return JSON.parse(response as string).token;
//     }

//     async updateAvatar(chatId: number, formData: FormData): Promise<ChatInfo> {
//         formData.append('chatId', chatId.toString());

//         return this.http
//             .put('/chats/avatar', {
//                 data: formData,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             })
//             .then((response) => JSON.parse(response as string));
//     };
// };

import HTTPTransport from '../utils/HttpTransport.ts';


class ChatsAPI {
    private http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    async getChats() {
        const response = await this.http.get('/chats');
        return JSON.parse(response.responseText);
    }

    async createChat(title: string) {
        const response = await this.http.post('/chats', { data: { title } });
        return JSON.parse(response.responseText);
    }

    async deleteChat(chatId: number) {
        const response = await this.http.delete('/chats', { data: { chatId } });
        return JSON.parse(response.responseText);
    }

    async getChatUsers(chatId: number) {
        const response = await this.http.get(`/chats/${chatId}/users`);
        return JSON.parse(response.responseText);
    }

    async addUserToChat(chatId: number, userId: number) {
        const response = await this.http.put('/chats/users', { data: { chatId, users: [userId] } });
        return JSON.parse(response.responseText);
    }

    async removeUserFromChat(chatId: number, userId: number) {
        const response = await this.http.delete('/chats/users', { data: { chatId, users: [userId] } });
        return JSON.parse(response.responseText);
    }

    async getToken(chatId: number) {
        const response = await this.http.post(`/chats/token/${chatId}`);
        return JSON.parse(response.responseText).token;
    }
}

export default ChatsAPI;

