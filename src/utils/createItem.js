function createItem(template, mergedOptions) {
    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate(mergedOptions);
    const element = document.createElement('div');
    element.innerHTML = html;
    const item = element.firstElementChild;
    return item;
};

export default createItem;
