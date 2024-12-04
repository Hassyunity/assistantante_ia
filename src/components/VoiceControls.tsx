import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  inputText: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  inputText,
  onInputChange,
  onSendMessage,
}) => {
  return (
    <div className="flex items-center gap-4 w-full max-w-3xl mx-auto p-4 bg-gray-800 rounded-xl">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isListening ? onStopListening : onStartListening}
        className={`p-3 rounded-full ${
          isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-black-600 hover:bg-purple-700'
        }`}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <input
        type="text"
        value={inputText}
        onChange={onInputChange}
        placeholder="Écrivez votre message..."
        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onSendMessage}
        className="p-3 bg-green-400 rounded-full hover:bg-purple-700"
      >
        <Send className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};