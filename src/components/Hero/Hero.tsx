import Image from 'next/image';

interface IHeroProps {
  background: string;
  pageTitle: string;
}

const Hero = ({ background, pageTitle }: IHeroProps): JSX.Element => {
  return (
    <div className="hero">
      <h1 className="hero__title">{pageTitle}</h1>
      <style jsx>{`
        .hero {
          max-width: 100vw;
          height: 15rem;

          display: flex;
          align-items: flex-end;

          background-image: url('/images/${background}');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;

          .hero__title {
            width: 100%;
            max-width: 1300px;
            margin: 2rem auto;
            color: var(--color-white);
            text-transform: uppercase;
            padding: 0 2rem;
            word-wrap: break-word;
          }
        }
        @media (max-width: 465px) {
          .hero .hero__title {
            font-size: var(--size-xxlg);
          }
        }
        @media (max-width: 382px) {
          .hero .hero__title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
