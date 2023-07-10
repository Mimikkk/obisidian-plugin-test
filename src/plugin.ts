import { Notice, Plugin } from 'obsidian';
import { settings as initialSettings, Settings, SettingTab } from './components/Settings';

export const self = {
  settings: {
    state: {
      setting: '',
    },
    actions: {
      load: async () => {
        return Object.assign({}, initialSettings, await self.api.loadData());
      },
      save: async (settings: Settings) => {
        await self.api.saveData(settings);
      },
    },
  },
  api: null as unknown as Plugin,
};

export class RuntimePlugin extends Plugin {
  async onload() {
    self.api = this;
    await self.settings.actions.load();

    // This creates an icon in the left ribbon.
    self.api.addRibbonIcon('dice', 'Sample Plugin', () => new Notice('This is a notice!'));

    const statusBarItem = self.api.addStatusBarItem();
    statusBarItem.setText('JS:{Running X elements}');

    self.api.addSettingTab(SettingTab.create());
    self.api.registerDomEvent(document, 'click', () => {
      console.log('click');
    });
  }
}
