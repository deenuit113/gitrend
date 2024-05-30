import React from 'react';
import TrendingButton from './button';

interface TrendingItemsProps {
    items: string[];
    type: 'repo' | 'topic';
    onNextFocus: () => void;
}

export default function TrendingItems({ items, type, onNextFocus }: TrendingItemsProps): JSX.Element {
    return (
        <div>
            {items.map((item, index) => (
                <TrendingButton
                    key={index}
                    name={item}
                    type={type}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                    onNextFocus={onNextFocus}
                />
            ))}
        </div>
    );
}