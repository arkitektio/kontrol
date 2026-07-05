import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, KeyRound, Users, ShieldCheck, MonitorSmartphone } from "lucide-react";
import { useConfig } from "./auth";

export default function Account() {
  const config = useConfig();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account security and preferences</p>
      </div>

      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>Manage your email address</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/account/email">Change Email</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Password
            </CardTitle>
            <CardDescription>Update your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline">
              <Link to="/account/password/change">Change Password</Link>
            </Button>
            <Button asChild variant="outline" className="ml-2">
              <Link to="/account/password/reset">Reset Password</Link>
            </Button>
          </CardContent>
        </Card>

        {config?.data.socialaccount && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Social Accounts
              </CardTitle>
              <CardDescription>Manage connected social accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link to="/account/providers">Manage Providers</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {config?.data.mfa && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Enhance your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link to="/account/2fa">Manage 2FA</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {config?.data.usersessions && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MonitorSmartphone className="h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>View and manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link to="/account/sessions">View Sessions</Link>
              </Button>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
