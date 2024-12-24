import { JSX } from 'react';
import { fontColorConverter } from './helpers';
import { IButtonProps } from './types';

export const Button = ({
  children,
  variant = 'primary',
  outline = false,
  size = 'md',
  ...btnAttributes
}: IButtonProps): JSX.Element => {
  return (
    <>
      <button
        className={`btn btn__size--${size} ${outline ? 'btn--outline' : ''}`}
        {...btnAttributes}
      >
        <div className="btn__text">{children}</div>
      </button>
      <style jsx>{`
        .btn {
          background-color: var(--color-${variant});
          border-radius: var(--border-radius);
          border: 2px solid var(--color-${variant});
          box-shadow: 0 0 4px var(--color-dark);

          transition: all 0.4s cubic-bezier(0.41, -0.6, 0.41, 1.6);
          cursor: pointer;

          .btn__text {
            font-weight: bold;
            color: var(--color-${fontColorConverter(variant)});

            transition: transform 0.4s cubic-bezier(0.41, -0.6, 0.41, 1.6);
          }

          &:hover {
            transform: scale(1.08);

            .btn__text {
              transform: scale(1.1);
            }
          }
        }

        .btn__size--${size} {
          padding: calc(0.5 * var(--size-${size})) calc(0.5 * var(--size-${size}));
          font-size: var(--size-${size});
          min-width: calc(8 * var(--size-${size}));
          max-width: calc(8 * var(--size-${size}));
        }

        .btn--outline {
          background-color: transparent;

          .btn__text {
            color: var(--color-${variant});
          }

          &:hover {
            background-color: var(--color-${variant});

            .btn__text {
              color: var(--color-${fontColorConverter(variant)});
            }
          }
        }
      `}</style>
    </>
  );
};
