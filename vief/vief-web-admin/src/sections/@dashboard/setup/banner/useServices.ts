import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { API_BANNER } from 'src/common/constants/apis';
import { ListResponse } from 'src/common/constants/common.interfaces';
import { getMessError, toUrl } from 'src/common/constants/common.utils';
import axiosInstance from 'src/utils/axios';
import { Banner, CreateBannerPayload } from './interfaces';

function useServices() {
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [isCreatingBanner, setIsCreatingBanner] = useState(false);
  const [isDeletingBanner, setIsDeletingBanner] = useState(false);
  const [isGettingBanner, setIsGettingBanner] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function createBannerService(banner: CreateBannerPayload) {
    setIsCreatingBanner(true);
    try {
      const res = (await axiosInstance.post(API_BANNER, banner)).data;
      enqueueSnackbar('Thêm mới banner thành công!');
      setIsCreatingBanner(false);
      return res;
    } catch (error) {
      setIsCreatingBanner(false);
      console.log(error.message);
      enqueueSnackbar(getMessError(error.data), { variant: 'error' });
    }
  }

  async function editBannerService(banner: CreateBannerPayload, id: number) {
    setIsEditingBanner(true);
    try {
      const res = (await axiosInstance.patch(API_BANNER + '/' + id, banner)).data;
      enqueueSnackbar('Cập nhật banner thành công!');
      setIsEditingBanner(false);
      return res;
    } catch (error) {
      setIsEditingBanner(false);
      console.log(error.message);
      enqueueSnackbar(getMessError(error.data), { variant: 'error' });
    }
  }

  async function getListBanner() {
    setIsGettingBanner(true);
    try {
      const res = (
        await axiosInstance.get<ListResponse<Banner>>(
          toUrl(API_BANNER, { page: 1, size: 100, filed: 'WOOD' })
        )
      ).data;
      setIsGettingBanner(false);
      return res;
    } catch (error) {
      setIsGettingBanner(false);
      console.log(error.message);
      enqueueSnackbar(getMessError(error.message), { variant: 'error' });
    }
  }

  async function deleteBannersService(ids: number[]) {
    setIsDeletingBanner(true);
    try {
      const res = (await axiosInstance.delete<Banner>(API_BANNER, { data: { ids } })).data;
      enqueueSnackbar('Xóa banner thành công!');
      setIsDeletingBanner(false);
      return res;
    } catch (error) {
      setIsDeletingBanner(false);
      console.log(error.message);
      enqueueSnackbar(getMessError(error.data), { variant: 'error' });
    }
  }

  return {
    createBannerService,
    editBannerService,
    getListBanner,
    deleteBannersService,
    isCreatingBanner,
    isGettingBanner,
    isEditingBanner,
    isDeletingBanner,
  };
}

export { useServices };
