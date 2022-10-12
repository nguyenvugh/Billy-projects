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
import useTable, { getComparator } from 'src/hooks/useTable';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ROLE_OPTIONS, TABLE_HEAD, TYPE } from '../constants';
import {
  filterNameSelector,
  filterRoleSelector,
  setFilterName,
  setFilterRole,
} from '../category.slice';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { replacePathParams } from 'src/utils/replaceParams';

import { useGetCategoryEnterprise } from '../hooks/useGetCategoryEnterprise';
import { ICategory, ICategories, CategorySearchParams } from '../interfaces';
import CategoryTableRow from './components/CategoryTableRow';
import { ROLE, FEATURE_TYPE, FIELD, FILTER_NOT_FOUND_VALUE } from '../constants';
import _ from 'lodash';
import { BooleanEnum } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';

// ---------------------------------------------

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
  const mutationDetele = useDeleteCategory({ onSuccess, onError });

  const filterName = useSelector(filterNameSelector);
  const filterRole = useSelector(filterRoleSelector);

  const searchParams: CategorySearchParams = {
    page: page + 1,
    size: rowsPerPage,
    type: TYPE.ENTERPRISE,
  };
  if (filterRole && filterRole === 'WOOD') searchParams.field = filterRole;
  if (filterRole && filterRole === 'FEATURE') searchParams.isFeature = BooleanEnum.TRUE;
  if (filterRole && filterRole === 'NOT_FEATURE') searchParams.isFeature = BooleanEnum.FALSE;

  if (filterName) searchParams.name = filterName;

  const { data } = useGetCategoryEnterprise(searchParams);

  const tableData: ICategories = data?.data.data || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    tableData.map((item) => item.id),
    page + 1
  );

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterRole = (category: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterRole(category.target.value));
  };

  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDetele.mutate(ids);
      setSelected([]);
      resetSelect();
    }
  };

  const handleEditRow = (id: number, type: string) => {
    if (type === TYPE.POLICY) navigate(PATH_DASHBOARD.policy.editCategory(id));
    if (type === TYPE.ENTERPRISE) {
      navigate(
        replacePathParams(PATH_DASHBOARD.enterprise.categoryEnterprise_edit, {
          id: id.toString(),
        })
      );
    }
  };

  const isValidFilterName = !tableData.length && !!filterName;
  const isValidFilterRole = !tableData.length && !!filterRole && filterRole !== 'All';

  const isNotFound = isValidFilterName || isValidFilterRole;

  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh mục"
        links={[{ name: 'Trang chủ', href: PATH_DASHBOARD.enterprise.root }, { name: 'Danh mục' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => navigate(PATH_DASHBOARD.enterprise.categoryEnterprise_create)}
          >
            Thêm mới
          </Button>
        }
      />
      <Card>
        <Divider />

        <TableToolbar
          filterName={filterName}
          filterRole={filterRole}
          onFilterName={handleFilterName}
          onFilterRole={handleFilterRole}
          roleOptions={ROLE_OPTIONS}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={tableData.length}
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
                rowCount={
                  tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {tableData.map((row: ICategory) => (
                  <CategoryTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => handleEditRow(row.id, row.type as string)}
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
            count={data ? data?.data?.total : 0}
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
