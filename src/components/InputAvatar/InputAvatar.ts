// @ts-ignore
import template from './InputAvatar.hbs?raw';
import Block from '../../utils/Block';

export interface AvatarProps {
    onChange?: Function
};

export class createInputAvatar extends Block {
    constructor(props: AvatarProps) {
        super('<input type="file" class="input-file-btn" accept="image/*" name="avatar" id="input_avatar"/>', {
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
