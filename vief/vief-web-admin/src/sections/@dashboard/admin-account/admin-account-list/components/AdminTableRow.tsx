import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { IPropsAdminAccountTableRow } from '../../interface';

export default function AdminTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsAdminAccountTableRow) {
  const {email, userType } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (policy: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(policy.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected} onClick={() => {}}>
      <TableCell padding="checkbox">
      <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {userType.map((temp) =>temp.name)}
      </TableCell>
      

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
const thumbnailStyle: any = {
  border: '1px solid #ddd',
  border_radius: ' 10px',
  padding: '5px',
  width: '80px',
  height: '50px',
};
