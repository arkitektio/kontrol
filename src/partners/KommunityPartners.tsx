import { useListKommunityPartnerQuery } from "../api/graphql";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function KommunityPartners() {
  const { data, loading, error } = useListKommunityPartnerQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Kommunity Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.kommunityPartners?.map((partner) => (
          <Card key={partner.id} className="flex flex-col">
             <CardHeader className="flex-row gap-4 items-center space-y-0">
                {partner.logoUrl && <img src={partner.logoUrl} alt={partner.name} className="w-12 h-12 object-contain" />}
                <div>
                    <CardTitle>{partner.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <Button asChild className="w-full mt-4">
                <Link to={`/partners/${partner.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
