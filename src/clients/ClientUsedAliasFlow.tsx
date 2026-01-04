import { ReactFlow, Position, type Node, type Edge, Handle, type NodeProps, type EdgeProps, BaseEdge, getBezierPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type ListUsedAliasFragment, type ListInstanceAliasFragment, type DetailClientFragment } from '../api/graphql';
import { useMemo } from 'react';

interface ClientUsedAliasFlowProps {
    client: DetailClientFragment
}

const ClientNode = ({ data }: NodeProps) => {
    const client = data.client as DetailClientFragment;
    
    return (
        <div className="group relative flex flex-col px-3 py-2 backdrop-blur-sm border rounded-md shadow-sm transition-all hover:shadow-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 min-w-[180px]">
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 justify-between">
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 truncate">
                        {client.release.app.identifier}
                    </span>
                    <span className="text-[8px] px-1 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 flex-shrink-0">
                        {client.kind}
                    </span>
                </div>
                
                <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <span className="font-mono">v{client.release.version}</span>
                    {client.user && (
                        <>
                            <span>•</span>
                            <span>@{client.user.username}</span>
                        </>
                    )}
                </div>
            </div>
            
            <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !-right-0.5 !bg-blue-500/30" />
        </div>
    );
};

const KeyNode = ({ data }: NodeProps) => {
    const usedAlias = data.usedAlias as ListUsedAliasFragment;
    const isValid = usedAlias.valid !== false;
    const reason = usedAlias.reason;

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
                {usedAlias.key}
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
    const alias = data.alias as ListInstanceAliasFragment;
    
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

    return (
        <div className="group relative flex flex-col items-start justify-center px-3 py-2 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-md shadow-sm transition-all hover:border-primary/30 hover:shadow-md min-w-[150px]">
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
    client: ClientNode,
    key: KeyNode,
    alias: AliasNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

export const ClientUsedAliasFlow = ({ client }: ClientUsedAliasFlowProps) => {
    const { nodes, edges } = useMemo(() => {
        const uniqueAliases = Array.from(new Set(client.usedAliases?.map(a => a.alias?.id).filter(Boolean)))
            .map(id => client.usedAliases?.find(a => a.alias?.id === id)!.alias!);

        // Client node at the start
        const clientNode: Node = {
            id: 'client',
            position: { x: 0, y: (client.usedAliases?.length || 0) * 60 / 2 - 25 },
            data: { client },
            type: 'client',
        };

        // Key nodes in the middle
        const keyNodes: Node[] = client.usedAliases?.map((usedAlias, index) => ({
            id: `key-${usedAlias.key}`,
            position: { x: 250, y: index * 80 },
            data: { 
                usedAlias
            },
            type: 'key',
        })) || [];

        // Alias nodes at the end
        const aliasNodes: Node[] = uniqueAliases.map((alias, index) => ({
            id: `alias-${alias.id}`,
            position: { x: 500, y: index * 100 + ((client.usedAliases?.length || 0) * 80 / 2) - (uniqueAliases.length * 100 / 2) },
            data: { 
                alias
            },
            type: 'alias',
        }));

        // Edges from client to keys
        const clientToKeyEdges: Edge[] = client.usedAliases?.map(a => ({
            id: `e-client-${a.key}`,
            source: 'client',
            target: `key-${a.key}`,
            type: 'custom',
            data: { valid: true }
        })) || [];

        // Edges from keys to aliases
        const keyToAliasEdges: Edge[] = client.usedAliases?.filter(a => a.alias).map(a => ({
            id: `e-${a.key}-${a.alias!.id}`,
            source: `key-${a.key}`,
            target: `alias-${a.alias!.id}`,
            type: 'custom',
            data: { valid: a.valid }
        })) || [];

        return { 
            nodes: [clientNode, ...keyNodes, ...aliasNodes], 
            edges: [...clientToKeyEdges, ...keyToAliasEdges] 
        };
    }, [client]);

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
