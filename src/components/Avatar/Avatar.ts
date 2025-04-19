// @ts-ignore
import template from './Avatar.hbs?raw';
import Block from '../../utils/Block';
import { BaseURL } from '../../utils/HttpTransport';

export interface AvatarProps {
    img_src: string
    img_alt: string
    class_name: string
    
};

export class createAvatar extends Block {
    constructor(props: AvatarProps) {
        super('<div></div>', {
            ...props,
            template: template,
            BaseURL: BaseURL,
            attrs: {},
            events: {}
        });
    };

    render() {
        return this.compile(template, this.props);
    };
};
