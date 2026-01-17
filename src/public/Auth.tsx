import { Shield, Fingerprint, Users, Key } from "lucide-react"

export default function Auth() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Centralized Identity
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Kontrol acts as your organization's Identity Provider. Manage users, roles, and access to services in one place, 
                eliminating the need for separate logins for every tool in your lab.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <Users className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Organizations & Memberships</h3>
                    <p className="text-sm text-muted-foreground">
                        Work is organized into <strong>Organizations</strong>. You can invite colleagues to your organization and assign them granular <strong>Roles</strong>.
                        This ensures users only access the Resources (Devices, Services) they need.
                    </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border">
                    <Key className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">OAuth2 & OIDC</h3>
                    <p className="text-sm text-muted-foreground">
                        Applications don't handle passwords. They rely on Kontrol for authentication via industry-standard protocols.
                        This means a single sign-on (SSO) experience for all services running in your ecosystem.
                    </p>
                </div>
            </div>

            <div className="mt-10 bg-primary/5 p-8 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                    <Fingerprint className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">Fine-Grained Permissions</h3>
                </div>
                <p className="text-lg mb-4">
                    Security isn't just binary access. Kontrol allows you to define scopes and policies.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Grant read-only access to specific experimental data.</li>
                    <li>Allow specific user groups to deploy new services.</li>
                    <li>Manage machine-to-machine communication with dedicated Service tokens.</li>
                    <li>Revoke access instantly if a device is compromised or a member leaves.</li>
                </ul>
            </div>
        </div>
    )
}
