// @ts-ignore
import template from './DateDivider.hbs?raw';
import Block from '../../utils/Block';

export interface DateDividerProps {
    date_text: string
    id_name: string
};

export class createDateDivider extends Block {
    constructor(props: DateDividerProps) {
        super(`<div class="date-divider" id="${props.id_name}" ><div/>`, {
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
