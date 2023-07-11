import { self } from '@self';
import { create } from './adapters/plugin';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { StatusBarItem } from './components/status-bar-item';
import { Ribbon } from './components/ribbon';

const SettingsTab = () => {
  return <div>Im a settings tab</div>;
};

export default create({
  construct: async api => {
    self.api = api;
    await self.settings.actions.load();

    self.ribbon.slot(
      <Ribbon
        title="react"
        onClick={() => {
          console.log('click');
        }}
      >
        <AcademicCapIcon
          style={{
            width: '24px',
            height: '24px',
          }}
        />
      </Ribbon>,
    );
    self.statusbar.slot(<StatusBarItem>lol</StatusBarItem>);
    self.settings.slot(<SettingsTab />);
  },
});
