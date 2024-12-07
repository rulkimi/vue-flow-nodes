export interface NodeData {
  type?: string;
  oncePerContact?: boolean;
  timezone?: string;
  action?: string;
  payload?: Array<{ type: string; text?: string; attachment?: string }>;
  comment?: string;
}

export interface Node {
  id: string | number;
  type: string;
  data: NodeData;
  name?: string;
  position: { x: number; y: number };
  class?: string;
}