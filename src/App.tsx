import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from './components/ChatMessage';
import { VoiceControls } from './components/VoiceControls';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { Message } from './types/speech';
import { intents } from './types/intents';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const { speak, isSpeaking } = useSpeechSynthesis();

  const handleNewMessage = useCallback((text: string) => {
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
  
    // Recherche dans les intentions
    const intent = intents.find((intent) => intent.pattern.test(text));
    const response =
      intent?.responses[Math.floor(Math.random() * intent.responses.length)] ||
      "Je suis désolé, je ne sais pas quoi répondre.";
  
    // Ajouter le message de l'IA
    setTimeout(() => {
      const aiMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      speak(response);
    }, 1000);
  }, [speak]);  

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleNewMessage);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      handleNewMessage(inputText);
      setInputText('');
    }
  };

  useEffect(() => {
    const welcomeMessage = "Bonjour !!!! Je suis 'Lunar Hope'(votre assistante virtuelle), Comment puis-je vous aider aujourd'hui ?";
    const aiMessage: Message = {
      text: welcomeMessage,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([aiMessage]);
    speak(welcomeMessage);
  }, [speak]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-green-400">
            Lunar Hope 😊
          </h1>

          <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isSpeaking={!message.isUser && isSpeaking}
              />
            ))}
          </div>

          <VoiceControls
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            inputText={inputText}
            onInputChange={(e) => setInputText(e.target.value)}
            onSendMessage={handleSendMessage}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;