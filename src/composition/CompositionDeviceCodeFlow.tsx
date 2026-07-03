import { ReactFlow, Position, type Node, type Edge, Handle, type NodeProps, type EdgeProps, BaseEdge, getBezierPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type CompositionDeviceCodeFragment } from '../api/graphql';
import { useMemo } from 'react';
import { Server, Layers, Box } from 'lucide-react';

interface CompositionDeviceCodeFlowProps {
    compositionDeviceCode: CompositionDeviceCodeFragment
}

const CompositionNode = ({ data }: NodeProps) => {
    const manifest = data.manifest as CompositionDeviceCodeFragment['manifest'];
    
    return (
        <div className="group relative flex flex-col px-3 py-2 backdrop-blur-sm border rounded-md shadow-sm transition-all hover:shadow-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-500/40 min-w-[180px]">
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 justify-between">
                    <div className="flex items-center gap-2">
                        <Layers className="h-3 w-3 text-indigo-500" />
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                            {manifest?.identifier || "Unknown Hub"}
                        </span>
                    </div>
                </div>
            </div>
            
            <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !-right-0.5 !bg-indigo-500/30" />
        </div>
    );
};

const ServiceInstanceNode = ({ data }: NodeProps) => {
    const instance = data.instance as NonNullable<CompositionDeviceCodeFragment['manifest']>['instances'][number];
    
    return (
        <div className="group relative flex flex-col px-3 py-2 backdrop-blur-sm border rounded-md shadow-sm transition-all hover:shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 min-w-[160px]">
            <Handle type="target" position={Position.Left} className="!w-1.5 !h-1.5 !-left-0.5 !bg-purple-500/30" />
            
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 justify-between">
                    <div className="flex items-center gap-2">
                        <Server className="h-3 w-3 text-purple-500" />
                        <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 truncate">
                            {instance?.identifier || "Service"}
                        </span>
                    </div>
                </div>
                
                {instance?.description && (
                    <div className="flex items-center gap-1 text-[8px] text-muted-foreground pl-5">
                        <span>{instance.description}</span>
                    </div>
                )}
            </div>
            
            <Handle type="source" position={Position.Right} className="!w-1.5 !h-1.5 !-right-0.5 !bg-purple-500/30" />
        </div>
    );
};

const ClientNode = ({ data }: NodeProps) => {
    const client = data.client as NonNullable<CompositionDeviceCodeFragment['manifest']>['clients'][number];
    
    return (
        <div className="group relative flex flex-col items-start justify-center px-3 py-2 bg-blue-500/5 backdrop-blur-sm border border-blue-500/10 rounded-md shadow-sm transition-all hover:border-blue-500/30 hover:shadow-md min-w-[150px]">
            <Handle type="target" position={Position.Left} className="!bg-blue-500/20 !w-1.5 !h-1.5 !-left-0.5" />
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                    <Box className="h-3 w-3 text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-600/80 dark:text-blue-400/80">
                        {client?.identifier || "Client"}
                    </span>
                </div>
                {client?.description && (
                    <span className="text-[9px] text-muted-foreground pl-4.5">
                        {client.description}
                    </span>
                )}
            </div>
        </div>
    );
};

const CustomEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: EdgeProps) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <BaseEdge 
            path={edgePath} 
            markerEnd={markerEnd} 
            style={{
                ...style,
                strokeWidth: 2,
                stroke: 'rgb(var(--border))'
            }}
        />
    );
};

const nodeTypes = {
    composition: CompositionNode,
    serviceInstance: ServiceInstanceNode,
    client: ClientNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

export const CompositionDeviceCodeFlow = ({ compositionDeviceCode }: CompositionDeviceCodeFlowProps) => {
    const { nodes, edges } = useMemo(() => {
        const instances = compositionDeviceCode.manifest?.instances || [];
        const clients = compositionDeviceCode.manifest?.clients || [];
        const totalItems = instances.length + clients.length;
        const totalHeight = Math.max(totalItems * 80, 100);
        const centerY = totalHeight / 2 - 25;

        // Composition node
        const compositionNode: Node = {
            id: 'composition',
            position: { x: 0, y: centerY },
            data: { manifest: compositionDeviceCode.manifest },
            type: 'composition',
        };

        // Service instance nodes
        const serviceInstanceNodes: Node[] = instances.map((instance, index) => ({
            id: `instance-${index}`,
            position: { x: 250, y: index * 80 },
            data: { instance },
            type: 'serviceInstance',
        }));

        // Client nodes
        const clientNodes: Node[] = clients.map((client, index) => ({
            id: `client-${index}`,
            position: { x: 500, y: (instances.length + index) * 80 },
            data: { client },
            type: 'client',
        }));

        // Edges from composition to instances
        const instanceEdges: Edge[] = instances.map((_, index) => ({
            id: `composition-instance-${index}`,
            source: 'composition',
            target: `instance-${index}`,
            type: 'custom',
        }));

        // Edges from instances to clients (simplified - connecting first instance to all clients)
        const clientEdges: Edge[] = clients.map((_, index) => ({
            id: `instance-client-${index}`,
            source: instances.length > 0 ? 'instance-0' : 'composition',
            target: `client-${index}`,
            type: 'custom',
        }));

        return {
            nodes: [compositionNode, ...serviceInstanceNodes, ...clientNodes],
            edges: [...instanceEdges, ...clientEdges],
        };
    }, [compositionDeviceCode]);

    return (
        <div className="h-[300px] w-full border rounded-md bg-muted/30">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }}
                minZoom={0.5}
                maxZoom={1.5}
            />
        </div>
    );
};
