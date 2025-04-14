type Indexed<T = any> = {
  [key in string]: T;
};

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const result: Indexed = {};

    Object.keys(lhs).forEach(key => {
        result[key] = lhs[key];
    });

    Object.keys(rhs).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(result, key) && typeof result[key] === 'object' && typeof rhs[key] === 'object') {
            result[key] = merge(result[key], rhs[key]);
        } else {
            result[key] = rhs[key];
        }
    });

    return result;
}
