// @ts-ignore
import template from './InputAvatar.hbs?raw';
import Block from '../../utils/Block';

export interface AvatarProps {
    onChange?: (e: Event) => void
};

export class createInputAvatar extends Block {
    constructor(props: AvatarProps) {
        super('<input type="file" accept="image/*" name="avatar" id="input_avatar"/>', {
            ...props,
            attrs: {},
            events: {
                change: props.onChange
            }
        });
    };

    render() {
        return this.compile('', this.props);
    };
};
