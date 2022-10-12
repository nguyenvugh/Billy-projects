// @mui
import { Container, MenuItem, Stack, Select, SelectChangeEvent } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import CategoryEnterpriseEditById from 'src/sections/@dashboard/category-enterprise/categoryEnterprise-edit/CategoryEnterpriseEditById';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Box } from '@mui/system';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { langSelector, setLang } from 'src/sections/@dashboard/category-enterprise/category.slice';
import { LANG_CONST } from 'src/sections/@dashboard/category-enterprise/constants';
import { BREADCUMBS, langs } from 'src/common/constants/common.constants';

// ----------------------------------------------------------------------

export default function CategoryEnterpriseEdit() {
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
            heading="Sửa danh mục :"
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              {
                name: BREADCUMBS.CATEGORY_ENTERPRISE_LIST,
                href: PATH_DASHBOARD.enterprise.categories,
              },
              { name: BREADCUMBS.CATEGORY_ENTERPRISE_EDIT },
            ]}
          />
          <Box>
            <Select value={lang || ''} onChange={handleOnchange}>
              <MenuItem value={LANG_CONST.VI} sx={{ fontSize: '12px' }}>
                <img src={langs.vi.icon} />
              </MenuItem>
              <MenuItem value={LANG_CONST.EN} sx={{ fontSize: '12px' }}>
                <img src={langs.en.icon} />
              </MenuItem>
            </Select>
          </Box>
        </Stack>

        <CategoryEnterpriseEditById />
      </Container>
    </Page>
  );
}
