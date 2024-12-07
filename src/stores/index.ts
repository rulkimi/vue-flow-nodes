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
            case 'b6a0c1': return { x: 400, y: 500 };
            case 'b0653a': return { x: 100, y: 500 };
            case 'e879e4': return { x: 400, y: 750 };
            default: return { x: 0, y: 0 };
          }
      })(),
    }));

  const nodes = ref();
  const edges = ref();

  const activeNode = ref();
  
  const setActiveNode = (nodeId: string) => {
    activeNode.value = nodeId;
  }

  const setNodes = (node: Node[]) => {
    const filteredNode = node.filter(node => node.name !== 'Success' && node.name !== 'Failure');
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

  const generateEdges = (nodes: Node[]) => {
    const edgesList = [];
    
    const ids = nodes.map(node => node.id);
    
    if (ids.includes(1) && ids.includes('d09c08')) {
      edgesList.push({
        id: 'e1-d09c08',
        source: '1',
        target: 'd09c08',
        type: 'button',
      });
    }

    if (ids.includes('d09c08') && ids.includes('b0653a')) {
      edgesList.push({
        id: 'd09c08-b0653a',
        source: 'd09c08',
        target: 'b0653a',
        type: 'button',
      });
    }

    if (ids.includes('d09c08') && ids.includes('b6a0c1')) {
      edgesList.push({
        id: 'd09c08-b6a0c1',
        source: 'd09c08',
        target: 'b6a0c1',
        type: 'button',
      });
    }

    if (ids.includes('b6a0c1') && ids.includes('e879e4')) {
      edgesList.push({
        id: 'b6a0c1-e879e4',
        source: 'b6a0c1',
        target: 'e879e4',
        type: 'button',
      });
    }

    return edgesList;
  };

  return {
    nodes,
    edges,
    activeNode,
    setActiveNode,
    setNodes,
  };
});
