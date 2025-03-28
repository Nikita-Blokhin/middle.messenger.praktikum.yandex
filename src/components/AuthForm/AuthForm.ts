// @ts-ignore
import template from './AuthForm.hbs?raw';
import Block from '../../utils/Block';

export interface AuthFormProps {
    class_name_wrapper: string
    label_h1: string
    id_form: string
    href_link: string
    text_link: string
};

export class createAuthForm extends Block {
    constructor(props: AuthFormProps) {
        super(`<div class="${props.class_name_wrapper}"><div/>`, {
            ...props,
            template: template,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
