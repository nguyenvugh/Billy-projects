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
import { TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import AdminTableRow from './components/AdminTableRow';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';
import {TABLE_HEAD } from '../constants';
import { useGetAdminAccounts } from '../hooks/useGetAdminAccounts';
import { AdminAccountSearchParams,  IAdminAccount, IAdminAccounts } from '../interface';
import { useDeleteAdminAccounts } from '../hooks/useDeleteAdminAccounts';
import { useSnackbar } from 'notistack';
import useTable from 'src/hooks/useTable';
function AdminAccountListDashboard() {
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () => {
    enqueueSnackbar('Delete Admin account successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Delete error', {
      variant: 'error',
    });
  };
  const mutationDetele = useDeleteAdminAccounts({ onSuccess, onError });
  const searchParams: AdminAccountSearchParams = { page: page + 1, size: rowsPerPage };
  const { data } = useGetAdminAccounts(searchParams);
  const listPolicy:IAdminAccounts  = data?.data.data || [];
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
  
  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDetele.mutate(ids);
      resetSelect();
    }
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.admin.editAccount(id));
  };

  const isNotFound = !listPolicy.length;

  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách tài khoản"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Admin Account List' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'}/>}
            to={PATH_DASHBOARD.root}
            component={RouterLink}
          >
            Thêm mới
          </Button>
        }
      />
      <Card>
        <Divider />
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
              {listPolicy.map((row: IAdminAccount) => (
                  <AdminTableRow
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

export { AdminAccountListDashboard };
