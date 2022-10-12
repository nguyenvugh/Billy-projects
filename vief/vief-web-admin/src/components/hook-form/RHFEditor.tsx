// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, FormHelperText } from '@mui/material';
//
import Editor, { Props as EditorProps } from '../editor';

// ----------------------------------------------------------------------

interface Props extends EditorProps {
  name: string;
  toolbarId?: string;
  disabled?: boolean;
}

export default function RHFEditor({ name, toolbarId, disabled, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          {disabled && (
            <Box
              borderRadius={1}
              width="100%"
              height="100%"
              bgcolor="gray"
              position="absolute"
              zIndex={10000}
              sx={{
                opacity: 0.05,
              }}
            />
          )}
          <Editor
            id={toolbarId}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={
              <FormHelperText error sx={{ px: 2, textTransform: 'capitalize', color: 'red' }}>
                {error?.message}
              </FormHelperText>
            }
            {...other}
          />
        </Box>
      )}
    />
  );
}
