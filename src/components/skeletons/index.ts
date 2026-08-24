/**
 * Content-shaped loading states. The loading half of the pair whose error half
 * is `@/components/status` — import from the barrel, not the files:
 *
 *   import { ListPageSkeleton } from "@/components/skeletons"
 *
 * The usual page shape is now:
 *
 *   if (loading) return <ListPageSkeleton columns={4} />
 *   if (error) return <QueryError error={error} />
 */
export {
  ListPageSkeleton,
  DashboardSkeleton,
  DetailPageSkeleton,
  DetailCardSkeleton,
  SettingsStackSkeleton,
  SectionSkeleton,
  ConfigureCardSkeleton,
  CenteredCardSkeleton,
  AuthFormSkeleton,
  ProfilePageSkeleton,
  type SkeletonVariant,
} from "./archetypes"
export { RouteSkeleton } from "./RouteSkeleton"
