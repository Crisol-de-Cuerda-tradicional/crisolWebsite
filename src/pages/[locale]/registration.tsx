import { GetStaticProps, NextPage } from 'next';

import { ContentLayout, Hero, RenderMarkdown } from '@components';
import config from '@config/config.yml';
import translations from '@config/translations.yml';
import { baseUrl } from '@utils/baseUrl';
import { IContent, getContent } from '@utils/getContent';
import { getLocale, getStaticPaths } from '@utils/getStatic';
import { parseTemplate } from '@utils/parseTemplate';
import { tz } from '@utils/timezone';

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

const getStaticProps: GetStaticProps = async ctx => {
  if (config.hideRegistrationPage) {
    return {
      notFound: true,
    };
  }

  const locale = getLocale(ctx);
  const registrationText = translations.registration[locale].toUpperCase();
  const underageAuthorisationText = translations.underage_authorisation[locale];
  const under14AuthorisationText = translations.under_14_authorisation[locale];
  const acceptanceOfGuardianshipText = translations.acceptance_of_guardianship[locale];

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
    endOfEarlyRegistrationDate: tz(config.registration.endOfEarlyRegistrationDate).format(
      dateFormats[locale]
    ),
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
    familyDiscount: config.registration.familyDiscount,
    familyDiscountMinimum: config.registration.familyDiscountMinimum,
    scholarshipLimitDate: tz(config.registration.scholarshipLimitDate).format(dateFormats[locale]),
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

export { getStaticPaths, getStaticProps };
