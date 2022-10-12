import CustomizeUploadAdapterPlugin from "./upload-adapter";

// const colors = [
//   {
//     color: "hsl(0, 0%, 0%)",
//     label: "Black",
//   },
//   {
//     color: "hsl(0, 0%, 30%)",
//     label: "Dim grey",
//   },
//   {
//     color: "hsl(0, 0%, 60%)",
//     label: "Grey",
//   },
//   {
//     color: "hsl(0, 0%, 90%)",
//     label: "Light grey",
//   },
//   {
//     color: "hsl(0, 0%, 100%)",
//     label: "White",
//     hasBorder: true,
//   },
//   {
//     color: "hsl(0, 75%, 60%)",
//     label: "Red",
//   },
//   {
//     color: "hsl(30, 75%, 60%)",
//     label: "Orange",
//   },
//   {
//     color: "hsl(60, 75%, 60%)",
//     label: "Yellow",
//   },
//   {
//     color: "hsl(90, 75%, 60%)",
//     label: "Light green",
//   },
//   {
//     color: "hsl(120, 75%, 60%)",
//     label: "Green",
//   },
//   {
//     color: "hsl(150, 75%, 60%)",
//     label: "Aquamarine",
//   },
//   {
//     color: "hsl(180, 75%, 60%)",
//     label: "Turquoise",
//   },
//   {
//     color: "hsl(210, 75%, 60%)",
//     label: "Light blue",
//   },
//   {
//     color: "hsl(240, 75%, 60%)",
//     label: "Blue",
//   },
//   {
//     color: "hsl(270, 75%, 60%)",
//     label: "Purple",
//   },
//   {
//     color: "#56AB2F",
//     label: "App",
//   },
// ];

export const editorConfiguration = {
  extraPlugins: [CustomizeUploadAdapterPlugin],
  //   fontFamily: {
  //     options: [
  //       "default",
  //       "Montserrat",
  //       "Ubuntu, Arial, sans-serif",
  //       "Ubuntu Mono, Courier New, Courier, monospace",
  //     ],
  //   },
  //   mediaEmbed: {
  //     previewsInData: true,
  //   },
  //   plugin: [HtmlEmbed],
  //   toolbar: [
  //     "heading",
  //     "|",
  //     "bold",
  //     "italic",
  //     "underline",
  //     "blockQuote",
  //     "|",
  //     "bulletedList",
  //     "numberedList",
  //     "|",
  //     "link",
  //     "|",
  //     "undo",
  //     "redo",
  //     "|",
  //     "fontSize",
  //     "fontFamily",
  //     "|",
  //     "insertTable",
  //     "|",
  //     "mediaEmbed",
  //     "|",
  //     "imageUpload",
  //     "|",
  //     "alignment",
  //     "fontColor",
  //     "fontBackgroundColor",
  //     "|",
  //     "htmlEmbed",
  //   ],
  //   htmlEmbed: {
  //     showPreviews: true,
  //     sanitizeHtml: (inputHtml) => {
  //       // Strip unsafe elements and attributes, e.g.:
  //       // the `<script>` elements and `on*` attributes.
  //       const outputHtml = sanitizeHtml(inputHtml);

  //       return {
  //         html: outputHtml,
  //         // true or false depending on whether the sanitizer stripped anything.
  //         hasChanged: true,
  //       };
  //     },
  //   },
  //   image: {
  //     toolbar: [
  //       "imageStyle:full",
  //       "imageStyle:side",
  //       "|",
  //       "imageResize",
  //       "|",
  //       "imageTextAlternative",
  //     ],
  //     upload: {
  //       types: ["jpeg", "png"],
  //     },
  //     resizeUnit: "%",
  //     resizeOptions: [
  //       {
  //         name: "imageResize:original",
  //         value: null,
  //         icon: "original",
  //       },
  //       {
  //         name: "imageResize:25",
  //         value: "25",
  //         icon: "small",
  //       },
  //       {
  //         name: "imageResize:50",
  //         value: "50",
  //         icon: "medium",
  //       },
  //       {
  //         name: "imageResize:75",
  //         value: "75",
  //         icon: "large",
  //       },
  //       {
  //         name: "imageResize:100",
  //         value: "100",
  //         icon: "large",
  //       },
  //     ],
  //   },
  //   alignment: {
  //     options: ["left", "right", "center", "justify"],
  //   },
  //   fontColor: {
  //     colors,
  //   },
  //   fontBackgroundColor: {
  //     colors,
  //   },
  //   fontSize: {
  //     options: [
  //       {
  //         title: "Tiny",
  //         model: "10px",
  //       },
  //       {
  //         title: "Small",
  //         model: "12px",
  //       },
  //       "default",
  //       {
  //         title: "Big",
  //         model: "16px",
  //       },
  //       {
  //         title: "Lớn hơn",
  //         model: "20px",
  //       },
  //       {
  //         title: "Huge",
  //         model: "24px",
  //       },
  //     ],
  //   },
  //   table: {
  //     contentToolbar: [
  //       "tableColumn",
  //       "tableRow",
  //       "mergeTableCells",
  //       "tableProperties",
  //       "tableCellProperties",
  //     ],
  //     tableProperties: {},
  //     tableCellProperties: {},
  //   },
};
