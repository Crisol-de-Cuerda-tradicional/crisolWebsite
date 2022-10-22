import { ReactNode } from 'react';

interface IContentLayoutProps {
  id?: string;
  children: ReactNode;
}

const ContentLayout = ({ id, children }: IContentLayoutProps) => {
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

          display: flex;
          flex-direction: column;
        }
      `}</style>
    </section>
  );
};

export default ContentLayout;
