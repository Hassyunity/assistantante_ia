import React from 'react';
import { motion } from 'framer-motion';

interface RobotFaceProps {
  isSpeaking: boolean;
}

export const RobotFace: React.FC<RobotFaceProps> = ({ isSpeaking }) => {
  return (
    <div className="flex justify-center mb-8">
      <motion.img
        key={isSpeaking ? 'open' : 'closed'}
        src={isSpeaking ? '/robot.jpeg' : '/robot.jpg'} // ← à adapter avec tes fichiers
        alt="Robot face"
        className="w-64 h-auto transition-all duration-300"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
      />
    </div>
  );
};
