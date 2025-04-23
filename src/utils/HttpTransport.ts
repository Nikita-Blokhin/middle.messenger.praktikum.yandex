import queryStringify from './QueryStringify';
enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

type Options = {
    method?: METHODS
    data?: unknown
    headers?: Record<string, string>
    timeout?: number
};

type HTTPMethod = <R=XMLHttpRequest>(url: string, options?: Options ) => Promise<R>

export const BaseURL = 'https://ya-praktikum.tech/api/v2';
export const ResourceURL = BaseURL + '/resources';

export class HTTPTransport {
    private _baseUrl: string;

    constructor() {
        this._baseUrl = BaseURL;
    };

    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request: HTTPMethod = (url, options = {}) => {
        const { method = METHODS.GET, data, headers = {}, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${this._baseUrl}${url}${queryStringify(data)}` : `${this._baseUrl}${url}`,
            );

            xhr.timeout = timeout;
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
            if (!headers['Content-Type'] && method !== METHODS.GET && !(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            xhr.withCredentials = true;

            xhr.onload = () => {
                if (xhr.status >= 100 && xhr.status < 300) {
                    resolve(xhr as unknown as PromiseLike<any>);
                } else {
                    reject(xhr);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(
                    typeof data === 'string' || data instanceof FormData
                        ? data
                        : JSON.stringify(data)
                );
            };
        });
    };
};

export default HTTPTransport;
