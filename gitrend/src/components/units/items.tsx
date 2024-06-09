import React, { useState } from 'react';
import TrendingButton from './button';

interface TrendingItemsProps {
    items: { name: string, type: 'repo' | 'topic' }[];
}

export default function TrendingItems({ items }: TrendingItemsProps): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateIndex = (newIndex: number) => {
        if (newIndex < 0) {
            setCurrentIndex(items.length - 1);
        } else if (newIndex >= items.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div>
            {items.map((item, index) => (
                <TrendingButton
                    key={index}
                    name={item.name}
                    type={item.type}
                    isFirst={index === 0}
                    isLast={index === items.length - 1}
                    isActive={index === currentIndex}
                    setCurrentIndex={updateIndex}
                    index={index}
                    itemsLength={items.length}
                />
            ))}
        </div>
    );
}