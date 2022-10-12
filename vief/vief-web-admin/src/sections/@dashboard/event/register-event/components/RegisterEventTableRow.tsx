import { TableCell, TableRow } from '@mui/material';
import { IPropsRegisterEventTableRow } from '../../interfaces';

export default function RegisterEventTableRow({ row }: IPropsRegisterEventTableRow) {
  const { fullName, email, phone } = row;

  return (
    <TableRow hover>
      <TableCell align="left">{fullName}</TableCell>

      <TableCell align="left">{phone}</TableCell>
      <TableCell align="left">{email}</TableCell>
    </TableRow>
  );
}
