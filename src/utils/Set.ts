type Indexed<T = any> = {
  [key in string]: T;
};

export default  function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path должны быть строкой');
    };
    
    if (typeof object !== 'object' || object === null) {
        return object;
    };
    
    const pathParts = path.split('.');
    let currentObject: Indexed = object as Indexed;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        
        if (!Object.prototype.hasOwnProperty.call(currentObject, part)) {
            currentObject[part] = {};
        };
        
        currentObject = currentObject[part] as Indexed;
    }
    
    currentObject[pathParts[pathParts.length - 1]] = value;
    
    return object;
};
