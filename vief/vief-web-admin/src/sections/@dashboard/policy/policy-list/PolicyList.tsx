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
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Scrollbar from 'src/components/Scrollbar';
import { BooleanEnum, BREADCUMBS } from 'src/common/constants/common.constants';
import { TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';
import TableToolbar from 'src/components/table/TableToolbar';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import PolicyTableRow from './components/PolicyTableRow';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';
import {ROLE_OPTIONS, TABLE_HEAD } from '../constants';
import {
  filterFieldSelector,
  filterNameSelector,
  setFilterField,
  setFilterName,
} from '../policy.slice';
import { useGetPolicys } from '../hooks/useGetPolicys';
import { PolicySearchParams,  IPolicy } from '../interface';
import { useDeletePolicys } from '../hooks/useDeletePolicys';
import { useSnackbar } from 'notistack';
import useTable from 'src/hooks/useTable';
function PolicyListDashboard() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () => {
    enqueueSnackbar('Delete policys successfully', {
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
  const mutationDetele = useDeletePolicys({ onSuccess, onError });
  const searchParams: PolicySearchParams = { page: page + 1, size: rowsPerPage };
  if (filterField && filterField === 'WOOD') searchParams.field = filterField;
  if (filterField && filterField === 'FEATURE') searchParams.isFeature = BooleanEnum.TRUE;
  if (filterField && filterField === 'NOT_FEATURE') searchParams.isFeature = BooleanEnum.FALSE;

  if (filterName) searchParams.title = filterName;
  const { data } = useGetPolicys(searchParams);


  const listPolicy = data?.data || [];
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listPolicy.map((item) => item.id),
    page + 1
  );
  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterField = (policy: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField(policy.target.value));
  };

  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDetele.mutate(ids);
      resetSelect();
    }
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.policy.edit(id));
  };

  const isNotFound = !listPolicy.length;

  return (
    <>
      <HeaderBreadcrumbs
        heading="Policy"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Policy List' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'}/>}
            to={PATH_DASHBOARD.policy.new}
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
                rowCount={listPolicy.length}
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
                  listPolicy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
              {listPolicy.map((row: IPolicy) => (
                  <PolicyTableRow
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

export { PolicyListDashboard };
