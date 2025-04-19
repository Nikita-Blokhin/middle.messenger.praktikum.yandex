// @ts-ignore
import template from './InputAvatar.hbs?raw';
import Block from '../../utils/Block';
import { BaseURL } from '../../utils/HttpTransport';

export interface AvatarProps {
    img_src: string
    img_alt: string
    class_name: string
};

export class createAvatar extends Block {
    constructor(props: AvatarProps) {
        super(`<img crossOrigin="anonymous" src="${BaseURL}/resources${props.img_src}}" alt="${props.img_alt}" class="${props.class_name}">`, {
            ...props,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile('', this.props);
    };
};
