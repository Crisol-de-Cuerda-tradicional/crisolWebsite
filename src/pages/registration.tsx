import { GetStaticProps, NextPage } from 'next';

import config from '@config/config.yml';
import translations from '@config/translations.yml';
import { ContentLayout, Hero, RenderMarkdown } from '@components';
import { IContent, getContent } from '@utils/getContent';
import { parseTemplate } from '@utils/parseTemplate';
import dayjs from 'dayjs';
import { baseUrl } from '@utils/baseUrl';

interface IRegistrationProps {
  registrationPage: IContent<{ title: string; hero: string }>;
}

const Registration: NextPage<IRegistrationProps> = ({ registrationPage }) => {
  return (
    <>
      <Hero background={registrationPage.meta.hero} pageTitle={registrationPage.meta.title} />
      <ContentLayout>
        <RenderMarkdown content={registrationPage.content} />
      </ContentLayout>
    </>
  );
};

export default Registration;

export const getStaticProps: GetStaticProps = async ({ locale = 'es' }) => {
  const registrationText = translations.registration[locale as Language].toUpperCase();
  const underageAuthorisationText = translations.underage_authorisation[locale as Language];
  const under14AuthorisationText = translations.under_14_authorisation[locale as Language];
  const acceptanceOfGuardianshipText = translations.acceptance_of_guardianship[locale as Language];

  const { coursePrice, refundLimit } = config.registration;
  const registrationRemainder = Math.round(coursePrice * refundLimit) / 100;

  const dateFormats: Record<string, string> = {
    es: 'D [de] MMMM',
    en: 'MMMM Do',
  };

  const templateData = {
    price: config.registration.coursePrice,
    registrationLink: config.displayRegistrationCTA
      ? `<a href="${config.registrationLink}">${registrationText}</a>`
      : registrationText,
    bookingFee: config.registration.bookingFee,
    endOfEarlyRegistrationDate: dayjs(config.registration.endOfEarlyRegistrationDate)
      .locale(locale ?? 'es')
      .format(dateFormats[locale]),
    refundLimit: config.registration.refundLimit,
    registrationRemainder,
    underageAuthorisation: `<a href="${baseUrl(
      config.registration.underageAuthorisationFile
    )}" download target="_blank">${underageAuthorisationText}</a>`,
    under14Authorisation: `<a href="${baseUrl(
      config.registration.under14AuthorisationFile
    )}" download target="_blank">${under14AuthorisationText}</a>`,
    acceptanceOfGuardianship: `<a href="${baseUrl(
      config.registration.acceptanceOfGuardianshipFile
    )}" download target="_blank">${acceptanceOfGuardianshipText}</a>`,
    scholarshipDiscount: config.registration.scholarshipDiscount,
    scholarshipLimitDate: dayjs(config.registration.scholarshipLimitDate)
      .locale(locale ?? 'es')
      .format(dateFormats[locale]),
  };

  const registrationPage = await getContent(locale, 'registration');
  const hydratedPage = parseTemplate(registrationPage.content, templateData);

  registrationPage.content = hydratedPage;
  return {
    props: {
      registrationPage,
    },
  };
};
