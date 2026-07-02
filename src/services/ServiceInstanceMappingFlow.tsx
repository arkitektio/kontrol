import { ReactFlow, Position, type Node, type Edge, Handle, type NodeProps, type EdgeProps, BaseEdge, getBezierPath } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type ListServiceInstanceMappingFragment } from '../api/graphql';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { clientLabel } from '../lib/clientLabel';

interface ServiceInstanceMappingFlowProps {
    mappings: ListServiceInstanceMappingFragment[]
}

const ClientNode = ({ data }: NodeProps) => {
    return (
        <Link to={`/clients/${data.id}`} className="group relative flex items-center justify-center px-3 py-1.5 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-full shadow-sm transition-all hover:border-primary/30 hover:shadow-md pointer-events-auto">
            <Handle type="source" position={Position.Right} className="!bg-primary/20 !w-1 !h-1 !-right-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-semibold text-primary/70 group-hover:text-primary transition-colors">
                {data.label as string}
            </span>
        </Link>
    );
};

const KeyNode = ({ data }: NodeProps) => {
    return (
        <div className="group relative flex items-center justify-center px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
            <Handle type="target" position={Position.Left} className="!bg-border !w-1 !h-1 !-left-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                {data.label as string}
            </span>
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
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} className="stroke-border hover:stroke-primary/50 transition-colors duration-300" />
    );
};

const nodeTypes = {
    client: ClientNode,
    key: KeyNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

export const ServiceInstanceMappingFlow = ({ mappings }: ServiceInstanceMappingFlowProps) => {
    const { nodes, edges } = useMemo(() => {
        const uniqueClients = Array.from(new Set(mappings.map(m => m.client.id)))
            .map(id => mappings.find(m => m.client.id === id)!.client);

        const clientNodes: Node[] = uniqueClients.map((client, index) => ({
            id: `client-${client.id}`,
            position: { x: 0, y: index * 80 },
            data: { label: clientLabel(client), id: client.id },
            type: 'client',
        }));

        const keyNodes: Node[] = mappings.map((m, index) => ({
            id: `key-${m.id}`,
            position: { x: 300, y: index * 50 + (uniqueClients.length * 80 / 2) - (mappings.length * 50 / 2) },
            data: { label: m.key },
            type: 'key',
        }));

        const flowEdges: Edge[] = mappings.map(m => ({
            id: `e-${m.client.id}-${m.key}`,
            source: `client-${m.client.id}`,
            target: `key-${m.id}`,
            type: 'custom',
        }));

        return { nodes: [...clientNodes, ...keyNodes], edges: flowEdges };
    }, [mappings]);

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
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
            >
            </ReactFlow>
        </div>
    );
};
