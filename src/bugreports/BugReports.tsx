import { Bug } from "lucide-react"
import { useParams } from "react-router-dom"

import { PageHeader } from "@/components/PageHeader"
import { BugReportList } from "./BugReportList"

/** Every bug report of the organization (the reports you filed, if you are no admin of it). */
export default function BugReports() {
  const { orgId } = useParams<{ orgId: string }>()
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <PageHeader
        icon={Bug}
        title="Bug reports"
        description="What people reported from inside an app, with what the app recorded around it."
      />
      <BugReportList scope={{ organization: orgId || undefined }} search />
    </div>
  )
}
