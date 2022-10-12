import { useEffect, useState } from 'react';
// @mui
import { MenuItem, Stack } from '@mui/material';
// hooks
// components
import { IconButtonAnimate } from 'src/components/animate';
import Image from 'src/components/Image';
import MenuPopover from 'src/components/MenuPopover';
import { Lang, LangObj } from 'src/common/constants/common.interfaces';
import { langs } from 'src/common/constants/common.constants';
const LANG_OPTIONS = Object.keys(langs).map((key) => langs[key as Lang]);
// ----------------------------------------------------------------------

type SelectLangProps = {
  lang: Lang;
  onLangChange: (lang: LangObj) => void;
};
export function SelectLang({ onLangChange, lang }: SelectLangProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [selectedLang, setSelectedLang] = useState<LangObj>(langs.vi);

  useEffect(() => {
    setSelectedLang(langs[lang]);
  }, [lang]);

  useEffect(() => {
    onLangChange(langs.vi);
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLang = (newLang: Lang) => {
    const selectLang = langs[newLang];
    setSelectedLang(selectLang);
    onLangChange(selectLang);
    handleClose();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <Image disabledEffect src={selectedLang.icon} alt={selectedLang.label} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANG_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selectedLang.value}
              onClick={() => handleChangeLang(option.value)}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
