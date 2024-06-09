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
            {items.map((item, index) => {
                const isActive = index === currentIndex;
                const isNeighbor1 = index === (currentIndex + 1) % items.length || index === (currentIndex - 1 + items.length) % items.length;
                const isNeighbor2 = index === (currentIndex + 2) % items.length || index === (currentIndex - 2 + items.length) % items.length;

                return (
                    <TrendingButton
                        key={index}
                        name={item.name}
                        type={item.type}
                        isActive={isActive}
                        isNeighbor1={isNeighbor1}
                        isNeighbor2={isNeighbor2}
                        setCurrentIndex={updateIndex}
                        index={index}
                        itemsLength={items.length}
                    />
                );
            })}
        </div>
    );
}