import React, { useRef, useEffect } from 'react';

interface TrendingButtonProps {
    name: string;
    type: 'repo' | 'topic';
    isFirst: boolean;
    isLast: boolean;
    onNextFocus: () => void;
}

export default function TrendingButton({ name, type, isFirst, isLast, onNextFocus }: TrendingButtonProps): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isFirst) {
            buttonRef.current?.focus();
        }
    }, [isFirst]);

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
            if (buttonRef.current && buttonRef.current.nextElementSibling) {
                (buttonRef.current.nextElementSibling as HTMLElement).focus();
            } else {
                onNextFocus(); // 다음 포커스로 이동
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (buttonRef.current && buttonRef.current.previousElementSibling) {
                (buttonRef.current.previousElementSibling as HTMLElement).focus();
            } else {
                onNextFocus(); // 다음 포커스로 이동
            }
        }
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            id={isLast ? 'trending-repositories-button' : ''}
        >
            {name}
        </button>
    );
}