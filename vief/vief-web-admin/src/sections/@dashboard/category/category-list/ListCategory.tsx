import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';
import TableToolbar from 'src/components/table/TableToolbar';
import useTable from 'src/hooks/useTable';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { convertRowToArrNumber } from 'src/utils/convertToArrayNumber';
import { ROLE_OPTIONS, TABLE_HEAD } from '../constants';
import {
  filterNameSelector,
  filterFieldSelector,
  setFilterName,
  setFilterField,
} from '../categoryPolicy.slice';
import { useDeleteCategories } from '../hooks/useDeleteCategoryPolicy';
import { useGetCategories } from '../hooks/useGetCategoryPolicy';
import { ICategoryPolicy, ICategories, CategoryPolicySearchParams } from '../interfaces';
import CategoryTableRow from './components/CategoryTableRow';
import _ from 'lodash';
import { BooleanEnum, BREADCUMBS } from 'src/common/constants/common.constants';
import { Fields } from 'src/common/constants/common.interfaces';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';

function CategoryListDashboard() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,

    selected: selectedRows,
    onSelectRow,
    onSelectAllRows,

    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () => {
    enqueueSnackbar('Delete category successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Delete error', {
      variant: 'error',
    });
  };
  const filterName = useSelector(filterNameSelector);
  const filterField = useSelector(filterFieldSelector);

  const mutationDetele = useDeleteCategories({ onSuccess, onError });

  const searchParams: CategoryPolicySearchParams = {
    page: page + 1,
    size: rowsPerPage,
    type: 'POLICY',
  };
  if (!['FEATURE', 'NOT_FEATURE'].includes(filterField)) searchParams.field = filterField as Fields;
  if (filterField && filterField === 'FEATURE') searchParams.isFeature = BooleanEnum.TRUE;
  if (filterField && filterField === 'NOT_FEATURE') searchParams.isFeature = BooleanEnum.FALSE;

  if (filterName) searchParams.name = filterName;

  // init page = 0
  const { data } = useGetCategories(searchParams);

  const listCategoryPolicy = data?.data || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listCategoryPolicy.map((item) => item.id),
    page + 1
  );

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterField = (category: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField(category.target.value));
  };

  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDetele.mutate(ids);
      resetSelect();
    }
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.policy.editCategory(id));
  };

  const isNotFound = !listCategoryPolicy.length;
  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh mục"
        links={[
          { name: BREADCUMBS.LIST_POLICY_CATEGORY, href: PATH_DASHBOARD.policy.root },
          { name: 'Danh mục' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.policy.category_create}
            component={RouterLink}
          >
            Thêm mới
          </Button>
        }
      />
      <Card>
        <Divider />

        <TableToolbar
          filterName={filterName}
          filterRole={filterField}
          onFilterName={handleFilterName}
          onFilterRole={handleFilterField}
          roleOptions={ROLE_OPTIONS}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listCategoryPolicy.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selectedIds)}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={listCategoryPolicy.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listCategoryPolicy.map((row: ICategoryPolicy) => (
                  <CategoryTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data ? data.total : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </>
  );
}

export { CategoryListDashboard };
