export interface NodeData {
  type?: string;
  oncePerContact?: boolean;
  timezone?: string;
  action?: string;
  payload?: Array<{ type: string; text?: string; attachment?: string }>;
  comment?: string;
  name?: string
  times?: Array<{ startTime: string, endTime: string, day: string}>
  description?: string
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

export type TextPayload = { id: string, type: 'text'; text: string };
export type AttachmentPayload = { id: string, type: 'attachment'; attachment: File | string };