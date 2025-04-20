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
    onSubmit: (data: SubmitEvent) => void
};

export class createSettingsForm extends Block {
    constructor(props: SettingsFormProps) {
        super(`<form class="usersettings-content" id="${props.settings_type}">`, {
            ...props,
            events: {
                submit: props.onSubmit
            }
        });
    };

    render() {
        return this.compile('', this.props);
    };
};
