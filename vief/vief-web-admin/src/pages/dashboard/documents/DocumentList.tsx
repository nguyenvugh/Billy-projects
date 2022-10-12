import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { DocumentListDashboard } from 'src/sections/@dashboard/documents/document-list/DocumentList';

export default function DocumentList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tài liệu">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <DocumentListDashboard />
      </Container>
    </Page>
  );
}
