export default function cloneDeep<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    };

    if (Array.isArray(obj)) {
        const copy: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = cloneDeep(obj[i]);
        };
        return copy as unknown as T;
    };

    const copy = {} as { [key: string]: any };
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = cloneDeep((obj as { [key: string]: any })[key]);
        };
    };
    return copy as T;
};
