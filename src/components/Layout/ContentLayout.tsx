import { ReactNode } from 'react';

interface IContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: IContentLayoutProps) => {
  return (
    <div className="content">
      {children}
      <style jsx>{`
        .content {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default ContentLayout;
