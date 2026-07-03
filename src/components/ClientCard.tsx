import type { ListClientFragment } from '@/api/graphql';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import { ClientLabel } from './ClientLabel';

export const ClientCard = ({ client }: { client: ListClientFragment }) => {
  return (
    <Link to={`/organization/${client.organization.id}/clients/${client.id}`}>
      <Card className="group flex h-40 flex-col justify-between gap-4 p-4 transition-shadow hover:shadow-lg">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
            <ClientLabel client={client} className="flex-wrap" />
          </h3>
        </div>
      </Card>
    </Link>
  );
};
