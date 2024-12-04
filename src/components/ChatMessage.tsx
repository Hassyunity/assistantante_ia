import React from 'react';
import { Message } from '../types/speech';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isSpeaking: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSpeaking }) => {
  const isBot = !message.isUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isBot ? 'bg-purple-600' : 'bg-blue-600'}`}>
        {isBot ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
      </div>
      
      <div className={`relative max-w-[80%] rounded-2xl p-4
        ${isBot ? 'bg-gray-800' : 'bg-gray-700'}`}>
        <p className="text-white">{message.text}</p>
        
        {isBot && isSpeaking && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute -right-2 -bottom-2 w-4 h-4 bg-purple-500 rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
};