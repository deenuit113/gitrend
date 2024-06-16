import React, { useState } from 'react';
import TrendingButton from './button';
import * as S from './items.styles';

interface TrendingItemsProps {
    items: { name: string, type: 'repo' | 'topic' }[];
    setFocusedText: (text: string) => void;
    isTextAreaFocused: boolean;
    speechEnabled: boolean;
}

export default function TrendingItems({ items, setFocusedText, isTextAreaFocused, speechEnabled }: TrendingItemsProps): JSX.Element {
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [currentColIndex, setCurrentColIndex] = useState(0);

    const updateIndex = (newRowIndex: number, newColIndex: number) => {
        setCurrentRowIndex(newRowIndex);
        setCurrentColIndex(newColIndex);
        setFocusedText(items[newRowIndex * itemsPerRow + newColIndex].name);
    };

    const rows = [];
    const itemsPerRow = 10;

    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }

    const getNeighborLevel = (rowIndex: number, colIndex: number) => {
        const rowDiff = Math.abs(rowIndex - currentRowIndex);
        const colDiff = Math.abs(colIndex - currentColIndex);
        return Math.max(rowDiff, colDiff);
    };

    return (
        <div>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    {row.map((item, colIndex) => {
                        const isActive = rowIndex === currentRowIndex && colIndex === currentColIndex;
                        const neighborLevel = getNeighborLevel(rowIndex, colIndex);

                        return (
                            <TrendingButton
                                key={colIndex}
                                name={item.name}
                                type={item.type}
                                isActive={isActive}
                                neighborLevel={neighborLevel}
                                setCurrentIndex={updateIndex}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                rowsLength={rows.length}
                                colsLength={row.length}
                                speechEnabled={speechEnabled}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}