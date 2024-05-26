import React, { useEffect, useState } from 'react';

interface Word {
  text: string;
}

interface WordCloudProps {
  words: Word[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const [randomOrder, setRandomOrder] = useState<number[]>([]);

  useEffect(() => {
    // 1부터 50까지의 숫자를 무작위로 배열합니다.
    const randomNumbers = Array.from({ length: 50 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setRandomOrder(randomNumbers);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {randomOrder.map((number, index) => (
        <button key={index}>{number}</button>
      ))}
    </div>
  );
};

export default WordCloud;