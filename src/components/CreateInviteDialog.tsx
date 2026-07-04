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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateInviteMutation } from "../api/graphql";
import { useState } from "react";
import { Copy, Check, ChevronsUpDown, X } from "lucide-react";

const formSchema = z.object({
  expiresInDays: z.coerce.number().min(1).default(1),
  roles: z.array(z.string()).optional(),
  public: z.boolean(),
});

interface CreateInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  availableRoles: { identifier: string; id: string; description?: string | null }[];
  roleSets?: { id: string; name: string; roles: { identifier: string }[] }[];
}

export const CreateInviteDialog = ({
  open,
  onOpenChange,
  organizationId,
  availableRoles,
  roleSets = [],
}: CreateInviteDialogProps) => {
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  const [createInvite] = useCreateInviteMutation({
    refetchQueries: ['Organization']
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiresInDays: 1,
      roles: [],
      public: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createInvite({
      variables: {
        input: {
          organization: organizationId,
          expiresInDays: values.expiresInDays,
          roles: values.roles,
          public: values.public,
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
            {roleSets.length > 0 && (
              <div className="space-y-1">
                <FormLabel>Start from a role set</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Optional — fills the roles below. You can still fine-tune them.
                </p>
                <Select
                  onValueChange={(rsId) => {
                    const rs = roleSets.find((r) => r.id === rsId);
                    // createInvite matches roles by identifier, and the multiselect
                    // below is keyed on identifier too — so set identifiers, not ids.
                    if (rs) form.setValue("roles", rs.roles.map((r) => r.identifier));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a role set" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleSets.map((rs) => (
                      <SelectItem key={rs.id} value={rs.id}>
                        {rs.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => {
                const selected = field.value ?? [];
                const toggle = (identifier: string) =>
                  field.onChange(
                    selected.includes(identifier)
                      ? selected.filter((v) => v !== identifier)
                      : [...selected, identifier],
                  );
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Roles</FormLabel>
                    <Popover open={rolesOpen} onOpenChange={setRolesOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="justify-between font-normal">
                          {selected.length > 0
                            ? `${selected.length} role${selected.length > 1 ? "s" : ""} selected`
                            : "Select roles"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search roles..." />
                          {/* CommandList caps its own height and scrolls, so a long
                              role list no longer overflows the dialog. */}
                          <CommandList>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                              {availableRoles.map((role) => (
                                <CommandItem
                                  key={role.id}
                                  value={role.identifier}
                                  onSelect={() => toggle(role.identifier)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selected.includes(role.identifier) ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  <span>{role.identifier}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {selected.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {selected.map((identifier) => (
                          <Badge key={identifier} variant="secondary" className="gap-1">
                            {identifier}
                            <button
                              type="button"
                              aria-label={`Remove ${identifier}`}
                              onClick={() => toggle(identifier)}
                              className="ml-0.5 rounded-sm hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">Public link</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Anyone with the link can preview the organization and inviter before signing up.
                    </p>
                  </div>
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
