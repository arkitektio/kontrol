import { useTheme } from '@/providers/ThemeProvider';
import type { ListServiceInstanceFragment } from '@/api/graphql';
import { Card } from './ui/card';
import { ArrowRight, Box } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ServiceLogo from './ServiceLogo';
import { Badge } from './ui/badge';

export const ServiceInstanceCard = ({ instance }: { instance: ListServiceInstanceFragment }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/organization/${instance.organization.id}/service-instances/${instance.id}`} >
      <Card className="group grid grid-cols-3 grid-cols-reverse hover:shadow-lg transition-shadow overflow-hidden p-0 h-40">
        {/* Content Section */}
        <div className="col-span-2 flex flex-col p-4 justify-between gap-4 relative">
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors truncate">
                    {instance.identifier.slice(0, 20)}
                </h3>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    
                    <span className='flex flex-row gap-2'><Box className="w-3.5 h-3.5 my-auto" />{instance.release.service.identifier}</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                v{instance.release.version}
              </Badge>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        {/* Logo Section */}
        <div className="col-span-1 relative right-0 top-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 right-0">
            <ServiceLogo 
              service={instance.release.service.identifier} 
              theme={theme} 
            />
          </div>
          <div className="absolute w-full h-full bg-gradient-to-r from-card via-card/80 to-transparent" />

        </div>
      </Card>
    </Link>
  );
};