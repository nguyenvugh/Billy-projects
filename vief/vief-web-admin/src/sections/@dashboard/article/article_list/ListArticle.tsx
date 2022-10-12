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
import {
  filterNameSelector,
  filterRoleSelector,
  setFilterName,
  setFilterRole,
} from '../articleSlice';
import { replacePathParams } from 'src/utils/replaceParams';
// hook api
import { useGetAllArticle } from 'src/sections/@dashboard/article/hooks/useGetAllArticle';
import { useDeleteArticle } from 'src/sections/@dashboard/article/hooks/useDeleteArticle';
import { ArticleSearchParams, IArticle } from 'src/sections/@dashboard/article/interfaces';
// constant
import { ROLE_OPTIONS, TABLE_HEAD } from 'src/sections/@dashboard/article/constants';

import ArticleTableRow from './ArticleTableRow';
import _ from 'lodash';
import { BooleanEnum, BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';

// ---------------------------------------------

function ListArticle() {
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

  const { mutate: mutationDetele } = useDeleteArticle();
  const filterName = useSelector(filterNameSelector);
  const filterRole = useSelector(filterRoleSelector);

  const searchParams: ArticleSearchParams = {
    page: page + 1,
    size: rowsPerPage,
    type: 'ENTERPRISE',
  };

  if (filterRole && filterRole === 'WOOD') searchParams.field = filterRole;
  if (filterRole && filterRole === 'FEATURE') searchParams.isFeature = BooleanEnum.TRUE;
  if (filterRole && filterRole === 'NOT_FEATURE') searchParams.isFeature = BooleanEnum.FALSE;
  if (filterName) searchParams.title = filterName;

  const { data } = useGetAllArticle(searchParams);

  const tableData: IArticle[] = data?.data.data || [];
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
    let selectedIds = { id: ids };
    if (ids.length) {
      mutationDetele(selectedIds, {
        onSuccess: () => {
          enqueueSnackbar('Delete article successfully', {
            variant: 'success',
          });
        },
        onError: () => {
          enqueueSnackbar('Delete article failed', {
            variant: 'error',
          });
        },
      });
      setSelected([]);
      resetSelect();
    }
  };
  const handleEditRow = (id: string) => {
    navigate(replacePathParams(PATH_DASHBOARD.enterprise.article_edit, { id: id }));
  };
  const isValidFilterName = !tableData.length && !!filterName;
  const isValidFilterRole = !tableData.length && !!filterRole && filterRole !== 'All';
  const isNotFound = isValidFilterName || isValidFilterRole;
  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách bài viết"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.ARTICLE, href: PATH_DASHBOARD.enterprise.root },
          { name: BREADCUMBS.ARTICLE_LIST },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => navigate(PATH_DASHBOARD.enterprise.article_create)}
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
                {tableData.map((row: IArticle) => (
                  <ArticleTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => handleEditRow(row.id.toString())}
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

export { ListArticle };
