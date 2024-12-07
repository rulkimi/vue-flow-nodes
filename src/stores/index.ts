import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

import { Node } from '../types'

export const useMainStore = defineStore('main', () => {
  const createNodes = (nodesArray: Node[]): Node[] =>
    nodesArray.map((node) => ({
      ...node,
      data: {
        ...node.data,
        name: node.name,
      },
      position: (() => {
        if (node.position) return node.position;

        switch (node.id) {
            case 1: return { x: 250, y: 0 };
            case 'd09c08': return { x: 250, y: 200 };
            case '161f52': return { x: 180, y: 350 };
            case '28c4b9': return { x: 485, y: 350 };
            case 'b6a0c1': return { x: 400, y: 500 };
            case 'b0653a': return { x: 100, y: 500 };
            case 'e879e4': return { x: 400, y: 750 };
            default: return { x: 0, y: 0 };
          }
      })(),
      draggable: node.type === 'dateTimeConnector' ? false : true
    }));

  const nodes = ref();
  const edges = ref();

  const activeNode = ref();
  
  const setActiveNode = (nodeId: string) => {
    activeNode.value = nodeId;
  }

  const setNodes = (node: Node[]) => {
    const filteredNode = node;
    const newNodes = createNodes(filteredNode);
    nodes.value = newNodes;
  }

  watch(
    () => nodes.value,
    (newNodes) => {
      if (!newNodes) return;

      const newEdges = generateEdges(newNodes);
      edges.value = newEdges;
    },
    { deep: true, immediate: true }
  );

  const generateEdges = (nodes: Node[]): { id: string; source: string; target: string; type: string }[] => {
    return nodes
      .filter((node) => node.parentId && node.parentId !== -1)
      .map((node) => ({
        id: `${node.parentId}-${node.id}`,
        source: `${node.parentId}`,
        target: `${node.id}`,
        type: node.type === 'dateTimeConnector' ? 'smoothstep' : 'button',
      }));
  };

  return {
    nodes,
    edges,
    activeNode,
    setActiveNode,
    setNodes,
  };
});
