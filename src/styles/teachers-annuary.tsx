import css from 'styled-jsx/css';

const vars = {
  breakpoint: '800px',
  circleSize: '1.5rem',
  timelinePadding: '3rem',
};

export const timelineStyles = css`
  .timeline {
    &__container {
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 0 1rem;
      padding: 0 0 0 ${vars.timelinePadding};

      @media (min-width: ${vars.breakpoint}) {
        padding: 0;
      }

      &::before {
        background-color: var(--color-primary);
        content: '';
        position: absolute;
        left: 0;
        width: 4px;
        height: 100%;

        @media (min-width: ${vars.breakpoint}) {
          left: calc(50% - 2px);
        }
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      margin: 10px 0;
      gap: 1rem;

      & > * {
        margin: 0;
      }

      &:hover > h3 {
        font-weight: bold;
      }

      @media (min-width: ${vars.breakpoint}) {
        width: 50%;
        padding-right: 30px;
        justify-content: flex-end;

        &:nth-child(odd) {
          align-self: flex-end;
          justify-content: flex-start;
          padding-left: 30px;
          padding-right: 0;

          .circle {
            left: calc(-1 * ${vars.circleSize} / 2);
          }
        }

        &:nth-child(even) {
          text-align: right;

          .teachers__wrapper {
            justify-content: flex-end;
          }

          .circle {
            left: calc(100% - ${vars.circleSize} / 2);
          }
        }
      }

      .circle {
        background-color: var(--color-white);
        border: 3px solid var(--color-primary);
        border-radius: 50%;
        position: absolute;
        width: ${vars.circleSize};
        height: ${vars.circleSize};
        top: 0;
        left: calc(-1 * (${vars.timelinePadding} + ${vars.circleSize} / 2) + 2px);
        z-index: 10;
      }
    }
  }

  .teachers {
    &__wrapper {
      display: flex;
      flex-wrap: wrap;

      list-style-type: none;
    }

    &__card {
      position: relative;
      width: 90px;
      height: 90px;
    }

    &__wrapper {
      padding: 0;
    }
  }
`;
