// const METHODS = {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//     DELETE: 'DELETE',
// } as const;

// function queryStringify(data: Record<string, string>): string {
//     if (typeof data !== 'object' || data === null) {
//         throw new Error('Data must be object');
//     }

//     const keys = Object.keys(data);
//     return keys.reduce((result, key, index) => {
//         return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
//     }, '?');
// };

// interface HttpOptions {
//     headers?: Record<string, string>
//     data?: any
//     method: typeof METHODS[keyof typeof METHODS]
// };

// const BaseURL = 'https://ya-praktikum.tech/api/v2';

// export default class HTTPTransport {
//     private _baseUrl: string;

//     constructor() {
//         this._baseUrl = BaseURL;
//     };

//     get = (url: string, options: { headers?: Record<string, string>; timeout?: number } = {}): Promise<XMLHttpRequest> => {
//         return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
//     };

//     post = (url: string, options: { headers?: Record<string, string>; data?: any; timeout?: number } = {}): Promise<XMLHttpRequest> => {
//         return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
//     };

//     put = (url: string, options: { headers?: Record<string, string>; data?: any; timeout?: number } = {}): Promise<XMLHttpRequest> => {
//         return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
//     };

//     delete = (url: string, options: { headers?: Record<string, string>; data?: any; timeout?: number } = {}): Promise<XMLHttpRequest> => {
//         return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
//     };

 
//     request = (url: string,
//         options: HttpOptions,
//         timeout: number = 5000): Promise<XMLHttpRequest> => {
//         const { headers = {}, method, data } = options;

//         return new Promise((resolve, reject) => {
//             if (!method) {
//                 reject('No method');
//                 return;
//             }

//             const xhr = new XMLHttpRequest();
//             const isGet = method === METHODS.GET;

//             xhr.open(
//                 method,
//                 isGet && !!data
//                     ? `${this._baseUrl}${url}${queryStringify(data)}`
//                     : `${this._baseUrl}${url}`,
//             );

//             Object.keys(headers).forEach(key => {
//                 xhr.setRequestHeader(key, headers[key]);
//             });

//             xhr.onload = function() {
//                 resolve(xhr);
//             };

//             xhr.onabort = reject;
//             xhr.onerror = reject;

//             xhr.timeout = timeout;
//             xhr.ontimeout = reject;

//             if (isGet || !data) {
//                 xhr.send();
//             } else {
//                 xhr.send(data);
//             }
//         });
//     };
// };






enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS
  data?: any
  headers?: Record<string, string>
  timeout?: number
}

type OptionsWithoutMethod = Omit<Options, 'method'>
const BaseURL = 'https://ya-praktikum.tech/api/v2';
export class HTTPTransport {
    private _baseUrl: string;

    constructor() {
        this._baseUrl = BaseURL;
    }

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.GET });
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.POST });
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.PUT });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.DELETE });
    }

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

            // Устанавливаем заголовки
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            // Устанавливаем Content-Type для JSON по умолчанию
            if (!headers['Content-Type'] && method !== METHODS.GET) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            // Устанавливаем заголовок для передачи куки
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
                xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
            }
        });
    }

    private _queryStringify(data: Record<string, any>): string {
        if (!data) return '';

        const keys = Object.keys(data);
        return keys.length ? `?${keys.map((key) => `${key}=${data[key]}`).join('&')}` : '';
    }
}

export default HTTPTransport;

