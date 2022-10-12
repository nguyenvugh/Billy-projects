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
import { BooleanEnum, BREADCUMBS } from 'src/common/constants/common.constants';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';
import TableToolbar from 'src/components/table/TableToolbar';
import { useSelectMultiple } from 'src/hooks/useSelectMultiple';
import useTable from 'src/hooks/useTable';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ROLE_OPTIONS, TABLE_HEAD } from '../constants';
import {
  filterFieldSelector,
  filterNameSelector,
  setFilterField,
  setFilterName,
} from '../event.slice';
import { useDeleteEvents } from '../hooks/useDeleteEvents';
import { useGetEvents } from '../hooks/useGetEvents';
import { EventSearchParams, IEvent } from '../interfaces';
import EventTableRow from './components/EventTableRow';

function EventListDashboard() {
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
    enqueueSnackbar('Delete events successfully', {
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

  const mutationDetele = useDeleteEvents({ onSuccess, onError });

  const searchParams: EventSearchParams = { page: page + 1, size: rowsPerPage };
  if (filterField && filterField === 'WOOD') searchParams.field = filterField;
  if (filterField && filterField === 'FEATURE') searchParams.isFeature = BooleanEnum.TRUE;
  if (filterField && filterField === 'NOT_FEATURE') searchParams.isFeature = BooleanEnum.FALSE;

  if (filterName) searchParams.title = filterName;

  // init page = 0
  const { data } = useGetEvents(searchParams);

  const listEvent = data?.data || [];

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listEvent.map((item) => item.id),
    page + 1
  );

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterField = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField(event.target.value));
  };

  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDetele.mutate(ids);
      resetSelect();
    }
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.event.edit(id));
  };

  const isNotFound = !listEvent.length;

  return (
    <>
      <HeaderBreadcrumbs
        heading="Event"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'Event' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.event.new}
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
                rowCount={listEvent.length}
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
                  listEvent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listEvent.map((row: IEvent) => (
                  <EventTableRow
                    key={row.id}
                    row={{ ...row, timeStart: new Date(row.timeStart).toLocaleString() }}
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

export { EventListDashboard };
