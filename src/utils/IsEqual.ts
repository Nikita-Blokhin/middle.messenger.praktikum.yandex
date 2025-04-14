export default function isEqual(a: any, b: any): boolean {
    if (a === b) return true;

    const aType = Object.prototype.toString.call(a);
    const bType = Object.prototype.toString.call(b);
    if (aType !== bType) return false;

    if (aType !== '[object Object]' && aType !== '[object Array]') {
        return a === b;
    };

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if (!isEqual(a[key], b[key])) return false;
    };

    return true;
};
