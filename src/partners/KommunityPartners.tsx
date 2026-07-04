import { useListKommunityPartnerQuery } from "../api/graphql";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Handshake } from "lucide-react";

export default function KommunityPartners() {
  const { orgId } = useParams<{ orgId: string }>();
  const { data, loading, error } = useListKommunityPartnerQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!orgId) return <div>Organization not found</div>;

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Handshake}
        title="Kommunity Partners"
        description="Partners you can connect to deploy a pre-configured stack."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.kommunityPartners?.map((partner) => (
          <Card key={partner.id} className="flex flex-col overflow-hidden">
             {partner.imageUrl ? (
               <img src={partner.imageUrl} alt={partner.name} className="h-40 w-full object-cover" />
             ) : (
               <div className="h-28 w-full bg-gradient-to-br from-primary/10 via-background to-secondary/20" />
             )}
             <CardHeader className="flex-row gap-4 items-center space-y-0">
                {partner.logoUrl && <img src={partner.logoUrl} alt={partner.name} className="w-12 h-12 object-contain" />}
                <div className="min-w-0">
                    <CardTitle className="truncate">{partner.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{partner.shortDescription || partner.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <Button asChild className="w-full mt-4">
                <Link to={`/organization/${orgId}/partners/${partner.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
