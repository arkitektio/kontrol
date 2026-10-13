import { useOrganizationQuery } from "@/graphql/queries/organization.generated"
import { useUpdateOrganizationMutation } from "@/graphql/mutations/organization.generated"
import { normalizeInstallUrl, type DeeplinkApp } from "@/lib/deeplinks"

/**
 * The apps an organization's links may open, and the one way to change them:
 * lok stores the list as a whole (its order decides the default), so every
 * edit, on the list page or on an app's own page, saves the full list.
 */
export function useLinkApps(orgId?: string) {
  const { data, loading, error, refetch } = useOrganizationQuery({
    variables: { id: orgId! },
    skip: !orgId,
  })
  const [update, { loading: saving }] = useUpdateOrganizationMutation({
    refetchQueries: ["Organization"],
    awaitRefetchQueries: true,
  })

  const org = data?.organization ?? null
  const apps: readonly DeeplinkApp[] = org?.deeplinkApps ?? []

  const saveApps = (next: readonly DeeplinkApp[]) =>
    update({
      variables: {
        input: {
          id: orgId!,
          deeplinkApps: next.map((app) => ({
            protocol: app.protocol,
            name: app.name.trim() || null,
            installUrl: normalizeInstallUrl(app.installUrl ?? ""),
            mobile: app.mobile,
          })),
        },
      },
    })

  const setPublicPreview = (publicLinkPreview: boolean) =>
    update({ variables: { input: { id: orgId!, publicLinkPreview } } })

  return { org, apps, loading, error, refetch, saving, saveApps, setPublicPreview }
}
