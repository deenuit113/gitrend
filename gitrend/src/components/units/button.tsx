import React, { useRef, useEffect } from 'react';
import * as S from "./button.styles"

interface TrendingButtonProps {
    name: string;
    type: 'repo' | 'topic';
    isActive: boolean;
    isNeighbor1: boolean;
    isNeighbor2: boolean;
    setCurrentIndex: (index: number) => void;
    index: number;
    itemsLength: number;
}

export default function TrendingButton({ name, type, isActive, isNeighbor1, isNeighbor2, setCurrentIndex, index, itemsLength }: TrendingButtonProps): JSX.Element {
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
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            setCurrentIndex(index === itemsLength - 1 ? 0 : index + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setCurrentIndex(index === 0 ? itemsLength - 1 : index - 1);
        }
    };

    return (
        <S.TrendingButton
            isActive={isActive}
            isNeighbor1={isNeighbor1}
            isNeighbor2={isNeighbor2}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {name}
        </S.TrendingButton>
    );
}