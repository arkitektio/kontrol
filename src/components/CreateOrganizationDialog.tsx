import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { useCreateOrganizationMutation } from "../api/graphql";
import { DEFAULT_BRAND_HUE } from "@/lib/brand";
import { SLUG_REGEX, slugifyName } from "@/lib/slug";

const formSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slug: z
    .string()
    .min(1, "Handle is required")
    .regex(
      SLUG_REGEX,
      "Lowercase letters, numbers and single hyphens only (e.g. 'my-organization').",
    ),
  description: z.string().optional(),
  brandHue: z.number().min(0).max(360),
});

/** Pull a suggested handle out of a backend rejection like `Try 'the-real-acme'.` */
const extractSuggestedSlug = (message: string): string | null => {
  const match = message.match(/Try '([a-z0-9-]+)'/);
  return match ? match[1] : null;
};

const HUE_GRADIENT =
  "linear-gradient(to right, hsl(0 70% 50%), hsl(60 70% 50%), hsl(120 70% 50%), hsl(180 70% 50%), hsl(240 70% 50%), hsl(300 70% 50%), hsl(360 70% 50%))";

interface CreateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateOrganizationDialog = ({
  open,
  onOpenChange,
}: CreateOrganizationDialogProps) => {
  const navigate = useNavigate();
  const [createOrganization, { loading }] = useCreateOrganizationMutation({
    // Refetch Me too — the sidebar/org switcher and active-org resolution read
    // the org list off Me — and await it so the new membership exists before we
    // navigate into the new organization.
    refetchQueries: ['ListOrganizations', 'Me'],
    awaitRefetchQueries: true,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      brandHue: DEFAULT_BRAND_HUE,
    },
  });

  // Auto-derive the handle from the name while the user hasn't touched it, so the
  // slug stays a clean preview of the name. Once they edit the handle directly we
  // stop syncing and leave their value alone.
  const slugDirty = useRef(false);
  const name = form.watch("name");
  useEffect(() => {
    if (!slugDirty.current) {
      form.setValue("slug", slugifyName(name), { shouldValidate: true });
    }
  }, [name, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createOrganization({
      variables: {
        input: {
          name: values.name,
          slug: values.slug,
          description: values.description || undefined,
          brandHue: values.brandHue,
        },
      },
    }).then((result) => {
      onOpenChange(false);
      slugDirty.current = false;
      form.reset();
      const newOrg = result.data?.createOrganization;
      if (newOrg) {
        toast.success("Organization created");
        navigate(`/organization/${newOrg.id}`);
      }
    }).catch((error) => {
      const message: string =
        error?.message ?? "Failed to create organization.";
      // A taken handle carries a suggested alternative — prefill it (editable) so
      // the user can tweak and resubmit.
      const suggestion = extractSuggestedSlug(message);
      if (suggestion) {
        slugDirty.current = true;
        form.setValue("slug", suggestion, { shouldValidate: true });
        form.setError("slug", { type: "server", message });
      }
      toast.error(message);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to manage teams and resources.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="my-organization"
                      {...field}
                      onChange={(e) => {
                        slugDirty.current = true;
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Your organization&apos;s URL handle: @{field.value || "…"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandHue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default brand colour</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div
                        className="h-9 w-9 shrink-0 rounded-full border"
                        style={{ backgroundColor: `hsl(${field.value} 70% 50%)` }}
                        aria-hidden
                      />
                      <div className="flex-1 space-y-2">
                        <div
                          className="h-3 w-full rounded-full"
                          style={{ background: HUE_GRADIENT }}
                          aria-hidden
                        />
                        <Slider
                          min={0}
                          max={360}
                          step={1}
                          value={[field.value]}
                          onValueChange={([v]) => field.onChange(v)}
                          aria-label="Default brand hue"
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                        {Math.round(field.value)}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
