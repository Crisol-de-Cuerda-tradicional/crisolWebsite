import { GetStaticProps } from "next";
import Image from "next/image";
import { JSX } from "react";

import { ContentLayout, Hero, RenderMarkdown, SEO } from "@components";
import { getContent, IContent } from "@utils/getContent";
import { getLocale, getStaticPaths } from "@utils/getStatic";
import { baseUrl } from "@utils/baseUrl";
import { parseTemplate } from "@utils/parseTemplate";

interface IAssociationProps {
  associationPage: IContent<{
    title: string;
    description: string;
    hero: string;
  }>;
}

const Association = ({ associationPage }: IAssociationProps): JSX.Element => {
  return (
    <>
      <SEO
        title={associationPage.meta.title}
        description={associationPage.meta.description}
        keywords={[
          "music classes",
          "fiddle classes",
          "traditional music learning",
          "music lessons",
          "teaching philosophy",
          "music education",
          "group lessons",
        ]}
      />
      <Hero
        background={associationPage.meta.hero}
        pageTitle={associationPage.meta.title}
      />
      <ContentLayout>
        <section className="association-content">
          <RenderMarkdown content={associationPage.content} />
        </section>
      </ContentLayout>
      <style jsx>{`
        .association-content :global(img) {
          width: 100%;
          margin: 1rem auto;
        }

        .association-content :global(blockquote) {
          margin: 1rem 0;
        }
      `}</style>
    </>
  );
};

export default Association;

const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = getLocale(ctx);
  const associationPage = await getContent(locale, "about/association");

  return {
    props: {
      associationPage,
    },
  };
};

export { getStaticPaths, getStaticProps };
