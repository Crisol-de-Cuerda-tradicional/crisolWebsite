import { ContentLayout, SEO } from '@components';
import { useLocale } from '@hooks';
import Link from 'next/link';

export default function Custom404() {
  const locale = useLocale();

  const translations = {
    title: locale === 'es' ? 'Página no encontrada' : 'Page Not Found',
    description:
      locale === 'es'
        ? 'Lo sentimos, la página que estás buscando no existe o ha sido movida.'
        : 'Sorry, the page you are looking for does not exist or has been moved.',
    back: locale === 'es' ? 'Volver a la página principal' : 'Back to Home Page',
  };

  return (
    <>
      <SEO title={translations.title} description={translations.description} />
      <ContentLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">404 - {translations.title}</h1>
          <p className="mb-8">{translations.description}</p>
          <Link href={`/${locale}`} className="text-primary-600 hover:underline">
            {translations.back}
          </Link>
        </div>
      </ContentLayout>
    </>
  );
}
