import { useState } from 'react';
// @mui
import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
// @types
// import { ArticleType } from 'src/@types/article';
import { IArticle } from '../interfaces';
// components
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';

// ----------------------------------------------------------------------

type Props = {
  row: IArticle;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export default function ArticleTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { title, isFeature, field, thumbnail, category } = row;

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

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <img style={thumbnailStyle} src={thumbnail?.url} alt={title} />
      </TableCell>

      <TableCell align="left">{title}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {field}
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
