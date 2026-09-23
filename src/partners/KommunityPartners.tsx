import { useListKommunityPartnerQuery } from "@/graphql/queries/kommunity_partner.generated"
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { ListEmpty } from "../components/ListEmpty";
import { matchesSearch } from "../components/matchesSearch";
import { Handshake } from "lucide-react";

import { QueryError, ResourceNotFound } from "@/components/status"

import { ListPageSkeleton } from "@/components/skeletons"

export default function KommunityPartners() {
  const { orgId } = useParams<{ orgId: string }>();
  const [search, setSearch] = useState("");
  const { data, loading, error } = useListKommunityPartnerQuery();

  if (loading) return <ListPageSkeleton columns={3} count={6} />
  if (error) return <QueryError error={error} resource="organization" />
  if (!orgId) return <ResourceNotFound resource="organization" />

  const partners = (data?.kommunityPartners ?? []).filter((p) =>
    matchesSearch(search, p.name, p.shortDescription, p.description),
  );

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Handshake}
        title="Kommunity Partners"
        description="Partners you can connect to deploy a pre-configured stack."
      />
      <SearchInput value={search} onChange={setSearch} placeholder="Search partners…" delay={150} />
      {partners.length === 0 ? (
        <ListEmpty
          icon={Handshake}
          search={search}
          title="No partners available"
          description="This server doesn't list any Kommunity Partners yet."
        />
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
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
      )}
    </div>
  );
}
