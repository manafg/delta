import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

type NodeData = {
  label: string;
  type: 'input' | 'output' | 'operation';
  // Add any other properties specific to your nodes
};

type PipelineState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  addNode: (nodeType: NodeData['type'], position: { x: number; y: number }) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
};

export const usePipelineStore = create<PipelineState>((set) => ({
  nodes: [],
  edges: [],
  addNode: (nodeType, position) => set((state) => {
    const newId = `${nodeType}-${state.nodes.length + 1}`;
    return {
      nodes: [
        ...state.nodes,
        {
          id: newId,
          type: nodeType,
          position,
          data: { label: `New ${nodeType} node`, type: nodeType },
        },
      ],
    };
  }),
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    ),
  })),
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
  })),
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge],
  })),
  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter((edge) => edge.id !== id),
  })),
}));