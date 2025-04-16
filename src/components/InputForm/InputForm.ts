// @ts-ignore
import template from './InputForm.hbs?raw';
import Block from '../../utils/Block';

export interface InputFormProps {
    id_name: string
    label: string
    class_name__group: string
    class_name__label: string
    class_name__input: string
    placeholder_text?: string
    invalid_text?: string
    onSubmit?: (e: MouseEvent) => void
};

export class createInputForm extends Block {
    constructor(props: InputFormProps) {
        super(`<div class="${props.class_name__group}"><div>`, {
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
