export const RenderMarkdown = ({ content }: { content: string }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);
