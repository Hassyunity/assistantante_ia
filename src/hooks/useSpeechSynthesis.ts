import { useState, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('La synthèse vocale n\'est pas supportée par votre navigateur');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.voice = speechSynthesis.getVoices().find(voice => 
      voice.lang.includes('fr') && voice.name.includes('female')
    ) || null;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, []);

  return { speak, isSpeaking };
};