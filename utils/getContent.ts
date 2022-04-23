import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type SupportedLanguages = 'es' | 'en';
interface IContent<M> {
  meta: M;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content');

export const getContent = async <M>(
  lang: SupportedLanguages,
  content: string
): Promise<IContent<M>> => {
  const filePathByLang = path.join(contentDir, lang, `${content}.md`);
  const fileContent = fs.readFileSync(filePathByLang, 'utf8');

  const matterResult = matter(fileContent);

  const pageHTML = await remark().use(html).process(matterResult.content);
  return {
    meta: matterResult.data as M,
    content: pageHTML.value.toString(),
  };
};
