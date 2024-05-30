import React from 'react';
import TrendingButton from './button';

interface TrendingItemsProps {
    items: string[];
    type: 'repo' | 'topic';
}

export default function TrendingItems(props: TrendingItemsProps): JSX.Element {
    return (
        <div>
            {props.items.map((item, index) => (
                <TrendingButton key={index} name={item} type={props.type} />
            ))}
        </div>
    );
}