// @ts-ignore
import template from './SettingsForm.hbs?raw';
import Block from '../../utils/Block';

export interface SettingsFormProps {
    settings_type: string
};

export class createSettingsForm extends Block {
  constructor(props: SettingsFormProps) {
    super(`<div class="usersettings-container" id="${props.settings_type}Container"><div/>`, {
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
