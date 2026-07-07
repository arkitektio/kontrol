import { ReactFlow, Controls, Position, type Node, type Edge, Handle, type NodeProps, type EdgeProps, BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type DetailClientFragment } from '../api/graphql';
import { useMemo } from 'react';

const REACHABLE = '#22c55e';   // green-500
const UNREACHABLE = '#ef4444'; // red-500

/**
 * Minimal alias shape the flow needs: the service instance it points at and the
 * endpoint used to reach it. Both a client's live `usedAliases[].alias` and a
 * report snapshot's `entries[].alias` satisfy it.
 */
export interface FlowAlias {
    host?: string | null;
    port?: number | null;
    ssl: boolean;
    path?: string | null;
    instance: { id: string; identifier: string; release: { service: { identifier: string } } };
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
    tone?: 'default' | 'healthy' | 'unhealthy';
}

/** The endpoint an edge resolved to (the alias), kept short. */
function aliasLabel(alias?: FlowAlias | null): string | undefined {
    if (!alias) return undefined;
    if (alias.host) return `${alias.host}${alias.port ? `:${alias.port}` : ''}`;
    return alias.path ? `/${alias.path}` : 'local';
}

const HeadNode = ({ data }: NodeProps) => {
    const head = data.head as AliasFlowHead;
    const color = head.tone === 'unhealthy' ? UNREACHABLE : head.tone === 'healthy' ? REACHABLE : undefined;
    return (
        <div
            className="rounded-md border bg-background/80 px-3 py-1.5 text-[11px] font-semibold shadow-sm"
            style={color ? { borderColor: color } : undefined}
        >
            {head.label}
            <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !-right-0.5 !bg-foreground/40" />
        </div>
    );
};

const InstanceNode = ({ data }: NodeProps) => {
    const instance = data.instance as FlowAlias['instance'];
    return (
        <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 shadow-sm">
            <Handle type="target" position={Position.Left} className="!w-1.5 !h-1.5 !-left-0.5 !bg-primary/40" />
            <div className="text-[10px] font-medium">{instance.release.service.identifier}</div>
            <div className="text-[8px] text-muted-foreground font-mono">{instance.identifier}</div>
        </div>
    );
};

const UnresolvedNode = ({ data }: NodeProps) => {
    const label = data.label as string;
    return (
        <div className="rounded-md border bg-background/80 px-3 py-1.5 shadow-sm" style={{ borderColor: UNREACHABLE }}>
            <Handle type="target" position={Position.Left} className="!w-1.5 !h-1.5 !-left-0.5" style={{ background: UNREACHABLE }} />
            <div className="text-[10px] font-mono" style={{ color: UNREACHABLE }}>{label}</div>
        </div>
    );
};

/** Edge coloured by reachability, carrying the resolved alias as its label. */
const AliasEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, data }: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const isValid = data?.valid !== false;
    const color = isValid ? REACHABLE : UNREACHABLE;
    const label = data?.label as string | undefined;

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={{ stroke: color, strokeWidth: 2 }} />
            {label && (
                <EdgeLabelRenderer>
                    <div
                        className="nodrag nopan"
                        style={{ position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`, pointerEvents: 'all' }}
                    >
                        <span
                            className="rounded-full border bg-background/90 px-1.5 py-0.5 text-[8px] font-mono shadow-sm whitespace-nowrap"
                            style={{ borderColor: color, color }}
                        >
                            {label}
                        </span>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

const nodeTypes = { head: HeadNode, instance: InstanceNode, unresolved: UnresolvedNode };
const edgeTypes = { alias: AliasEdge };

/**
 * Presentational reachability graph: the reporting client on the left, one node
 * per resolved service instance on the right, connected by an edge that is
 * coloured green (reachable) / red (unreachable) and labelled with the alias.
 * Requirements that resolved to no alias appear as red "unresolved" nodes.
 */
export const UsedAliasFlow = ({ head, entries }: { head: AliasFlowHead; entries: AliasFlowEntry[] }) => {
    const { nodes, edges } = useMemo(() => {
        const resolved = entries.filter((e) => e.alias);
        const unresolved = entries.filter((e) => !e.alias);

        // unique service instances (right column), preserving first-seen order
        const instances: FlowAlias['instance'][] = [];
        const seen = new Set<string>();
        for (const e of resolved) {
            const inst = e.alias!.instance;
            if (!seen.has(inst.id)) { seen.add(inst.id); instances.push(inst); }
        }

        const rightCount = instances.length + unresolved.length;
        const ROW = 64;

        const headNode: Node = {
            id: 'head',
            position: { x: 0, y: (rightCount - 1) * ROW / 2 },
            data: { head },
            type: 'head',
        };

        const instanceNodes: Node[] = instances.map((instance, i) => ({
            id: `inst-${instance.id}`,
            position: { x: 300, y: i * ROW },
            data: { instance },
            type: 'instance',
        }));

        const unresolvedNodes: Node[] = unresolved.map((e, i) => ({
            id: `unres-${e.key}`,
            position: { x: 300, y: (instances.length + i) * ROW },
            data: { label: e.key },
            type: 'unresolved',
        }));

        const edges: Edge[] = [
            ...resolved.map((e) => ({
                id: `e-${e.key}`,
                source: 'head',
                target: `inst-${e.alias!.instance.id}`,
                type: 'alias',
                data: { valid: e.valid, label: aliasLabel(e.alias) },
            })),
            ...unresolved.map((e) => ({
                id: `e-${e.key}`,
                source: 'head',
                target: `unres-${e.key}`,
                type: 'alias',
                data: { valid: false, label: e.reason ?? 'unresolved' },
            })),
        ];

        return { nodes: [headNode, ...instanceNodes, ...unresolvedNodes], edges };
    }, [head, entries]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            maxZoom={2.5}
            proOptions={{ hideAttribution: true }}
            zoomOnScroll
            zoomOnPinch
            zoomOnDoubleClick
            panOnDrag
        >
            <Controls showInteractive={false} />
        </ReactFlow>
    );
};

/** Backwards-compatible wrapper that draws a client's live `usedAliases`. */
export const ClientUsedAliasFlow = ({ client }: { client: DetailClientFragment }) => {
    const head: AliasFlowHead = { label: client.release.app.identifier };
    const entries: AliasFlowEntry[] = (client.usedAliases ?? []).map((a) => ({
        key: a.key,
        valid: a.valid,
        reason: a.reason,
        alias: a.alias ?? null,
    }));
    return <UsedAliasFlow head={head} entries={entries} />;
};
