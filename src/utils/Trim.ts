function trim (str: string, sep: string = ' ') {
    const sep_list = sep.split('');
    const str_list = str.split('');
    for (let i = 0; i < str.length; i++) {
        if (sep_list.includes(str_list[i])) {
            str_list.splice(i, 1);
            i--;
        };
    };
    return str_list.join('');
};
