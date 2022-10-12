// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <ProgressBarStyle />
              <ChartStyle />
              <ScrollToTop />
              <Router />
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
