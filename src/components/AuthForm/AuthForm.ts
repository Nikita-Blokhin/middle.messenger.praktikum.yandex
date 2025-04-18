// @ts-ignore
import template from './AuthForm.hbs?raw';
import Block from '../../utils/Block';

export interface AuthFormProps {
    id_form: string
    formData: {
        login: string
        password: string
        email?: string
        first_name?: string
        second_name?: string
        phone?: string
        password_retry?: string
    }
    onSubmit?: (formData: any) => void
};

export class createAuthForm extends Block {
    constructor(props: AuthFormProps) {
        super(`<form class="authorization-form" id="${props.id_form}"></form>`, {
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
