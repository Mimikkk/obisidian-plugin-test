import { PluginSettingTab } from 'obsidian';
import { Self } from '@self';

export namespace SettingTab {
  export const create = () =>
    new (class extends PluginSettingTab {
      public display() {}
    })(Self.api.app, Self.api);
}
