import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import uuidv4 from 'src/utils/uuidv4';
import { BannerItem } from './BannerItem';
import { DEFAULT_BANNER } from './constants';
import { Banner } from './interfaces';
import { useServices } from './useServices';

function BannerListDashboard() {
  const { getListBanner } = useServices();
  const [listBanner, setListBanner] = useState<Banner[]>([]);

  useEffect(() => {
    handleGetListBanner();
  }, []);

  async function handleGetListBanner() {
    const banners = await getListBanner();
    const defaultList =
      banners?.data && banners?.data.length > 0 ? banners?.data : [DEFAULT_BANNER()];
    setListBanner(defaultList);
  }

  function handleAddNewBanner() {
    setListBanner([DEFAULT_BANNER(), ...listBanner]);
  }

  function handleRemoveTemporaryBanner(id: string | number) {
    setListBanner(listBanner.filter((banner) => banner.temporaryId !== id));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Banner"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Banner' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={handleAddNewBanner}
          >
            Thêm mới
          </Button>
        }
      />
      {listBanner.map((banner, index) => (
        <Stack key={banner.id || banner.temporaryId} spacing={'12px'} direction="column">
          <BannerItem
            onRemoveTemporaryBanner={handleRemoveTemporaryBanner}
            onActionsSuccess={handleGetListBanner}
            editorId={`Banner${uuidv4()}`}
            defaultValue={banner}
            title={`Banner ${index}`}
            isEditing={!!banner.id}
          />
        </Stack>
      ))}
    </>
  );
}

export { BannerListDashboard };
