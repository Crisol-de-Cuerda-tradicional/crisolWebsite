import Handlebars from "handlebars";

export const parseTemplate = (markdownText: string, data: Record<string, string | number>) => {
  const compiledTemplate = Handlebars.compile(markdownText);
  return compiledTemplate(data);
};