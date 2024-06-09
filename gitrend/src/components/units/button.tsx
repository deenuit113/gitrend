import React, { useRef, useEffect } from 'react';

interface TrendingButtonProps {
    name: string;
    type: 'repo' | 'topic';
    isFirst: boolean;
    isLast: boolean;
    isActive: boolean;
    setCurrentIndex: (index: number) => void;
    index: number;
    itemsLength: number;
}

export default function TrendingButton({ name, type, isFirst, isLast, isActive, setCurrentIndex, index, itemsLength }: TrendingButtonProps): JSX.Element {
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
            setCurrentIndex(isLast ? 0 : index + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            setCurrentIndex(isFirst ? itemsLength - 1 : index - 1);
        }
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            style={{ border: isActive ? '2px solid red' : 'none' }}
        >
            {name}
        </button>
    );
}