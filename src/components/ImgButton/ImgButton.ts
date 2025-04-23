// @ts-ignore
import template from './ImgButton.hbs?raw';
import Block from '../../utils/Block';

export interface ImgButtonProps {
    img_src: string
    img_alt: string
    class_name: string
    type_name?: string
    id_name: string
    onClick?: Function
};

export class createImgButton extends Block {
    constructor(props: ImgButtonProps) {
        super(`<button class="${props.class_name}" id="${props.id_name}" name="${props.id_name}" type="${ props.type_name ? props.type_name : 'button'}"><button/>`, {
            ...props,
            template: template,
            attrs: {},
            events: {
                click: props.onClick
            }
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
}
