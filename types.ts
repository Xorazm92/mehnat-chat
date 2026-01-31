
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}

export enum AppTab {
  CHAT = 'chat',
  DOCS = 'docs',
  SETTINGS = 'settings',
  TELEGRAM = 'telegram'
}

export interface LawDocument {
  title: string;
  url: string;
  category: string;
}
