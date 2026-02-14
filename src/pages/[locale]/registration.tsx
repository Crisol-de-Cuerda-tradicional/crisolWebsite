import { GetStaticProps, NextPage } from "next";

import { ContentLayout, Hero, RenderMarkdown, SEO } from "@components";
import config from "@config/config.yml";
import translations from "@config/translations.yml";
import { useLocale } from "@hooks";
import { baseUrl } from "@utils/baseUrl";
import { IContent, getContent } from "@utils/getContent";
import { getLocale, getStaticPaths } from "@utils/getStatic";
import { parseTemplate } from "@utils/parseTemplate";
import { shouldShowRegistration, tz } from "@utils/timezone";
import dayjs from "dayjs";

import { generateCourseSchema } from "../../static/seo/schemas";

interface IRegistrationProps {
  registrationPage: IContent<{
    title: string;
    description: string;
    hero: string;
  }>;
}

const Registration: NextPage<IRegistrationProps> = ({ registrationPage }) => {
  const locale = useLocale() as "en" | "es";

  return (
    <>
      <SEO
        title={registrationPage.meta.title}
        description={registrationPage.meta.description}
        schema={generateCourseSchema(
          locale,
          locale === "es"
            ? "Crisol de Cuerda - Taller de música tradicional para instrumentos de cuerda"
            : "Crisol de Cuerda - Traditional music workshop for string instruments",
          locale === "es"
            ? "Curso intensivo de música tradicional para violín, viola, violonchelo y guitarra con profesores de referencia internacional. Incluye alojamiento y pensión completa en la Granja Escuela Arlanzón."
            : "Intensive traditional music workshop for violin, viola, cello and guitar with internationally renowned teachers. Includes accommodation and full board at Granja Escuela Arlanzón."
        )}
        keywords={[
          "registration",
          "apply",
          "music camp registration",
          "course enrollment",
          "join Crisol",
          "booking",
          "application process",
          "payment",
        ]}
      />
      <Hero
        background={registrationPage.meta.hero}
        pageTitle={registrationPage.meta.title}
      />
      <ContentLayout>
        <RenderMarkdown content={registrationPage.content} />
      </ContentLayout>
    </>
  );
};

export default Registration;

const getStaticProps: GetStaticProps = async (ctx) => {
  if (config.hideRegistrationPage) {
    return {
      notFound: true,
    };
  }

  const locale = getLocale(ctx);
  dayjs.locale(locale);
  const registrationText = translations.registration[locale].toUpperCase();
  const underageAuthorisationText = translations.underage_authorisation[locale];
  const under14AuthorisationText = translations.under_14_authorisation[locale];
  const acceptanceOfGuardianshipText =
    translations.acceptance_of_guardianship[locale];

  const { coursePrice, refundLimit } = config.registration;
  const registrationRemainder = Math.round(coursePrice * refundLimit) / 100;

  const dateFormats: Record<string, string> = {
    es: "D [de] MMMM",
    en: "MMMM Do",
  };

  const templateData = {
    price: config.registration.coursePrice,
    registrationLink: shouldShowRegistration()
      ? `<a href="${config.registrationLink}">${registrationText}</a>`
      : registrationText,
    bookingFee: config.registration.bookingFee,
    endOfEarlyRegistrationDate: tz(
      config.registration.endOfEarlyRegistrationDate
    ).format(dateFormats[locale]),
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
    scholarshipLimitDate: tz(config.registration.scholarshipLimitDate).format(
      dateFormats[locale]
    ),
    referralDiscount: config.registration.referralDiscount,
  };

  const registrationPage = await getContent(locale, "registration");
  const hydratedPage = parseTemplate(registrationPage.content, templateData);

  registrationPage.content = hydratedPage;
  return {
    props: {
      registrationPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
