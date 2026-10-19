import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [source, setSource] = useState('');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    fetch(`${import.meta.env.BASE_URL}source-page.html`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load the supplied page.');
        return response.text();
      })
      .then((html) => {
        const magnetarLogo = `data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="867" height="285" viewBox="0 0 867 285"><text x="0" y="220" fill="#FDFCFC" font-family="sans-serif" font-size="190" font-weight="600" letter-spacing="-8">Magnetar</text></svg>',
        )}`;
        const page = html
          .replace(
            /href="\[([^\]]*)\]\((https?:\/\/[^)]+)\)"/g,
            'href="$2"',
          )
          .replace(/Qubix Studio/g, 'Magnetar')
          .replace(
            /https:\/\/cdn\.prod\.website-files\.com\/69a9212ffc8e44e1794fb799\/69abe64293a2c4053f4ff30c_Qubix\.svg/g,
            magnetarLogo,
          )
          .replace(/Qubix/g, 'Magnetar')
          .replace(
            '</head>',
            '<style id="magnetar-background">html{min-height:100%;background:linear-gradient(180deg,#f7f7fa 0%,#eeedf7 12%,#cbc5ef 24%,#a095e6 36%,#7461d0 47%,#4735aa 59%,#2a1a71 71%,#160d43 83%,#080617 94%,#020204 100%) fixed!important;background-size:100% 100%!important}body{background:transparent!important}section{background-color:transparent!important}</style></head>',
          );

        if (active) setSource(page);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-[100dvh] w-full overflow-hidden bg-[#020204]">
      {loadError ? (
        <div className="flex min-h-[100dvh] items-center justify-center bg-[#f0eff8] font-sans text-[#17142b]">
          The supplied page could not be loaded. Refresh to try again.
        </div>
      ) : (
        <iframe
          title="Magnetar"
          srcDoc={source}
          className="block min-h-[100dvh] w-full border-0"
          style={{ height: '100dvh' }}
          scrolling="yes"
        />
      )}
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
