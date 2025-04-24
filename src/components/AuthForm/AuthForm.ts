// @ts-ignore
import template from './AuthForm.hbs?raw';
import Block from '../../utils/Block';

export interface AuthFormProps {
    id_form: string
    formData?: {
        login?: string
        password?: string
        email?: string
        first_name?: string
        second_name?: string
        phone?: string
        password_retry?: string
        title?: string
        userId?: number

    }
    class_name?: string
    onSubmit?: Function
};

export class createAuthForm extends Block {
    constructor(props: AuthFormProps) {
        super(`<form class="${props.class_name ? props.class_name : 'authorization-form'}" id="${props.id_form}"></form>`, {
            ...props,
            template: template,
            events: {
                submit: props.onSubmit
            }
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
