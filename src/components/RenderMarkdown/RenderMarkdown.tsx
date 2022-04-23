const RenderMarkdown = ({ content }: { content: string }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export default RenderMarkdown;
