import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { IPropsPolicyTableRow } from '../../interface';

export default function PolicyTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsPolicyTableRow) {
  const { title, isFeature, field, thumbnail,category} = row;


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

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <img style={thumbnailStyle} src={thumbnail?.url} alt={title} />
      </TableCell>

      <TableCell align="left">{title}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {field}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {category.type}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {category.name}
      </TableCell>
      <TableCell align="left" title={isFeature === 1 ? 'featured' : 'unFeatured'}>
        <Iconify
          icon={isFeature === 1 ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',

            ...(isFeature === -1 && { color: 'warning.main' }),
          }}
        />
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
