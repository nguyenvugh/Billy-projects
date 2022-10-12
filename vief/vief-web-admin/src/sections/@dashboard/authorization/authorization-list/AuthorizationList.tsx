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
import { PATH_DASHBOARD } from 'src/routes/paths';
import { replacePathParams } from 'src/utils/replaceParams';
// hook api
import { useGetAuthorization } from '../hooks/useGetAuthorization';
// constant
import { TABLE_HEAD } from '../constants';

import AuthorizationTableRow from '../components/AuthorizationTableRow';
import _ from 'lodash';
import { BooleanEnum, BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';
import { IAuthorization } from '../interface';

// ---------------------------------------------

function AuthorizationList() {
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

    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const { data } = useGetAuthorization();
  console.log('chekc data', data?.data.data);

  const tableData: IAuthorization[] = data?.data.data || [];
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    tableData.map((item) => item.key),
    page + 1
  );

  const handleDeleteRows = (ids: string[]) => {
    let selectedIds = { id: ids };
  };
  const handleEditRow = (id: string) => {
    navigate(replacePathParams(PATH_DASHBOARD.enterprise.article_edit, { id: id }));
  };

  const isNotFound = !tableData;
  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách phân quyền"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.AUTHORIZATION_LIST },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => navigate(PATH_DASHBOARD.authorization.authorization_create)}
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
                {tableData.map((row: IAuthorization) => (
                  <AuthorizationTableRow
                    key={row.key}
                    row={row}
                    selected={selectedIds.includes(row.key)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.key, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.key])}
                    onEditRow={() => handleEditRow(row.key)}
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
            count={data ? data?.data?.data.length : 0}
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

export { AuthorizationList };
