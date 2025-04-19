enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

type Options = {
    method?: METHODS
    data?: any
    headers?: Record<string, string>
    timeout?: number
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
export const BaseURL = 'https://ya-praktikum.tech/api/v2';

export class HTTPTransport {
    private _baseUrl: string;

    constructor() {
        this._baseUrl = BaseURL;
    };

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request(url: string, options: Options = {}): Promise<XMLHttpRequest> {
        const { method = METHODS.GET, data, headers = {}, timeout = 5000 } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${this._baseUrl}${url}${this._queryStringify(data)}` : `${this._baseUrl}${url}`,
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
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
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
                    typeof data === 'string' || typeof data === 'object'
                        ? data
                        : JSON.stringify(data)
                );
            };
        });
    };

    private _queryStringify(data: Record<string, any>): string {
        if (!data) return '';

        const keys = Object.keys(data);
        return keys.length ? `?${keys.map((key) => `${key}=${data[key]}`).join('&')}` : '';
    };
};

export default HTTPTransport;
