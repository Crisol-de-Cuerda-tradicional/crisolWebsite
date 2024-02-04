import { useGoTopCustom } from '@hooks';

export const ButtonGoTop = () => {
  const { showGoTop, goToTopAction } = useGoTopCustom(400);

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
          bottom: 2rem;
          align-self: flex-end;
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
