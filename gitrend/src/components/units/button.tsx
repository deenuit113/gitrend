import React, { useRef, useEffect } from 'react';
import * as S from './button.styles';

interface TrendingButtonProps {
    name: string;
    type: 'repo' | 'topic';
    isActive: boolean;
    neighborLevel: number;
    setCurrentIndex: (rowIndex: number, colIndex: number) => void;
    rowIndex: number;
    colIndex: number;
    rowsLength: number;
    colsLength: number;
    speechEnabled: boolean;
}

let speechTimeout: NodeJS.Timeout;

export default function TrendingButton({
    name,
    type,
    isActive,
    neighborLevel,
    setCurrentIndex,
    rowIndex,
    colIndex,
    rowsLength,
    colsLength,
    speechEnabled,
}: TrendingButtonProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isActive) {
            buttonRef.current?.focus();
            if (speechEnabled) {
                clearTimeout(speechTimeout);
                speechTimeout = setTimeout(() => speak(name), 500); // 0.5초 딜레이
            }
        }
    }, [isActive, name, speechEnabled]);

    const handleClick = () => {
        let githubUrl = '';
        if (type === 'repo') {
            githubUrl = `https://github.com/${name}`;
        } else if (type === 'topic') {
            githubUrl = `https://github.com/topics/${name}`;
        }
        window.open(githubUrl, '_blank');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            setCurrentIndex(rowIndex, (colIndex + 1) % colsLength);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setCurrentIndex(rowIndex, (colIndex - 1 + colsLength) % colsLength);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCurrentIndex((rowIndex + 1) % rowsLength, colIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCurrentIndex((rowIndex - 1 + rowsLength) % rowsLength, colIndex);
        }
    };

    const handleMouseEnter = () => {
        setCurrentIndex(rowIndex, colIndex);
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    return (
        <S.TrendingButton
            isActive={isActive}
            neighborLevel={neighborLevel}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            aria-label= "해당 주제 관련 사이트로 이동하는 버튼"
        >
            {truncateText(name, 20)}
        </S.TrendingButton>
    );
}