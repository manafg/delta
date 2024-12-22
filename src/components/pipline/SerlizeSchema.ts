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
        }else if (type === 'join') {
            block.input_ports = { left: 'left', right: 'right' };
            block.output_ports = { main: 'main' };
        }

        return block;
    });

    const connections = edges.map((edge, index) => {
        const from = edge.source.replace(/-/g, '');
        const to = edge.target.replace(/-/g, '');
        
        // Check if the target node is of type 'join'
        const targetNode = nodes.find(node => node.id.replace(/-/g, '') === to);
        let from_port = 'main';
        if (targetNode && targetNode.type === 'join') {
            // Assign 'left' to the first connection and 'right' to the second connection
            from_port = (index === 0) ? 'left' : 'right';
        }

        return {
            from,
            from_port: 'main',
            to,
            to_port: from_port
        };
    });

    return {
        blocks,
        connections
    };
}

export function DeserializeSchema(data: { blocks: any[], connections: any[] }) {
    const nodes = data.blocks.map(block => {
        if(block.type === 'aggregate'){
            const { id, type, metaData, options, schema } = block;
            const node: Node = {
                id,
                type,
                position: metaData.position, // Correctly map position from metaData
                data: {
                    options,
                    schema
                },
            }
            return node;
        }
        const { id, type, metaData, options, stream_options,  } = block;
        const { schema} = block.options;
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