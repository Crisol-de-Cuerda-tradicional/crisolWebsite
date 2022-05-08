import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export interface IContent<M> {
  meta: M;
  content: string;
}

const contentDir = path.join(process.cwd(), 'src', 'content');

export const getContent = async <M>(lang: string, content: string): Promise<IContent<M>> => {
  const filePathByLang = path.join(contentDir, lang, `${content}.md`);
  const fileContent = fs.readFileSync(filePathByLang, 'utf8');

  const matterResult = matter(fileContent);

  const pageHTML = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(matterResult.content);
  return {
    meta: matterResult.data as M,
    content: pageHTML.value.toString(),
  };
};
