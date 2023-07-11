import type { Plugin } from 'obsidian';
import { createRoot, Root } from 'react-dom/client';
import type { ReactElement, ReactNode } from 'react';
import { Children } from 'react';
import { SettingTab } from './adapters/settings-tab';
import type { RibbonProps } from './components/ribbon';

export namespace Self {
  export let api = null as unknown as Plugin;
  const roots = {
    statusbar: null as null | Root,
    settings: null as null | Root,
  };

  export namespace Register {
    export const script = (script: HTMLScriptElement) => document.head.append(script);

    export const event = <EventType extends keyof WindowEventMap>(
      type: EventType,
      callback: (this: HTMLElement, event: WindowEventMap[EventType]) => void,
      options?: boolean | AddEventListenerOptions,
    ) => api.registerDomEvent(document as unknown as Window, type, callback, options);

    export const interval = (interval: number) => api.registerInterval(interval);
  }

  export namespace Ribbon {
    export const slot = (children: ReactNode) => {
      const ribbon = Children.toArray(children)[0] as ReactElement<RibbonProps>;

      const element = api.addRibbonIcon('dice', ribbon.props.title, ribbon.props.onClick as () => void);

      createRoot(element).render(ribbon.props.children);
    };
  }

  export namespace Statusbar {
    export const slot = (children: ReactNode) => {
      if (!roots.statusbar) roots.statusbar = createRoot(api.addStatusBarItem());

      roots.statusbar.render(children);
    };
  }

  export namespace Settings {
    export const slot = (children: ReactNode) => {
      if (!roots.settings) {
        const tab = SettingTab.create();
        roots.settings = createRoot(tab.containerEl);
        api.addSettingTab(tab);
      }

      roots.settings.render(children);
    };
  }

  export const slot = ({
    ribbon,
    statusbar,
    settings,
  }: {
    ribbon?: ReactNode;
    statusbar?: ReactNode;
    settings?: ReactNode;
  }) => {
    if (ribbon) Ribbon.slot(ribbon);
    if (statusbar) Statusbar.slot(statusbar);
    if (settings) Settings.slot(settings);
  };
}
