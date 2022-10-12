import { useState } from 'react';
// @mui
import { Checkbox, List, MenuItem, TableCell, TableRow } from '@mui/material';
// @types

// components
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { IAuthorization } from '../interface';

// ----------------------------------------------------------------------

type Props = {
  row: IAuthorization;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export default function AuthorizationTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, description, key, authorizedItems } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>

      <TableCell align="left">{name}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {description}
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
