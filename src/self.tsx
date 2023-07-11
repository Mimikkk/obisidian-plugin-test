import type { Plugin } from 'obsidian';
import { createRoot, Root } from 'react-dom/client';
import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';
import { SettingTab } from './adapters/settings-tab';
import type { RibbonProps } from './components/ribbon';

const roots = {
  statusbar: null as null | Root,
  settings: null as null | Root,
};
export const self = {
  settings: {
    state: {
      setting: '',
    },
    actions: {
      load: async () => {
        return Object.assign({}, {}, await self.api.loadData());
      },
      save: async (settings: {}) => {
        await self.api.saveData(settings);
      },
    },
    slot: (children: ReactNode) => {
      if (!roots.settings) {
        const tab = SettingTab.create();
        roots.settings = createRoot(tab.containerEl);
        self.api.addSettingTab(tab);
      }

      roots.settings.render(children);
    },
  },
  statusbar: {
    slot: (children: ReactNode) => {
      if (!roots.statusbar) roots.statusbar = createRoot(self.api.addStatusBarItem());

      roots.statusbar.render(children);
    },
  },
  ribbon: {
    slot: (children: ReactNode) => {
      const ribbon = Children.toArray(children)[0] as ReactElement<RibbonProps>;

      const element = self.api.addRibbonIcon('dice', ribbon.props.title, ribbon.props.onClick as () => void);

      createRoot(element).render(ribbon.props.children);
    },
  },
  register: {
    event: <EventType extends keyof WindowEventMap>(
      type: EventType,
      callback: (this: HTMLElement, event: WindowEventMap[EventType]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => self.api.registerDomEvent(document as unknown as Window, type, callback, options),
    interval: (interval: number) => self.api.registerInterval(interval),
  },
  api: null as unknown as Plugin,
};
