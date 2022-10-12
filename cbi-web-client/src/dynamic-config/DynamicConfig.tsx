import Container from "@cbi/components/container";
import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function DynamicConfig({ content = "" }: { content: string }) {
  const [finalConten, setFinalConten] = useState("");
  useEffect(() => setFinalConten(content), [content]);
  return (
    <Container>
      <Text
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: finalConten }}
      />
    </Container>
  );
}

export { DynamicConfig };
