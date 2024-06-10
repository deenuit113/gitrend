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
}

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
}: TrendingButtonProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isActive) {
            buttonRef.current?.focus();
        }
    }, [isActive]);

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

    return (
        <S.TrendingButton
            isActive={isActive}
            neighborLevel={neighborLevel}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {name}
        </S.TrendingButton>
    );
}