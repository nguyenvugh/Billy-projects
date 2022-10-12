import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor, {
  SimpleUploadAdapter,
} from "ckeditor5-custom-build/build/ckeditor";
import CustomizeUploadAdapterPlugin from "./customize-upload-adapter";

const TextEditors = ({
  defaultValue = "",
  onChange,
  onFocus,
  config,
  disabled = false,
  setEditor,
}) => {
  const onReady = (editor) => {
    setEditor instanceof Function && setEditor(editor);
  };

  const change = (event, editor) => {
    const data = editor.getData();
    onChange instanceof Function && onChange(data);
  };
  const focus = (event, editor) => {
    const data = editor.getData();
    onFocus instanceof Function && onFocus(data);
  };

  return (
    <CKEditor
      editor={Editor}
      config={config ? config : editorConfiguration}
      data={defaultValue}
      onReady={onReady}
      onChange={change}
      onFocus={focus}
      disabled={disabled}
    />
  );
};

export default TextEditors;

const colors = [
  {
    color: "hsl(0, 0%, 0%)",
    label: "Black",
  },
  {
    color: "hsl(0, 0%, 30%)",
    label: "Dim grey",
  },
  {
    color: "hsl(0, 0%, 60%)",
    label: "Grey",
  },
  {
    color: "hsl(0, 0%, 90%)",
    label: "Light grey",
  },
  {
    color: "hsl(0, 0%, 100%)",
    label: "White",
    hasBorder: true,
  },
  {
    color: "hsl(0, 75%, 60%)",
    label: "Red",
  },
  {
    color: "hsl(30, 75%, 60%)",
    label: "Orange",
  },
  {
    color: "hsl(60, 75%, 60%)",
    label: "Yellow",
  },
  {
    color: "hsl(90, 75%, 60%)",
    label: "Light green",
  },
  {
    color: "hsl(120, 75%, 60%)",
    label: "Green",
  },
  {
    color: "hsl(150, 75%, 60%)",
    label: "Aquamarine",
  },
  {
    color: "hsl(180, 75%, 60%)",
    label: "Turquoise",
  },
  {
    color: "hsl(210, 75%, 60%)",
    label: "Light blue",
  },
  {
    color: "hsl(240, 75%, 60%)",
    label: "Blue",
  },
  {
    color: "hsl(270, 75%, 60%)",
    label: "Purple",
  },
  {
    color: "#56AB2F",
    label: "App",
  },
];

const editorConfiguration = {
  extraPlugins: [CustomizeUploadAdapterPlugin],
  extraAllowedContent: "img[title]",
  fontFamily: {
    options: [
      "default",
      "Montserrat",
      "Ubuntu, Arial, sans-serif",
      "Ubuntu Mono, Courier New, Courier, monospace",
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
  plugin: [SimpleUploadAdapter],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "blockQuote",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "link",
    "|",
    "undo",
    "redo",
    "|",
    "fontSize",
    "fontFamily",
    "|",
    "insertTable",
    "|",
    "mediaEmbed",
    "|",
    "imageUpload",
    "|",
    "alignment",
    "fontColor",
    "fontBackgroundColor",
  ],
  image: {
    toolbar: [
      "imageStyle:full",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
    upload: {
      types: ["jpeg", "png"],
    },
    resizeUnit: "%",
    resizeOptions: [
      {
        name: "imageResize:original",
        value: null,
        icon: "original",
      },
      {
        name: "imageResize:25",
        value: "25",
        icon: "small",
      },
      {
        name: "imageResize:50",
        value: "50",
        icon: "medium",
      },
      {
        name: "imageResize:75",
        value: "75",
        icon: "large",
      },
      {
        name: "imageResize:100",
        value: "100",
        icon: "large",
      },
    ],
  },
  alignment: {
    options: ["left", "right", "center", "justify"],
  },
  fontColor: {
    colors,
  },
  fontBackgroundColor: {
    colors,
  },
  fontSize: {
    options: [
      {
        title: "Tiny",
        model: "10px",
      },
      {
        title: "Small",
        model: "12px",
      },
      "default",
      {
        title: "Big",
        model: "16px",
      },
      {
        title: "Lớn hơn",
        model: "20px",
      },
      {
        title: "Huge",
        model: "24px",
      },
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
    tableProperties: {},
    tableCellProperties: {},
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5",
      },
    ],
  },
};
