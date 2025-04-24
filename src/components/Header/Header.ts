import Block from '../../utils/Block';

export interface DetailRowProps {
    value: string
    class_name: string
    id_name: string
};

export class createHeader extends Block {
    constructor(props: DetailRowProps) {
        super(`<h1 class="${props.class_name}" id="${props.id_name}">${props.value}<h1/>`, {
            ...props,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile('', this.props);
    };
};
