import DOMPurify from "isomorphic-dompurify";
import { memo } from "react";

const ClearContent = ({ content }) => {
  const domPurify = DOMPurify.sanitize(content);
  return <div className="ck-content" dangerouslySetInnerHTML={{ __html: domPurify }} />;
};

export default memo(ClearContent);
