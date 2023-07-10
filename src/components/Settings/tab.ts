import { PluginSettingTab, Setting } from 'obsidian';
import { self } from '../../plugin';

export class SettingTab extends PluginSettingTab {
  constructor() {
    super(self.api.app, self.api);
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

    new Setting(containerEl)
      .setName('Setting #1')
      .setDesc("It's a secret")
      .addText(text =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(self.settings.state.setting)
          .onChange(async value => {
            console.log('Secret: ' + value);
            self.settings.state.setting = value;
            await self.settings.actions.save(self.settings.state);
          }),
      );
  }
}

export namespace SettingTab {
  export const create = (): PluginSettingTab => new SettingTab();
}
