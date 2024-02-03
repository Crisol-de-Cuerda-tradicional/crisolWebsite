import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'dark' | 'light';
  size?: 'xxlg' | 'xlg' | 'lg' | 'md' | 'sm' | 'xsm';
  outline?: boolean;
  children: string;
}
