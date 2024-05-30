import React, { useState, useEffect } from 'react';
import TrendingItems from './items';

export default function TrendingPage(): JSX.Element {
    const [trendingRepos, setTrendingRepos] = useState([]);
    const [trendingLanguageTopics, setTrendingLanguageTopics] = useState([]);
    const [trendingFrameworkTopics, setTrendingFrameworkTopics] = useState([]);
    const [trendingLibraryTopics, setTrendingLibraryTopics] = useState([]);
    const [trendingAlgoTopics, setTrendingAlgoTopics] = useState([]);

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                const formattedDate = `${sevenDaysAgo.getFullYear()}-${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${sevenDaysAgo.getDate().toString().padStart(2, '0')}`;

                const repoResponse = await fetch(`https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc`);
                const repoData = await repoResponse.json();
                const repoNames = repoData.items.map((item: any) => item.full_name);
                setTrendingRepos(repoNames);

                const languageTopicResponse = await fetch('https://api.github.com/search/topics?q=language');
                const languageTopicData = await languageTopicResponse.json();
                const languageTopicNames = languageTopicData.items.map((item: any) => item.name);
                setTrendingLanguageTopics(languageTopicNames);

                const frameworkTopicResponse = await fetch('https://api.github.com/search/topics?q=framework');
                const frameworkTopicData = await frameworkTopicResponse.json();
                const frameworkTopicNames = frameworkTopicData.items.map((item: any) => item.name);
                setTrendingFrameworkTopics(frameworkTopicNames);

                const libraryTopicResponse = await fetch('https://api.github.com/search/topics?q=library');
                const libraryTopicData = await libraryTopicResponse.json();
                const libraryTopicNames = libraryTopicData.items.map((item: any) => item.name);
                setTrendingLibraryTopics(libraryTopicNames);

                const algoTopicResponse = await fetch('https://api.github.com/search/topics?q=algorithm');
                const algoTopicData = await algoTopicResponse.json();
                const algoTopicNames = algoTopicData.items.map((item: any) => item.name);
                setTrendingAlgoTopics(algoTopicNames);

            } catch (error) {
                console.error('Error fetching trending data:', error);
            }
        };

        fetchTrendingData();
    }, []);

    const handleNextFocus = () => {
        const trendingRepositoriesButton = document.querySelector('#trending-repositories-button') as HTMLButtonElement;
        if (trendingRepositoriesButton) {
            trendingRepositoriesButton.focus();
        }
    };

    return (
        <div>
            <h1>Trending Repositories - 7 days</h1>
            <TrendingItems items={trendingRepos} type="repo" onNextFocus={handleNextFocus} />
            <h1>Trending Language</h1>
            <TrendingItems items={trendingLanguageTopics} type="topic" onNextFocus={handleNextFocus} />
            <h1>Trending Framework</h1>
            <TrendingItems items={trendingFrameworkTopics} type="topic" onNextFocus={handleNextFocus} />
            <h1>Trending Library</h1>
            <TrendingItems items={trendingLibraryTopics} type="topic" onNextFocus={handleNextFocus} />
            <h1>Trending Algorithm</h1>
            <TrendingItems items={trendingAlgoTopics} type="topic" onNextFocus={handleNextFocus} />
        </div>
    );
}