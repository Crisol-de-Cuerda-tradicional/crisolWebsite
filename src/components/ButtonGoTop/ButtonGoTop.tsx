import { useGoTopCustom } from '@hooks';
import { RefObject, useEffect, useState } from 'react';

type ButtonGoTopProps = {
  parentRef: RefObject<HTMLDivElement>;
};

export const ButtonGoTop = ({ parentRef }: ButtonGoTopProps) => {
  const { showGoTop, goToTopAction } = useGoTopCustom(400, parentRef);
  const [xPosition, setXPosition] = useState(parentRef.current?.clientWidth ?? 0);

  useEffect(() => {
    if (!parentRef.current) return;
    setXPosition(parentRef.current.clientWidth);
  }, [parentRef]);

  useEffect(() => {
    const parent = parentRef.current;
    window.addEventListener('resize', () => setXPosition(parent?.clientWidth ?? 0));
    return window.removeEventListener('resize', () => setXPosition(0));
  });

  return (
    <>
      <button className={`goTop ${!showGoTop ? 'hidden' : ''}`} onClick={goToTopAction} />
      <style jsx>{`
        .hidden {
          opacity: 0;
          pointer-events: none;
        }

        .goTop {
          position: sticky;
          bottom: 1rem;
          align-self: flex-end;
          left: calc(${xPosition ?? 0}px - 45px - 1rem);
          margin: 1rem;
          z-index: 1;

          width: 45px;
          aspect-ratio: 1;
          background: var(--color-primary);
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;

          transition: opacity 0.3s ease-in-out;
        }
        .goTop::before {
          content: '';
          position: absolute;
          inset: 30%;
          transform: translateY(20%) rotate(-45deg);
          border-top: 5px solid #fff;
          border-right: 5px solid #fff;
        }
      `}</style>
    </>
  );
};
