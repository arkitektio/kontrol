import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import type { ListInstanceAliasFragment as ListInstanceAlias } from "@/graphql/fragments/alias.generated";

interface AliasChallengeProps {
  alias: ListInstanceAlias;
}

type ChallengeStatus = "idle" | "checking" | "reachable" | "unreachable" | "error";

export const AliasChallenge = ({ alias }: AliasChallengeProps) => {
  const [status, setStatus] = useState<ChallengeStatus>("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const runChallenge = async () => {
    setStatus("checking");
    setErrorMessage("");

    try {
      // Build URL - if no host is specified, use current server's location
      let challengeUrl: string;
      
      if (!alias.host || alias.host === "") {
        // Relative URL: use current server's protocol, host, and port
        const protocol = window.location.protocol; // includes ://
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : "";
        const path = alias.path || "";
        challengeUrl = `${protocol}//${hostname}${port}/${path}${alias.challenge}`;
      } else {
        // Absolute URL: use alias configuration
        const protocol = alias.ssl ? "https" : "http";
        const host = alias.host;
        const port = alias.port ? `:${alias.port}` : "";
        const path = alias.path || "";
        challengeUrl = `${protocol}://${host}${port}/${path}${alias.challenge}`;
      }

      const response = await fetch(challengeUrl, {
        method: "GET",
        mode: "cors",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (response.ok) {
        setStatus("reachable");
      } else {
        setStatus("unreachable");
        setErrorMessage(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setStatus("error");
      if (error instanceof Error) {
        // Handle specific error types
        if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
          setErrorMessage("Network error: CORS, mixed content, or unreachable host");
        } else if (error.name === "TimeoutError" || error.message.includes("timeout")) {
          setErrorMessage("Request timeout: Host took too long to respond");
        } else if (error.message.includes("NetworkError") || error.message.includes("network")) {
          setErrorMessage("Network error: Unable to connect");
        } else if (error.message.includes("certificate") || error.message.includes("SSL") || error.message.includes("TLS")) {
          setErrorMessage("SSL/TLS error: Invalid or untrusted certificate");
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("Unknown error occurred");
      }
    }
  };

  // Auto-run challenge on mount
  useEffect(() => {
    runChallenge();
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case "checking":
        return (
          <Badge variant="outline" className="gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Checking...
          </Badge>
        );
      case "reachable":
        return (
          <Badge className="gap-1 bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Reachable
          </Badge>
        );
      case "unreachable":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Unreachable
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="gap-1 text-yellow-600 border-yellow-500/50">
            <AlertCircle className="h-3 w-3" />
            Error
          </Badge>
        );
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {getStatusDisplay()}
      {(status === "unreachable" || status === "error") && errorMessage && (
        <span className="text-xs text-muted-foreground max-w-full break-words" title={errorMessage}>
          {errorMessage}
        </span>
      )}
      {status !== "checking" && (
        <Button onClick={runChallenge} variant="ghost" size="sm" className="h-6 px-2 text-xs">
          Retry
        </Button>
      )}
    </div>
  );
};
