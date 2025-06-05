import React, { useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '../animations/Main_Scene.json';

interface RobotFaceLottieProps {
  isSpeaking: boolean;
}

export const RobotFaceLottie: React.FC<RobotFaceLottieProps> = ({ isSpeaking }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (isSpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [isSpeaking]);

  return (
    <div className="flex justify-center mb-8">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={false} // Ne démarre pas automatiquement
        style={{ width: 256, height: 256 }}
      />
    </div>
  );
};
