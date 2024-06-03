import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export interface IContent<M> {
  meta: M;
  content: string;
}

const contentDir = path.join(process.cwd(), 'src', 'content');

export const getContent = async <M>(
  lang: string,
  content: string,
  options?: { generateHeadingLinks?: boolean }
): Promise<IContent<M>> => {
  const generateHeadingLinks = options?.generateHeadingLinks ?? true;

  const filePathByLang = path.join(contentDir, lang, `${content}.md`);
  const fileContent = fs.readFileSync(filePathByLang, 'utf8');

  const matterResult = matter(fileContent);

  let prePageHTML = unified().use(remarkParse).use(remarkGfm).use(remarkRehype);

  if (generateHeadingLinks) {
    prePageHTML = prePageHTML.use(rehypeSlug).use(rehypeAutolinkHeadings, {
      properties: { ariaHidden: false, tabIndex: -1, class: 'anchor' },
      behavior: 'prepend',
    });
  }

  const pageHTML = await prePageHTML.use(rehypeStringify).process(matterResult.content);

  return {
    meta: matterResult.data as M,
    content: pageHTML.value.toString(),
  };
};
