import Handlebars from 'handlebars';

function createItem(template: Handlebars.Template, mergedOptions: any): Element {
    const compiledTemplate: Handlebars.TemplateDelegate<any> = Handlebars.compile(template);
    const html: string = compiledTemplate(mergedOptions);
    const element: Element = document.createElement('div');
    element.innerHTML = html;
    const item: Element | null = element.firstElementChild;
    return item ? item : element;
};

export default createItem;
