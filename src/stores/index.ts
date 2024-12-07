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
        id: '2',
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
        id: '4',
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
        id: '3',
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
        id: '5',
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
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'button',
    },
    {
      id: 'e2-3',
      type: 'button',
      source: '2',
      target: '3',
    },
    {
      id: 'e2-4',
      type: 'button',
      source: '2',
      target: '4',
    },
    {
      id: 'e4-5',
      type: 'button',
      source: '4',
      target: '5',
    },
  ]);


  return {
    nodes,
    edges,
  };
});