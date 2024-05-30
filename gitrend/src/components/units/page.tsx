import React, { useState, useEffect } from 'react';
import TrendingItems from './items';

export default function TrendingPage(): JSX.Element {
    // GitHub API로부터 트렌딩 레포지토리와 토픽 가져오기
    const [trendingRepos, setTrendingRepos] = useState([]);
    const [trendingLanguageTopics, setTrendingLanguageTopics] = useState([]);
    const [trendingFrameworkTopics, setTrendingFrameworkTopics] = useState([]);
    const [trendingLibraryTopics, setTrendingLibraryTopics] = useState([]);
    const [trendingAlgoTopics, setTrendingAlgoTopics] = useState([]);

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const today = new Date(); // 현재 날짜를 가져옴
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7); // 현재 날짜에서 7일을 뺌

                // 날짜를 YYYY-MM-DD 형식의 문자열로 변환
                const formattedDate = `${sevenDaysAgo.getFullYear()}-${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${sevenDaysAgo.getDate().toString().padStart(2, '0')}`;
                // GitHub API로부터 트렌딩 레포지토리 가져오기
                const repoResponse = await fetch(`https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc`);
                const repoData = await repoResponse.json();
                const repoNames = repoData.items.map((item: any) => item.full_name);
                setTrendingRepos(repoNames);

                // GitHub API로부터 트렌딩 토픽 가져오기
                const LanguageTopicResponse = await fetch('https://api.github.com/search/topics?q=language');
                const LanguageTopicData = await LanguageTopicResponse.json();
                const LanguageTopicNames = LanguageTopicData.items.map((item: any) => item.name);
                setTrendingLanguageTopics(LanguageTopicNames);

                const FrameworkTopicResponse = await fetch('https://api.github.com/search/topics?q=framework');
                const FrameworkTopicData = await FrameworkTopicResponse.json();
                const FrameworkTopicNames = FrameworkTopicData.items.map((item: any) => item.name);
                setTrendingFrameworkTopics(FrameworkTopicNames);

                const LibraryTopicResponse = await fetch('https://api.github.com/search/topics?q=library');
                const LibraryTopicData = await LibraryTopicResponse.json();
                const LibraryTopicNames = LibraryTopicData.items.map((item: any) => item.name);
                setTrendingLibraryTopics(LibraryTopicNames);

                const AlgotopicResponse = await fetch('https://api.github.com/search/topics?q=algorithm');
                const AlgotopicData = await AlgotopicResponse.json();
                const AlgotopicNames = AlgotopicData.items.map((item: any) => item.name);
                setTrendingAlgoTopics(AlgotopicNames);

            } catch (error) {
                console.error('Error fetching trending data:', error);
            }
        };

        fetchTrendingData();
    }, []);

    return (
        <div>
            <h1>Trending Repositories - 7 days</h1>
            <TrendingItems items={trendingRepos} type="repo" />
            <h1>Trending Language</h1>
            <TrendingItems items={trendingLanguageTopics} type="topic" />
            <h1>Trending Framework</h1>
            <TrendingItems items={trendingFrameworkTopics} type="topic" />
            <h1>Trending Library</h1>
            <TrendingItems items={trendingLibraryTopics} type="topic" />
            <h1>Trending Algorithm</h1>
            <TrendingItems items={trendingAlgoTopics} type="topic" />
        </div>
    );
};
