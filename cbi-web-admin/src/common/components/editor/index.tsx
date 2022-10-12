import { Box } from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build-classic-vnv";
import React from "react";
import { editorConfiguration } from "./editor.constants";

type CustomCkEditorProps = {
  data?: string;
  disabled?: boolean;
  onReady?: (editor: any) => void;
  onChange?: (data: string) => void;
  onBlur?: (event, editor) => void;
  onFocus?: (event, editor) => void;
};
function CustomCkEditor({
  data,
  disabled,
  onReady,
  onChange,
  onBlur,
  onFocus,
}: CustomCkEditorProps) {
  return (
    <Box
      position="relative"
      sx={{
        ".ck-content": {
          minHeight: "300px",
        },
      }}
    >
      {data !== undefined && (
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={data}
          onReady={(editor) => onReady && onReady(editor)}
          onChange={(event, editor) => onChange && onChange(editor.getData())}
          onBlur={(event, editor) => onBlur && onBlur(event, editor)}
          onFocus={(event, editor) => onFocus && onFocus(event, editor)}
        />
      )}

      {disabled && (
        <Box position="absolute" width="100%" height="100%" top="0" zIndex="1" bg="#9D9D9D26"></Box>
      )}
    </Box>
  );
}

export { CustomCkEditor };
