export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface SpeechState {
  isListening: boolean;
  isSpeaking: boolean;
}