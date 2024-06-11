import React, { useState, useEffect } from 'react';
import TrendingItems from './items';
import * as S from './page.styles';

export default function TrendingPage(): JSX.Element {
    const [trendingItems, setTrendingItems] = useState<{ name: string, type: 'repo' | 'topic' }[]>([]);

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                const formattedDate = `${sevenDaysAgo.getFullYear()}-${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${sevenDaysAgo.getDate().toString().padStart(2, '0')}`;

                const repoResponse = await fetch(`https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc`);
                const repoData = await repoResponse.json();
                const repoItems = repoData.items.map((item: any) => ({ name: item.full_name, type: 'repo' as const }));

                const languageTopicResponse = await fetch('https://api.github.com/search/topics?q=language');
                const languageTopicData = await languageTopicResponse.json();
                const languageTopicItems = languageTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const frameworkTopicResponse = await fetch('https://api.github.com/search/topics?q=framework');
                const frameworkTopicData = await frameworkTopicResponse.json();
                const frameworkTopicItems = frameworkTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const libraryTopicResponse = await fetch('https://api.github.com/search/topics?q=library');
                const libraryTopicData = await libraryTopicResponse.json();
                const libraryTopicItems = libraryTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                const algoTopicResponse = await fetch('https://api.github.com/search/topics?q=algorithm');
                const algoTopicData = await algoTopicResponse.json();
                const algoTopicItems = algoTopicData.items.map((item: any) => ({ name: item.name, type: 'topic' as const }));

                setTrendingItems([
                    ...repoItems,
                    ...languageTopicItems,
                    ...frameworkTopicItems,
                    ...libraryTopicItems,
                    ...algoTopicItems
                ]);

            } catch (error) {
                console.error('Error fetching trending data:', error);
            }
        };

        fetchTrendingData();
    }, []);

    return (
        <S.TrendingTopicContainer aria-label="github trending topics">
            <h1>Github Trending Topics</h1>
            <S.ScrollContainer>
                <TrendingItems items={trendingItems} />
            </S.ScrollContainer>
        </S.TrendingTopicContainer>
    );
}