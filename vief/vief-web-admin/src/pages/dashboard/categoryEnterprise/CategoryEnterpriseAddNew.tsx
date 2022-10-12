// @mui
import { Container, MenuItem, Stack, Select, SelectChangeEvent } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import CreateCategoryEnterprise from 'src/sections/@dashboard/category-enterprise/categoryEnterprise-create/CreateCategoryEnterprise';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useState } from 'react';
import { Box } from '@mui/system';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { langSelector, setLang } from 'src/sections/@dashboard/category-enterprise/category.slice';
import { LANG } from 'src/sections/@dashboard/category/constants';
import { BREADCUMBS, langs } from 'src/common/constants/common.constants';

// ----------------------------------------------------------------------

export default function CategoryAddNewEnterprise() {
  const { themeStretch } = useSettings();
  const lang = useSelector(langSelector);

  const handleOnchange = (e: SelectChangeEvent<string>) => {
    dispatch(setLang(e.target.value));
  };

  return (
    <Page title="Category: New Category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack direction={'row'} justifyContent="space-between" justifyItems={'center'}>
          <HeaderBreadcrumbs
            heading="Thêm danh mục :"
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              {
                name: BREADCUMBS.CATEGORY_ENTERPRISE_LIST,
                href: PATH_DASHBOARD.enterprise.categories,
              },
              { name: BREADCUMBS.CATEGORY_ENTERPRISE_NEW },
            ]}
          />
          <Box>
            <Select value={lang || ''} onChange={handleOnchange}>
              <MenuItem value={LANG.VI} sx={{ fontSize: '12px' }}>
                <img src={langs.vi.icon} />
              </MenuItem>
              <MenuItem value={LANG.EN} sx={{ fontSize: '12px' }}>
                <img src={langs.en.icon} />
              </MenuItem>
            </Select>
          </Box>
        </Stack>

        <CreateCategoryEnterprise />
      </Container>
    </Page>
  );
}
