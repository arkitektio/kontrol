import type { ListServiceInstanceFragment } from "@/graphql/fragments/service_instance.generated"
import { Card } from './ui/card';
import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';

export const ServiceInstanceCard = ({ instance }: { instance: ListServiceInstanceFragment }) => {
  const logo = instance.release.service.logo?.presignedUrl

  return (
    <Link to={`/organization/${instance.organization.id}/service-instances/${instance.id}`} >
      <Card className="group grid grid-cols-3 hover:shadow-lg transition-shadow overflow-hidden p-0 h-40">
        {/* Content Section */}
        <div className={`${logo ? "col-span-2" : "col-span-3"} min-w-0 flex flex-col p-4 justify-between gap-4 relative`}>
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg hover:text-primary transition-colors truncate" title={instance.identifier}>
                    {instance.identifier}
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
        {logo && (
          <div className="col-span-1 relative right-0 top-0 w-full h-full overflow-hidden pointer-events-none">
            <img src={logo} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute w-full h-full bg-gradient-to-r from-card via-card/80 to-transparent" />
          </div>
        )}
      </Card>
    </Link>
  );
};
