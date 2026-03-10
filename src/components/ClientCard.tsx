import { Suspense, lazy } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import type { ListClientFragment } from '@/api/graphql';
import { Card } from './ui/card';
import { ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';

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
              <div>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors truncate">
                    {client.name.slice(0, 20)}
                </h3>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <span className='flex flex-row gap-2'>
                      <Package className="w-3.5 h-3.5 my-auto" />
                      {client.release?.app?.identifier || 'Unknown'}
                    </span>
                    {client.release && (
                      <Badge variant="secondary" className="font-mono text-xs w-fit">
                        v{client.release.version}
                      </Badge>
                    )}
                </div>
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