import { useParams } from "react-router-dom";
import { useGetKommunityPartnerQuery } from "../api/graphql";
import { Button } from "../components/ui/button";

export default function KommunityPartner() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetKommunityPartnerQuery({
    variables: { id: id! },
    skip: !id,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.kommunityPartner) return <div>Partner not found</div>;

  const partner = data.kommunityPartner;

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="flex items-center gap-6 mb-8">
        {partner.logoUrl && <img src={partner.logoUrl} alt={partner.name} className="w-24 h-24 object-contain" />}
        <h1 className="text-4xl font-bold">{partner.name}</h1>
      </div>
      
      <div className="prose dark:prose-invert mb-8">
         <p>{partner.description || "No description available."}</p>
      </div>

      <div className="flex gap-4">
         <Button asChild size="lg">
            <a href={partner.authUrl} target="_blank" rel="noopener noreferrer">
                Connect & Create Account
            </a>
         </Button>
      </div>
    </div>
  );
}
