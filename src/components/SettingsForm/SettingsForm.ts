// @ts-ignore
import template from './SettingsForm.hbs?raw';
import Block from '../../utils/Block';

export interface SettingsFormProps {
    settings_type: string
    formData: {
        login?: string
        email?: string
        first_name?: string
        second_name?: string
        phone?: string
        display_name?: string
        oldPassword?: string,
        newPassword?: string,
        newPassword_retry?: string,
    }
    onSubmit: (data: any) => void
};

export class createSettingsForm extends Block {
    constructor(props: SettingsFormProps) {
        super(`<form class="usersettings-content" id="${props.settings_type}Form">`, {
            ...props,
            template: template
        });
    };

    render() {
        return this.compile(template as string, this.props);
    };
};
