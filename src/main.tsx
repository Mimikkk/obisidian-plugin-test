import { Self } from '@self';
import { create } from './adapters/plugin';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { StatusBarItem } from './components/status-bar-item';
import { Ribbon } from './components/ribbon';
import { Tailwind } from './tailwindcss';

const SettingsTab = () => {
  return <div>Im a settings tab</div>;
};

export default create({
  construct: async api => {
    Self.api = api;

    Self.Register.script(Tailwind.create());

    Self.slot({
      ribbon: (
        <Ribbon title="react" onClick={() => console.log('click')}>
          <AcademicCapIcon className="w-6 h-6" />
        </Ribbon>
      ),
      statusbar: <StatusBarItem>lol</StatusBarItem>,
      settings: <SettingsTab />,
    });
  },
});
