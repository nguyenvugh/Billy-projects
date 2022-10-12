import { useMutation } from 'react-query';
import { ICallback } from 'src/common/constants/common.interfaces';
import { DocumentPayload } from '../interface';
import { editDocuments } from '../services';

export function useEditDocuments(callback: ICallback) {
  return useMutation(
    ({ id, ...payload }: DocumentPayload & { id: number }) => editDocuments(payload, id),
    {
      onSuccess: (_rs, _variables) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: (error, _variables) => {
        callback.onError && callback.onError(error);
      },
      retry: 2,
    }
  );
}
