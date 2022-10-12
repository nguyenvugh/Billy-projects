import { useState } from 'react';
import { PresignedResponse } from 'src/common/constants/common.interfaces';
import { presignedUrl } from 'src/common/constants/services';

export function usePresigned() {
  const [isUploading, setIsUploading] = useState(false);
  async function handleUpload(file?: File): Promise<Partial<PresignedResponse> | undefined> {
    setIsUploading(true);
    let thumbnailRes;
    if (file) {
      const thumbRes = await presignedUrl(file);
      thumbnailRes = thumbRes;
    }
    setIsUploading(false);
    return thumbnailRes;
  }
  return { handleUpload, isUploading };
}
