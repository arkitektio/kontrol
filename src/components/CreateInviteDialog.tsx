import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateInviteMutation } from "../api/graphql";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const formSchema = z.object({
  expiresInDays: z.coerce.number().min(1).default(1),
  roles: z.array(z.string()).optional(),
});

interface CreateInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  availableRoles: { identifier: string; id: string; description?: string | null }[];
}

export const CreateInviteDialog = ({
  open,
  onOpenChange,
  organizationId,
  availableRoles,
}: CreateInviteDialogProps) => {
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [createInvite] = useCreateInviteMutation({
    refetchQueries: ['Organization']
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiresInDays: 1,
      roles: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createInvite({
      variables: {
        input: {
          organization: organizationId,
          expiresInDays: values.expiresInDays,
          roles: values.roles,
        },
      },
    }).then((res) => {
      if (res.data?.createInvite?.token) {
        setCreatedInviteToken(res.data.createInvite.token);
      }
    });
  };

  const handleCopy = () => {
    if (createdInviteToken) {
        const url = `${window.location.origin}/invite/${createdInviteToken}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setCreatedInviteToken(null);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{createdInviteToken ? "Invite Created" : "Create Invite"}</DialogTitle>
          <DialogDescription>
            {createdInviteToken 
                ? "Share this link with the person you want to invite." 
                : "Create a new invite link for this organization."}
          </DialogDescription>
        </DialogHeader>

        {createdInviteToken ? (
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            readOnly
                            value={`${window.location.origin}/invite/${createdInviteToken}`}
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <DialogFooter>
                    <Button onClick={handleClose}>
                        Done
                    </Button>
                </DialogFooter>
            </div>
        ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="expiresInDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires in (days)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Roles</FormLabel>
                  </div>
                  {availableRoles.map((role) => (
                    <FormField
                      key={role.id}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role.identifier)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), role.identifier])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== role.identifier
                                      )
                                    );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal">
                                {role.identifier}
                              </FormLabel>
                              {role.description && (
                                <p className="text-sm text-muted-foreground">
                                  {role.description}
                                </p>
                              )}
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Invite</Button>
            </DialogFooter>
          </form>
        </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
