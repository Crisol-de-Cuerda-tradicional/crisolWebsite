import css from 'styled-jsx/css';

export default css`
  video {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    filter: brightness(20%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .hero__container {
    position: relative;
    width: 100%;
    height: 30rem;
    overflow: hidden;
  }

  .hero {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 1rem;

    @media (min-width: 600px) {
      padding: 3rem;
    }

    .hero__page-title {
      display: flex;
      flex-direction: column;
      width: 344px;

      .hero__title {
        width: 100%;
        color: var(--color-white);
        white-space: pre-wrap;
        margin: 0;
        font-size: 3rem;
        line-height: 3.25rem;
        text-transform: uppercase;
      }

      .hero__dates {
        display: flex;
        gap: 1rem;

        h3 {
          flex-basis: 60%;
          color: var(--color-primary);
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.6rem;
          text-transform: uppercase;
        }
        h1 {
          flex-basis: 40%;
          color: var(--color-white);
          margin: 0;
          font-size: 3rem;
          line-height: 3.25rem;
        }
      }
    }

    .hero__registration {
      color: var(--color-white);
      display: flex;
      flex-direction: column;
      gap: 1rem;

      padding: 1rem 0;

      h2 {
        margin: 0;
      }
    }
  }

  .centered {
    text-align: center;
  }

  .about__featured {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .about__content {
      width: 100%;
      align-self: center;
      justify-self: center;
      padding: 1rem;
      z-index: 1;

      color: var(--color-white);
      text-align: center;
    }
  }

  .teachers {
    margin: 3rem 0;

    &__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__link {
      width: 250px;
    }

    &__infocontainer {
      width: 100%;
      height: 100%;
      position: relative;

      &:hover {
        .teachers__info {
          bottom: 0;
        }
      }
    }

    &__info {
      position: absolute;
      bottom: -100%;
      width: 100%;

      padding: 1rem;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(4px);
      color: var(--color-dark);

      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 0.5rem;

      transition: bottom 0.5s ease-in-out;

      & > * {
        margin: 0;
      }
    }

    &__more {
      width: 100%;
      padding: 2rem;

      background-color: var(--color-neutral);
      color: var(--color-white);
      font-size: var(--size-xlg);
      text-transform: uppercase;
    }
  }

  .accommodation {
    max-width: 100vw;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    color: var(--color-white);

    h1 {
      width: 100%;
      text-transform: uppercase;
      word-wrap: break-word;
    }

    &__images {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;

      &__wrapper {
        border: 2px var(--color-white) solid;
        position: relative;
        width: 250px;
        height: 250px;
      }
    }
  }
`;
