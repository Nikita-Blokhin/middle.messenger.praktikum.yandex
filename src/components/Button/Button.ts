// @ts-ignore
import template from './Button.hbs?raw';
import Block from '../../utils/Block';

export interface ButtonProps {
    label: string
    class_name: string
    type_name?: string
    id_name: string
    onClick?: Function
    onSubmit?: Function
};

export class createButton extends Block {
    constructor(props: ButtonProps) {
        super(`<button class="${props.class_name}" id="${props.id_name}" type="${ props.type_name ? props.type_name : 'submit'}"><button/>`, {
            ...props,
            template: template,
            attrs: {},
            events: {
                click: props.onClick,
                submit: props.onSubmit
            }
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
