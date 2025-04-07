const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

function queryStringify(data: Record<string, string>): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
};

interface HttpOptions {
    headers?: Record<string, string>
    data?: any
    method: typeof METHODS[keyof typeof METHODS]
};

class HTTPTransport {
    get = (url: string, options: { headers?: Record<string, string>; timeout?: number } = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options: { headers?: Record<string, string>; data?: any; timeout?: number } = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url: string, options: { headers?: Record<string, string>; data?: any; timeout?: number } = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url: string, options: { headers?: Record<string, string>; timeout?: number } = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

 
    request = (url: string,
        options: HttpOptions,
        timeout: number = 5000): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
};
