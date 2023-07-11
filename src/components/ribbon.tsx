import type { FC, MouseEvent, PropsWithChildren } from 'react';

export interface RibbonProps extends PropsWithChildren {
  title: string;
  onClick: (event: MouseEvent) => void;
}

export const Ribbon: FC<RibbonProps> = () => null;
