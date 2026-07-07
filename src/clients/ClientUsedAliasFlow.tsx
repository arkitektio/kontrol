import { ReactFlow, Position, type Node, type Edge, Handle, type NodeProps, type EdgeProps, BaseEdge, getBezierPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type DetailClientFragment } from '../api/graphql';
import { useMemo } from 'react';
import { stringToPaletteColor } from '@/lib/logoUtils';

/**
 * Minimal alias shape the flow needs to draw a service node. Both a client's
 * live `usedAliases[].alias` and a report snapshot's `entries[].alias` satisfy it.
 */
export interface FlowAlias {
    id: string;
    host?: string | null;
    port?: number | null;
    ssl: boolean;
    path?: string | null;
    instance: { identifier: string; release: { service: { identifier: string } } };
}

/** One requirement→alias reachability report, shared by the client page and the report page. */
export interface AliasFlowEntry {
    key: string;
    valid: boolean;
    reason?: string | null;
    alias?: FlowAlias | null;
}

/** The head node (the reporting client). */
export interface AliasFlowHead {
    label: string;
    badge?: string | null;
    sublabel?: string | null;
    tone?: 'default' | 'healthy' | 'unhealthy';
}

const HeadNode = ({ data }: NodeProps) => {
    const head = data.head as AliasFlowHead;
    const tone = head.tone ?? 'default';
    const toneClasses =
        tone === 'unhealthy'
            ? 'from-red-500/10 to-orange-500/10 border-red-500/30 hover:border-red-500/50'
            : tone === 'healthy'
              ? 'from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50'
              : 'from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40';

    return (
        <div className={`group relative flex flex-col px-3 py-2 backdrop-blur-sm border rounded-md shadow-sm transition-all hover:shadow-lg bg-gradient-to-br min-w-[180px] ${toneClasses}`}>
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 justify-between">
                    <span className="text-[11px] font-semibold truncate">
                        {head.label}
                    </span>
                    {head.badge && (
                        <span className="text-[8px] px-1 py-0.5 rounded bg-foreground/10 text-foreground/70 flex-shrink-0">
                            {head.badge}
                        </span>
                    )}
                </div>
                {head.sublabel && (
                    <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                        <span className="font-mono">{head.sublabel}</span>
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !-right-0.5 !bg-blue-500/30" />
        </div>
    );
};

const KeyNode = ({ data }: NodeProps) => {
    const entry = data.entry as AliasFlowEntry;
    const isValid = entry.valid !== false;
    const reason = entry.reason;

    return (
        <div className={`group relative flex flex-col gap-1 px-3 py-1.5 backdrop-blur-sm border rounded-md shadow-sm transition-all hover:shadow-md min-w-[140px] ${
            isValid
                ? "bg-background/80 border-border/50 hover:border-primary/50"
                : "bg-destructive/10 border-destructive/50 hover:border-destructive"
        }`}>
            <Handle type="target" position={Position.Left} className={`!w-1.5 !h-1.5 !-left-0.5 ${
                isValid ? "!bg-border" : "!bg-destructive"
            }`} />

            <span className={`text-[10px] font-medium transition-colors font-mono ${
                isValid ? "text-muted-foreground group-hover:text-foreground" : "text-destructive"
            }`}>
                {entry.key}
            </span>

            {!isValid && reason && (
                <div className="text-[8px] text-destructive/90 break-words leading-tight">
                    {reason}
                </div>
            )}

            <Handle type="source" position={Position.Right} className={`!w-1.5 !h-1.5 !-right-0.5 ${
                isValid ? "!bg-border" : "!bg-destructive"
            }`} />
        </div>
    );
};

const AliasNode = ({ data }: NodeProps) => {
    const alias = data.alias as FlowAlias;

    let url: string;
    if (!alias.host || alias.host === "") {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : "";
        const path = alias.path || "";
        url = `${protocol}//${hostname}${port}/${path}`;
    } else {
        url = `${alias.ssl ? "https" : "http"}://${alias.host}${alias.port ? `:${alias.port}` : ""}/${alias.path || ""}`;
    }

    const color = stringToPaletteColor(alias.instance.release.service.identifier);

    return (
        <div className="group relative flex flex-col items-start justify-center px-3 py-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-md shadow-sm transition-all hover:border-primary/30 hover:shadow-md min-w-[150px]" style={{
            borderColor: color
        }}>
            <Handle type="target" position={Position.Left} className="!bg-primary/20 !w-1.5 !h-1.5 !-left-0.5" />
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-primary/80">
                        {alias.instance?.release?.service?.identifier || 'Unknown Service'}
                    </span>
                    <span className="text-[8px] text-muted-foreground">/</span>
                    <span className="text-[10px] text-primary/60">
                        {alias.instance?.identifier || 'Unknown Instance'}
                    </span>
                </div>
                <span className="text-[9px] text-muted-foreground font-mono break-all">
                    {url}
                </span>
            </div>
        </div>
    );
};

const CustomEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }: EdgeProps) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const isValid = data?.valid !== false;

    return (
        <BaseEdge
            path={edgePath}
            markerEnd={markerEnd}
            style={{
                ...style,
                strokeWidth: 2,
                stroke: isValid ? 'rgb(var(--border))' : 'rgb(var(--destructive) / 0.5)'
            }}
        />
    );
};

