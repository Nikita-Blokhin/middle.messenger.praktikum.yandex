// @ts-ignore
import template from './SelectForm.hbs?raw';
import Block from '../../utils/Block';

export interface SelectFormProps {
    class_name?: string
    id_form: string
    formData?: {
        userId: number
    }
    onSubmit?: Function
};

export class createSelectForm extends Block {
    constructor(props: SelectFormProps) {
        (super(`<form class="${
            props.class_name ? props.class_name : 'authorization-form'
        }" id="${props.id_form}"></form>`, {
            ...props,
            template: template,
            events: {
                submit: props.onSubmit
            }
        }));
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
