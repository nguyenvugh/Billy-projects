import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { DATE_FORMAT } from 'src/common/constants/common.constants';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { IPropsDocumentTableRow } from '../../interface';

export function DocumentTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsDocumentTableRow) {
  const { file, field, translates, createdAt } = row;

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

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{file.fileName}</TableCell>

      <TableCell align="left">{translates[0]?.shortDesc}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {field}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {file.type}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {format(new Date(createdAt), DATE_FORMAT)}
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
                Xóa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Sửa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
