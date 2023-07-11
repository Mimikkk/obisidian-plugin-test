import { PluginSettingTab } from 'obsidian';
import { self } from '@self';

export namespace SettingTab {
  export const create = () =>
    new (class extends PluginSettingTab {
      public display() {}
    })(self.api.app, self.api);
}
