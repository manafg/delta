import { Node, Edge } from '@xyflow/react';

export function SerlizeSchema(nodes: Node[], edges: Edge[]) {
    const blocks = nodes.map(node => {
        const { id, type, position, data , measured, selected, dragging} = node;

        const block: any = {
            id: id.replace(/-/g, ''),
            type,
            options: data.options,
            stream_options: data.stream_options,
            schema: data.schema,
            metaData: {
                position: position,
                measured: measured,
                selected: selected,
                dragging: dragging
            }
            
        };

        // Add input_ports and output_ports based on node type
        if (type === 'file_reader') {
            block.output_ports = { main: 'main' };
        } else if (type === 'file_writer') {
            block.input_ports = { main: 'main' };
        } else if (type === 'aggregate') {
            block.input_ports = { main: 'main' };
            block.output_ports = { main: 'main' };
        }

        return block;
    });

    const connections = edges.map(edge => ({
        from: edge.source.replace(/-/g, ''),
        from_port: 'main',
        to: edge.target.replace(/-/g, ''),
        to_port: 'main'
    }));

    return {
        blocks,
        connections
    };
}

export function DeserializeSchema(data: { blocks: any[], connections: any[] }) {
    const nodes = data.blocks.map(block => {
        const { id, type, metaData, options, stream_options,  } = block;
        const { schema} = block.options;
        debugger
        const node: Node = {
            id,
            type,
            position: metaData.position, // Correctly map position from metaData
            data: {
                options,
                stream_options,
                schema
            },
            measured: metaData.measured, // Correctly map measured from metaData
            selected: metaData.selected, // Correctly map selected from metaData
            dragging: metaData.dragging  // Correctly map dragging from metaData
        };

        return node;
    });

    const edges = data.connections.map(connection => ({
        id: `xy-edge__${connection.from}-${connection.to}`,
        source: connection.from,
        target: connection.to
    }));

    return {
        nodes,
        edges
    };
}