import { IButtonProps } from './types';

export const fontColorConverter = (variant: IButtonProps['variant']): IButtonProps['variant'] => {
  switch (variant) {
    case 'primary':
      return 'dark';
    case 'dark':
      return 'light';
    case 'neutral':
      return 'dark';
    case 'light':
      return 'dark';
    default:
      return 'dark';
  }
};
