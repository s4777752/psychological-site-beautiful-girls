export interface Message {
  id: string;
  text: string;
  sender: 'client' | 'psychologist';
  timestamp: Date;
  read: boolean;
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
  voice?: {
    url: string;
    duration: number;
  };
}

export interface ChatInterfaceProps {
  userType: 'client' | 'psychologist';
  recipientName: string;
  recipientAvatar?: string;
}