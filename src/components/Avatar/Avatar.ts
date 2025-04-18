// @ts-ignore
import template from './InputAvatar.hbs?raw';
import Block from '../../utils/Block';

export interface AvatarProps {
    img_src: string
    img_alt: string
    class_name: string
};

export class createAvatar extends Block {
    constructor(props: AvatarProps) {
        super(`<img src="${props.img_src}" alt="${props.img_alt}" class="${props.class_name}">`, {
            ...props,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile('', this.props);
    };
};
