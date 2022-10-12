import { useState } from "react";
import { Thumbnail } from "../interfaces/files.interface";
// import jwtDecode, { JwtPayload } from "jwt-decode";
import { presignUrl } from "../lib/files.lib";

export function usePresignImg() {
  const [isUploading, setIsUploading] = useState(false);
  async function handleUpload(file?: File): Promise<Partial<Thumbnail>> {
    setIsUploading(true);
    let thumbnailRes;
    if (file) {
      const thumbRes = await presignUrl(file);
      thumbnailRes = thumbRes;
    }
    setIsUploading(false);
    return thumbnailRes;
  }
  return { handleUpload, isUploading };
}
