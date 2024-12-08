import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { Node } from '../types';

export const useMainStore = defineStore('main', () => {
  const nodes = ref<Node[]>([]);
  const activeNodeId = ref<string | null>(null);
  const activeEdgeId = ref<string | null>(null);
  const newNodeData = ref<any>(null);

  const nodeIds = ref<string[]>([]);

  const getNodeDescription = (nodeType: string) => {
    switch (nodeType) {
      case 'sendMessage': return 'Send a message, including text or attachment.';
      case 'dateTime': return 'Allows a branch to be created based on date & time conditions. Use it to set business hours or date range conditions.';
      case 'addComment': return 'Remark for more explanation.';
      default: return ''
    }
  };

  const createNode = (node: Node): Node => ({
    ...node,
    data: {
      ...node.data,
      name: node.name,
      description: getNodeDescription(node.type)
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
        type: node.type === 'dateTimeConnector' ? 'custom' : node.type === 'emptyNode' ? 'empty' : 'button',
      }))
  );

  const setActiveNodeId = (nodeId: string | null) => {
    activeEdgeId.value = null;
    activeNodeId.value = nodeId;
  };

  const addNode = (node: Node) => {
    const newNode = createNode(node);

    if (!nodeIds.value.includes(newNode.id)) {
      nodeIds.value.push(newNode.id); // Add the new node's ID to the list
    }

    nodes.value.push(newNode);
  };

  const removeNode = (nodeId: string) => {
    // Remove the node by ID from both nodes and IDs list
    nodes.value = nodes.value.filter(node => node.id !== nodeId);
    nodeIds.value = nodeIds.value.filter(id => id !== nodeId);
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
    nodes.value = initialNodes.map((node: any) => {
      const newNode = createNode({
        ...node,
        id: typeof node.id === 'number' ? node.id.toString() : node.id,
      });
      if (!nodeIds.value.includes(newNode.id)) {
        nodeIds.value.push(newNode.id);
      }
      return newNode;
    });
  };

  const setActiveEdgeId = (newEdgeId: string | null) => {
    activeNodeId.value = null;
    activeEdgeId.value = newEdgeId;
  };

  const setNewNodeData = (data: any) => {
    newNodeData.value = data;
  };

  return {
    nodes,
    edges,
    activeNodeId,
    activeEdgeId,
    newNodeData,
    nodeIds, // Expose the list of node IDs
    setActiveNodeId,
    setNodes,
    addNode,
    removeNode,
    editNode,
    setActiveEdgeId,
    setNewNodeData,
    getNodeDescription,
  };
});
