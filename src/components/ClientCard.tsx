import { Suspense, lazy } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ListClientFragment } from '@/api/graphql';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import { ClientLabel } from './ClientLabel';

const AutoLogo = lazy(() => import('./AutoLogo'));

export const ClientCard = ({ client }: { client: ListClientFragment }) => {
  const { theme } = useTheme(); // returns 'light' or 'dark'
  const isMobile = useIsMobile();

  return (
    <Link to={`/organization/${client.organization.id}/clients/${client.id}`}>
      <Card className="group grid grid-cols-3 grid-cols-reverse hover:shadow-lg transition-shadow overflow-hidden p-0 h-40">
        {/* Content Section */}
        <div className="col-span-2 flex flex-col p-4 justify-between gap-4 relative">
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                    <ClientLabel client={client} className="flex-wrap" />
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Logo Section */}
        <div className="col-span-1 relative right-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          {!isMobile ? (
            <div className="absolute inset-0 right-0">
              <Suspense fallback={null}>
                <AutoLogo 
                  manifest={client.manifest} 
                  theme={theme} 
                />
              </Suspense>
            </div>
          ) : null}
          <div className="absolute w-full h-full bg-gradient-to-r from-card via-card/80 to-transparent" />
        </div>
      </Card>
    </Link>
  );
};