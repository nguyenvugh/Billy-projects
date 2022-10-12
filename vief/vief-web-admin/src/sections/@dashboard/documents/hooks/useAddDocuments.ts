import { useMutation } from 'react-query';
import { ICallback } from 'src/common/constants/common.interfaces';
import { DocumentPayload } from '../interface';
import { addDocuments } from '../services';

export function useAddDocuments(callback: ICallback) {
  return useMutation((payload: DocumentPayload) => addDocuments(payload), {
    onSuccess: (_rs, _variables) => {
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError(error);
    },
    retry: 2,
  });
}
