import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
// import { ChatMessage } from './components/ChatMessage';  // plus besoin
import { VoiceControls } from './components/VoiceControls';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { Message } from './types/speech';
import { intents } from './types/intents';
import { RobotFaceLottie } from './components/RobotFaceLottie';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const { speak, isSpeaking } = useSpeechSynthesis();

  // ✅ Fonction asynchrone pour gérer les messages
  const handleNewMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const intent = intents.find((intent) => intent.pattern.test(text));
    let responseText: string;

    if (intent) {
      const chosenResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];

      if (typeof chosenResponse === 'function') {
        const result = chosenResponse(text);
        responseText = result instanceof Promise ? await result : result;
      } else {
        responseText = chosenResponse;
      }
    } else {
      responseText = `Je ne peux pas répondre à "${text}", mais dans une version complète, je serais connectée à une vraie API d'IA.`;
    }

    setTimeout(() => {
      const aiMessage: Message = {
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      speak(responseText);

      const messageJSON = JSON.stringify({
        userMessage: userMessage,
        aiMessage: aiMessage,
      });
      console.log("Message en format JSON:", messageJSON);
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
    const welcomeMessage = "Bonjour !!!! Je suis 'Hmax'(votre assistante virtuelle), Comment puis-je vous aider?";
    const aiMessage: Message = {
      text: welcomeMessage,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([aiMessage]);
    speak(welcomeMessage);

    const welcomeMessageJSON = JSON.stringify({
      aiMessage: aiMessage,
    });
    console.log("Message d'accueil en format JSON:", welcomeMessageJSON);
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
            Hmax 😊
          </h1>

          <RobotFaceLottie isSpeaking={isSpeaking} />

          {/* Suppression de l'affichage des messages */}
          {/* <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isSpeaking={!message.isUser && isSpeaking}
              />
            ))}
          </div> */}

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
