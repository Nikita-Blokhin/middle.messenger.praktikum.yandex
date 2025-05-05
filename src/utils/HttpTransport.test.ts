import { stub } from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { METHODS } from './HttpTransport.ts';
import { BaseURL } from './HttpTransport.ts';

enum responseErrors {
    COOKIE = 'Request failed with status 401, Cookie is not valid',
    LOGIN = 'Request failed with status 401, Login or password is incorrect'
};

describe('Тест модуля отправки запросов:', () => {
    const http = new HTTPTransport();
    
    it('Модуль корректно составляет запрос', async () => {
        const Stub = stub(http, 'request').resolves();
        const method = METHODS.GET;
        await http.get('/a', { data: { b: 'cde', f: 'ghi' } });
        const correctPath = `${BaseURL}/a?b=cde&f=ghi`;
        expect(Stub.calledWithMatch(correctPath, { method }));
    });

    it('Корректный ответ на действия анонима', async () => {
        await http
            .get(`${BaseURL}/auth/user`)
            .catch((error) => {
                const errorString = error.message.toString();
                expect(errorString).to.equal(responseErrors.COOKIE);
            });
    });

    it('Корректный ответ на неверные данные авторизации', async () => {
        await http
            .post(`${BaseURL}/auth/signin`, {
                data: JSON.stringify({ login: '!', password: '!' })
            })
            .catch((error) => {
                const errorString = error.message.toString();
                expect(errorString).to.equal(responseErrors.LOGIN);
            });
    });
});
