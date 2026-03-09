// Styles set in globals.css
export const RenderMarkdown = ({ content }: { content: string }) => (
  <div
    className="markdown-content"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);
