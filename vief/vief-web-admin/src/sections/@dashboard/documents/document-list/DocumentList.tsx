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
import { useSnackbar, VariantType } from 'notistack';
import { useState } from 'react';
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
import { CreateEditDocument } from '../document-create-edit-dialog/CreateEditDocument';
import {
  filterFieldSelector,
  filterNameSelector,
  setFilterField,
  setFilterName,
} from '../document.slice';
import { useDeleteDocuments } from '../hooks/useDeleteDocuments';
import { useGetDocuments } from '../hooks/useGetDocuments';
import { Document, DocumentSearchParams } from '../interface';
import { DocumentTableRow } from './components/DocumentTableRow';

function DocumentListDashboard() {
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

  const [isOpenForm, setOpenForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>(undefined);
  const filterName = useSelector(filterNameSelector);
  const filterField = useSelector(filterFieldSelector);
  const searchParams: DocumentSearchParams = { page: page + 1, size: rowsPerPage };
  if (filterField && filterField !== 'ALL') searchParams.field = filterField;
  if (filterName) searchParams.shortDesc = filterName;

  const { data, refetch } = useGetDocuments(searchParams);
  const listDocument = data?.data || [];
  const isNotFound = !listDocument.length;
  const { isCheckedAll, reset, selectedIds, handleSelectItem, handleCheckAll } = useSelectMultiple(
    listDocument.map((item) => item.id),
    page + 1
  );
  const titleForm = isEditMode ? 'Chỉnh sửa' : 'Thêm mới';

  function handleAfterDeleteDoc(message: string, variant?: VariantType) {
    enqueueSnackbar(message, { variant });
    refetch();
    setPage(0);
    reset();
  }
  const mutationDeleteDoc = useDeleteDocuments({
    onSuccess: () => handleAfterDeleteDoc('Xóa tài liệu thành công!'),
    onError: () => handleAfterDeleteDoc('Có lỗi xảy ra, xin thử lại!', 'error'),
  });

  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterField(e.target.value));
    setPage(0);
  };

  const handleDeleteRows = (ids: number[]) => {
    if (ids.length) {
      mutationDeleteDoc.mutate(ids);
    }
  };

  function handlePressAddBtn() {
    setIsEditMode(false);
    setOpenForm(true);
  }

  function handlePressEditBtn(document: Document) {
    setSelectedDocument(document);
    setIsEditMode(true);
    setOpenForm(true);
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh sách tài liệu"
        links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Tài liệu' }]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={handlePressAddBtn}
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
            {selectedIds.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selectedIds.length}
                isSelectAll={isCheckedAll}
                rowCount={listDocument.length}
                onSelectAllRows={(checked) => handleCheckAll(checked)}
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
                headLabel={TABLE_HEAD}
                rowCount={listDocument.length}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={(checked) => handleCheckAll(checked)}
              />

              <TableBody>
                {listDocument.map((row: Document) => (
                  <DocumentTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => handlePressEditBtn(row)}
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
      {isOpenForm && (
        <CreateEditDocument
          isEditMode={isEditMode}
          title={titleForm}
          isOpen={isOpenForm}
          onClose={() => setOpenForm(false)}
          defaultDocument={selectedDocument}
        />
      )}
    </>
  );
}

export { DocumentListDashboard };
