import Image from 'next/image';
import { ReactNode } from 'react';

interface IExpandingImgProps {
  bgSrc: string;
  maxWidth?: string;
  children?: ReactNode;
}

export const ExpandingImg = ({ bgSrc, maxWidth, children }: IExpandingImgProps): JSX.Element => {
  return (
    <div className="wrapper">
      {children}
      <div className="img--expand">
        <Image src={bgSrc} fill sizes="100%" alt="background" priority />
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          width: 100%;
          max-width: ${maxWidth ? maxWidth : '100%'};
          aspect-ratio: 1;
          overflow: hidden;
          display: flex;

          .img--expand {
            position: absolute;
            top: 0;
            left: 0;
            transition: transform 0.3s ease-in-out;
            width: 100%;
            aspect-ratio: 1;
            transform: scale(1.01);
          }

          &:hover .img--expand {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};
