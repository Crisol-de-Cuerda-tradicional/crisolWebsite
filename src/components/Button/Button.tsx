import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'dark' | 'light';
  size?: 'xxlg' | 'xlg' | 'lg' | 'md' | 'sm' | 'xsm';
  outline?: boolean;
  children: string;
}

const outlineHoverFontColor = (variant: IButtonProps['variant']): IButtonProps['variant'] => {
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
      return 'primary';
  }
};

const Button = ({
  children,
  variant = 'primary',
  outline = false,
  size = 'md',
  ...btnAttributes
}: IButtonProps): JSX.Element => {
  return (
    <>
      <button
        className={`btn--${variant} btn__size--${size} ${outline ? 'btn--outline' : ''}`}
        {...btnAttributes}
      >
        <div className="btn__text">{children}</div>
      </button>
      <style jsx>{`
        .btn--${variant} {
          background-color: var(--color-${variant});
          border-radius: var(--border-radius);
          color: var(--color-white);
          border: 2px solid var(--color-${variant});
          box-shadow: 0 0 8px var(--color-dark);
        }

        button {
          transition: all 0.4s cubic-bezier(0.41, -0.6, 0.41, 1.6);

          .btn__text {
            transition: transform 0.4s cubic-bezier(0.41, -0.6, 0.41, 1.6);
          }

          &:hover {
            transform: scale(1.08);

            .btn__text {
              transform: scale(1.15);
            }
          }
        }

        .btn__size--${size} {
          padding: calc(0.5 * var(--size-${size})) calc(0.5 * var(--size-${size}));
          font-size: var(--size-${size});
          min-width: calc(8 * var(--size-${size}));
        }

        .btn--outline {
          background-color: transparent;
          color: var(--color-${variant});

          &:hover {
            background-color: var(--color-${variant});
            color: var(--color-${outlineHoverFontColor(variant)});
          }
        }
      `}</style>
    </>
  );
};

export default Button;
