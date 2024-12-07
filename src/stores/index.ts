import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface NodeData {
  type?: string;
  oncePerContact?: boolean;
  timezone?: string;
  action?: string;
  payload?: Array<{ type: string; text?: string; attachment?: string }>;
  comment?: string;
}

interface Node {
  id: string;
  type: string;
  data: NodeData;
  name?: string;
  position: { x: number; y: number };
  class?: string;
}

export const useMainStore = defineStore('main', () => {
  const createNodes = (nodesArray: Node[]): Node[] =>
    nodesArray.map((node) => ({
      ...node,
      data: {
        ...node.data,
        name: node.name 
      },
    }));
  
  const nodes = computed(() => 
    createNodes([
      {
        id: '1',
        type: 'trigger',
        data: { 
          type: 'conversationOpened',
          oncePerContact: false,
        },
        position: { x: 250, y: 0 },
        class: 'light',
      },
      {
        name: 'Business Hours',
        id: 'd09c08',
        type: 'dateTime',
        data: {
          timezone: 'UTC',
          action: 'businessHours'
        },
        position: { x: 250, y: 200 },
        class: 'light',
      },
      {
        name: 'Away Message',
        id: 'b6a0c1',
        type: 'sendMessage',
        data: {
          payload: [
            {
              type: 'text',
              text: 'Sorry, we are currently away. We will respond as soon as possible.',
            },
          ],
        },
        position: { x: 400, y: 500 },
        class: 'light',
      },
      {
        name: 'Welcome Message',
        id: 'b0653a',
        type: 'sendMessage',
        data: {
          payload: [
            {
              type: 'attachment',
              attachment: 'https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58',
            }
          ],
        },
        position: { x: 100, y: 500 },
        class: 'light',
      },
      {
        id: 'e879e4',
        type: 'addComment',
        data: {
          comment: 'User message during off hours'
        },
        name: 'Add Comment #1',
        position: { x: 400, y: 750}
      }
    ])
  );
  
  const edges = ref([
    {
      id: 'e1-d09c08',
      source: '1',
      target: 'd09c08',
      type: 'button',
    },
    {
      id: 'd09c08-b0653a',
      type: 'button',
      source: 'd09c08',
      target: 'b0653a',
    },
    {
      id: 'd09c08-b6a0c1',
      type: 'button',
      source: 'd09c08',
      target: 'b6a0c1',
    },
    {
      id: 'b6a0c1-e879e4',
      type: 'button',
      source: 'b6a0c1',
      target: 'e879e4',
    },
  ]);

  const activeNode = ref()
  const setActiveNode = (nodeId: string) => {
    activeNode.value = nodeId;
  }


  return {
    nodes,
    edges,
    activeNode,
    setActiveNode,
  };
});