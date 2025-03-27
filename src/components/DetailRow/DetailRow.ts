// @ts-ignore
import template from './DetailRow.hbs?raw';
import Block from '../../utils/Block';

export interface DetailRowProps {
    label: string
    value: string
    class_name__row: string
    class_name__label: string
    class_name__value: string
    id_name: string
};

export class createDetailRow extends Block {
    constructor(props: DetailRowProps) {
        super(`<div class="${props.class_name__row}" id="${props.id_name}"><div/>`, {
        ...props,
        template: template,
        attrs: {},
        events: {}
        });
    };

    render() {
        return this.compile(template as string, this.props)
    };
};
