import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routes/router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from './components/shared/ThemeProvider';
import ReactLenis from 'lenis/react';

AOS.init({
  duration: 1000,
  once: true,
});

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ReactLenis root>
          <RouterProvider router={router} />
        </ReactLenis>

        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
