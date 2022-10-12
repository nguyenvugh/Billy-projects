import { useMutation } from 'react-query';
import { IDocumentCallback } from '../interface';
import { deleteDocuments } from '../services';

export function useDeleteDocuments(callback: IDocumentCallback) {
  return useMutation((ids: number[]) => deleteDocuments(ids), {
    onSuccess: (_rs, _variables) => {
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError(error);
    },
    retry: 2,
  });
}
