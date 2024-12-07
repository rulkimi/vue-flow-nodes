export interface NodeData {
  type?: string;
  oncePerContact?: boolean;
  timezone?: string;
  action?: string;
  payload?: Array<{ type: string; text?: string; attachment?: string }>;
  comment?: string;
  name?: string
}

export interface Node {
  id: string;
  type: string;
  data: NodeData;
  name?: string;
  position: { x: number; y: number };
  class?: string;
  parentId?: string | number;
  draggable?: boolean
}