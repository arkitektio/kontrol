import { Shield, Fingerprint, Users, Key } from "lucide-react"

export default function Auth() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                One login for everything
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Lok is the OAuth2/OpenID Connect provider for your whole setup. Users and apps sign in once through
                Kontrol; every service trusts the signed token it gets back, so there's no separate account per tool.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <Users className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Organizations, Roles &amp; Scopes</h3>
                    <p className="text-sm text-muted-foreground">
                        People and resources live inside an <strong>Organization</strong>. Invite colleagues, give them
                        <strong> Roles</strong>, and attach <strong>Scopes</strong> so a token only reaches the Devices and Services it's meant to.
                    </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border">
                    <Key className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-lg font-bold mb-2">Clients speak OAuth2 / OIDC</h3>
                    <p className="text-sm text-muted-foreground">
                        Each app is registered as a <strong>Client</strong> and never touches a password — it redirects
                        to Lok and receives a signed JWT. Services authenticate the same way with their own machine-to-machine tokens.
                    </p>
                </div>
            </div>

            <div className="mt-10 bg-primary/5 p-8 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                    <Fingerprint className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">Access you can scope and revoke</h3>
                </div>
                <p className="text-lg mb-4">
                    Roles and Scopes describe exactly what a token can do — not just whether it's in or out.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Grant read-only access to a specific Service.</li>
                    <li>Let one Role deploy new services while others only consume them.</li>
                    <li>Give each app or Device its own token instead of a shared secret.</li>
                    <li>Add TOTP, passkeys, or recovery codes, and revoke a token the moment a Device or member leaves.</li>
                </ul>
            </div>
        </div>
    )
}
