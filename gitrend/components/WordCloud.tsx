import React, { useEffect, useRef } from 'react';

interface Word {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: Word[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadWordCloud = async () => {
      if (typeof window !== 'undefined') {
        const wordcloud = (await import('wordcloud')).default;
        const canvas = canvasRef.current;
        if (canvas) {
          const wordList = words.map(word => [word.text, word.value]);

          wordcloud(canvas, {
            list: wordList,
            gridSize: Math.round(16 * window.devicePixelRatio),
            weightFactor: 2,
            fontFamily: 'Times, serif',
            color: 'random-dark',
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#f0f0f0',
          });
        }
      }
    };

    loadWordCloud();
  }, [words]);

  return <canvas ref={canvasRef} width={800} height={400} />;
};

export default WordCloud;