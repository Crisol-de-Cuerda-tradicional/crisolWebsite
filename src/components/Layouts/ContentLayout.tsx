import { ReactNode } from 'react';

interface IContentLayoutProps {
  id?: string;
  children: ReactNode;
}

export const ContentLayout = ({ id, children }: IContentLayoutProps) => {
  return (
    <section id={id} className="content">
      {children}
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          padding: 2rem;
          min-height: calc(100vh - 90px - 325px);

          display: flex;
          flex-direction: column;
        }

        @media (max-width: 600px) {
          .content {
            padding: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};
