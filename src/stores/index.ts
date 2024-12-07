import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { Node } from '../types';

export const useMainStore = defineStore('main', () => {
  const nodes = ref<Node[]>([]);
  const activeNode = ref<string | null>(null);
  const activeEdgeId = ref<string | null>(null);
  const newNodeData = ref<any>(null);

  const createNode = (node: Node): Node => ({
    ...node,
    data: {
      ...node.data,
      name: node.name,
    },
    position: node.position || getDefaultPosition(node.id),
    draggable: node.type !== 'dateTimeConnector',
  });

  const getDefaultPosition = (id: string): { x: number; y: number } => {
    switch (id) {
      case '1': return { x: 250, y: 0 };
      case 'd09c08': return { x: 250, y: 200 };
      case '161f52': return { x: 180, y: 350 };
      case '28c4b9': return { x: 485, y: 350 };
      case 'b6a0c1': return { x: 400, y: 500 };
      case 'b0653a': return { x: 100, y: 500 };
      case 'e879e4': return { x: 400, y: 750 };
      default: return { x: 0, y: 0 };
    }
  };

  const edges = computed(() =>
    nodes.value
      .filter(node => node.parentId && node.parentId !== -1)
      .map(node => ({
        id: `${node.parentId}-${node.id}`,
        source: `${node.parentId}`,
        target: `${node.id}`,
        type: node.type === 'dateTimeConnector' ? 'custom' : 'button',
      }))
  );

  const setActiveNode = (nodeId: string | null) => {
    activeNode.value = nodeId;
  };

  const addNode = (node: Node) => {
    nodes.value.push(createNode(node));
  };

  const removeNode = (nodeId: string) => {
    nodes.value = nodes.value.filter(node => node.id !== nodeId);
  };

  const editNode = (nodeId: string, updatedProperties: Partial<Node>) => {
    nodes.value = nodes.value.map(node =>
      node.id === nodeId
        ? {
            ...node,
            ...updatedProperties,
            data: {
              ...node.data,
              ...(updatedProperties.data || {}),
            },
            position: updatedProperties.position || node.position,
          }
        : node
    );
  };

  const setNodes = (initialNodes: Node[]) => {
    nodes.value = initialNodes.map((node: any) =>
      createNode({
        ...node,
        id: typeof node.id === 'number' ? node.id.toString() : node.id,
      })
    );
  };

  const setActiveEdgeId = (newEdgeId: string | null) => {
    activeEdgeId.value = newEdgeId;
  };

  const setNewNodeData = (data: any) => {
    newNodeData.value = data;
  };

  return {
    nodes,
    edges,
    activeNode,
    activeEdgeId,
    newNodeData,
    setActiveNode,
    setNodes,
    addNode,
    removeNode,
    editNode,
    setActiveEdgeId,
    setNewNodeData,
  };
});
