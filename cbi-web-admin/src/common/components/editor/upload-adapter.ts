// import { baseURL, uploadImg } from "app/services/urlAPI";
import Axios from "axios";
import { presignUrl } from "src/common/lib/files.lib";
import { toS3Url } from "src/common/utils/common.util";
const MAX_FILE_SIZE_MB = 3;

class UploadAdapter {
  source;
  loader;
  constructor(loader: any) {
    this.loader = loader;
    this.source = Axios.CancelToken.source();
  }

  upload() {
    return this.loader.file.then(async (file: any) => {
      if (file?.size > 1024 * 1024 * MAX_FILE_SIZE_MB) {
        alert(`Kích thước ảnh tối đa là ${MAX_FILE_SIZE_MB}MB`);
        return null;
      }
      return presignUrl(file, Axios).then((res) => ({
        default: toS3Url(res.key),
      }));
    });
  }

  abort() {
    if (this.source) {
      this.source.cancel();
    }
  }
}

export default function CustomizeUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader);
  };
}
