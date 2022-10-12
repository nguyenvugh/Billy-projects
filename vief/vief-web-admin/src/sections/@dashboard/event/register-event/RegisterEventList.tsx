import { Card, Divider, Table, TableBody, TableContainer } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { TABLE_HEAD_REGISTER_EVENT } from '../constants';
import { useGetRegisterEventById } from '../hooks/useGetRegisterEvent';
import { IRegisterEvent } from '../interfaces';
import RegisterEventTableRow from './components/RegisterEventTableRow';

function RegisterEventListDashboard() {
  const params = useParams();
  const id = params?.eventId;
  const { dense, page, order, orderBy, rowsPerPage } = useTable();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = () => {
    enqueueSnackbar('Get register events successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get register event error', {
      variant: 'error',
    });
  };
  // init page = 0
  const { data } = useGetRegisterEventById({
    idEvent: parseInt(id as string),
    callback: { onSuccess, onError },
  });

  const tableData = data?.data || ([] as IRegisterEvent[]);

  const rowCount = Array.from(tableData).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ).length;

  return (
    <>
      <HeaderBreadcrumbs
        heading="Register event"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.LIST_EVENT, href: PATH_DASHBOARD.event.list },
          { name: BREADCUMBS.LIST_REGISTER_EVENT },
        ]}
      />
      <Card>
        <Divider />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_REGISTER_EVENT}
                rowCount={rowCount}
              />

              <TableBody>
                {Array.from(tableData).map((row: IRegisterEvent) => (
                  <RegisterEventTableRow key={row.id} row={{ ...row }} />
                ))}

                <TableNoData isNotFound={!tableData.length} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
}

export { RegisterEventListDashboard };
