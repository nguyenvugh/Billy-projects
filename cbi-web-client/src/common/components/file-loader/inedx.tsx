import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

type FileLoaderProps = {
  path: string;
  type?: string;
};
export function FileLoader({ path, type }: FileLoaderProps) {
  const [data, setData] = useState("");
  useEffect(() => {
    if (path.startsWith("https://") || path.startsWith("http://")) {
      fetch(path)
        .then((res) => res.blob())
        .then(async (blob) => {
          setData(URL.createObjectURL(new Blob([blob], { type: type || "application/pdf" })));
        });
    } else {
      setData(path);
    }
  }, [path]);
  return (
    <Box bg="white" w="full" h="full">
      <iframe
        title="preview document pdf"
        src={data}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}
