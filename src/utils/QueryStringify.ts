type StringIndexed = Record<string, any>;

export default function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== 'object' || data === null) {
        throw new Error('input должен быть object');
    };

    const buildQuery = (obj: StringIndexed, prefix?: string): string[] => {
        const result: string[] = [];

        for (const [key, value] of Object.entries(obj)) {
            const currentKey = prefix ? `${prefix}[${key}]` : key;

            if (value === null) {
                result.push(`${currentKey}=null`);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    result.push(...buildQuery({ [index]: item }, currentKey));
                });
            } else if (typeof value === 'object') {
                result.push(...buildQuery(value, currentKey));
            } else {
                result.push(`${currentKey}=${encodeURIComponent(value)}`);
            };
        };

        return result;
    };

    return buildQuery(data).join('&');
};
