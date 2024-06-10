import React, { useState, useEffect } from 'react';
import TrendingButton from './button';
import * as S from './items.styles';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

interface TrendingItemsProps {
    items: { name: string, type: 'repo' | 'topic' }[];
}

export default function TrendingItems({ items }: TrendingItemsProps): JSX.Element {
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [currentColIndex, setCurrentColIndex] = useState(0);
    const [speechEnabled, setSpeechEnabled] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'm') {
                setSpeechEnabled(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const updateIndex = (newRowIndex: number, newColIndex: number) => {
        setCurrentRowIndex(newRowIndex);
        setCurrentColIndex(newColIndex);
    };

    // 2차원 배열로 변환 (예: 10개씩 한 행에 배치)
    const rows = [];
    const itemsPerRow = 10; // 각 행에 10개씩 배치

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
            <S.ToggleContainer>
                <Switch
                    onChange={() => setSpeechEnabled(prev => !prev)}
                    checked={speechEnabled}
                    offColor="#888"
                    onColor="#0d6efd"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={30}
                    width={50}
                />
                <FontAwesomeIcon icon={faBullhorn} style={{ marginLeft: '10px', color: speechEnabled ? '#0d6efd' : '#888' }} />
            </S.ToggleContainer>
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