const nodeTypes = {
    head: HeadNode,
    key: KeyNode,
    alias: AliasNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

/**
 * Presentational client→requirement→alias graph. Feed it a head node (the
 * reporting client) and a list of reachability entries. Invalid entries/edges
 * render in the destructive colour, surfacing where connection issues are.
 */
export const UsedAliasFlow = ({ head, entries }: { head: AliasFlowHead; entries: AliasFlowEntry[] }) => {
    const { nodes, edges } = useMemo(() => {
        const uniqueAliases = Array.from(new Set(entries.map(e => e.alias?.id).filter(Boolean)))
            .map(id => entries.find(e => e.alias?.id === id)!.alias!);

        const headNode: Node = {
            id: 'head',
            position: { x: 0, y: entries.length * 60 / 2 - 25 },
            data: { head },
            type: 'head',
        };

        const keyNodes: Node[] = entries.map((entry, index) => ({
            id: `key-${entry.key}`,
            position: { x: 250, y: index * 80 },
            data: { entry },
            type: 'key',
        }));

        const aliasNodes: Node[] = uniqueAliases.map((alias, index) => ({
            id: `alias-${alias.id}`,
            position: { x: 500, y: index * 100 + (entries.length * 80 / 2) - (uniqueAliases.length * 100 / 2) },
            data: { alias },
            type: 'alias',
        }));

        const headToKeyEdges: Edge[] = entries.map(e => ({
            id: `e-head-${e.key}`,
            source: 'head',
            target: `key-${e.key}`,
            type: 'custom',
            data: { valid: true },
        }));

        const keyToAliasEdges: Edge[] = entries.filter(e => e.alias).map(e => ({
            id: `e-${e.key}-${e.alias!.id}`,
            source: `key-${e.key}`,
            target: `alias-${e.alias!.id}`,
            type: 'custom',
            data: { valid: e.valid },
        }));

        return {
            nodes: [headNode, ...keyNodes, ...aliasNodes],
            edges: [...headToKeyEdges, ...keyToAliasEdges],
        };
    }, [head, entries]);

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
                panOnScroll={false}
                zoomOnScroll={false}
                panOnDrag={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
            />
        </div>
    );
};

/** Backwards-compatible wrapper that draws a client's live `usedAliases`. */
export const ClientUsedAliasFlow = ({ client }: { client: DetailClientFragment }) => {
    const head: AliasFlowHead = {
        label: client.release.app.identifier,
        badge: client.kind,
        sublabel: `v${client.release.version}${client.user ? ` · @${client.user.username}` : ''}`,
    };
    const entries: AliasFlowEntry[] = (client.usedAliases ?? []).map(a => ({
        key: a.key,
        valid: a.valid,
        reason: a.reason,
        alias: a.alias ?? null,
    }));
    return <UsedAliasFlow head={head} entries={entries} />;
};
