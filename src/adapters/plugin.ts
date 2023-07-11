import { Plugin } from 'obsidian';

export const create = ({
  construct,
  destruct,
}: {
  construct?: (api: Plugin) => void | Promise<void>;
  destruct?: (api: Plugin) => void | Promise<void>;
}) =>
  class extends Plugin {
    onload = () => construct?.(this);
    onunload = () => destruct?.(this);
  };
