
export type ThemeMode = 'light' | 'dark' | 'system';

export type MessageType = 'ai' | 'user' | 'system';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  isProcessing?: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  category?: string;
}

export interface User {
  name: string;
  avatarUrl: string;
  isPremium: boolean;
}
