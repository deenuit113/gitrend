import React, { useState, useEffect } from 'react';

const TrendingButton = ({ name, type }) => {
  // 클릭 이벤트 핸들러
  const handleClick = () => {
    let githubUrl = '';
    if (type === 'repo') {
      // 해당 레포지토리에 대한 GitHub 페이지 URL
      githubUrl = `https://github.com/${name}`;
    } else if (type === 'topic') {
      // 해당 토픽에 대한 GitHub 페이지 URL
      githubUrl = `https://github.com/topics/${name}`;
    }
    // 새 탭에서 GitHub 페이지 열기
    window.open(githubUrl, '_blank');
  };

  return (
    <button onClick={handleClick}>{name}</button>
  );
};

const TrendingItems = ({ items, type }) => {
  return (
    <div>
      {items.map((item, index) => (
        <TrendingButton key={index} name={item} type={type} />
      ))}
    </div>
  );
};

const TrendingPage = () => {
  // GitHub API로부터 트렌딩 레포지토리와 토픽 가져오기
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [trendingFETopics, setTrendingFETopics] = useState([]);
  const [trendingBETopics, setTrendingBETopics] = useState([]);

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
        const repoNames = repoData.items.map(item => item.full_name);
        setTrendingRepos(repoNames);

        // GitHub API로부터 트렌딩 토픽 가져오기
        const FEtopicResponse = await fetch('https://api.github.com/search/topics?q=frontend');
        const FEtopicData = await FEtopicResponse.json();
        const FEtopicNames = FEtopicData.items.map(item => item.name);
        setTrendingFETopics(FEtopicNames);

        const BEtopicResponse = await fetch('https://api.github.com/search/topics?q=backend');
        const BEtopicData = await BEtopicResponse.json();
        const BEtopicNames = BEtopicData.items.map(item => item.name);
        setTrendingBETopics(BEtopicNames);

      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div>
      <h1>Trending Repositories</h1>
      <TrendingItems items={trendingRepos} type="repo" />
      <h1>Trending Frontend Topics</h1>
      <TrendingItems items={trendingFETopics} type="topic" />
      <h1>Trending Backend Topics</h1>
      <TrendingItems items={trendingBETopics} type="topic" />
    </div>
  );
};

export default TrendingPage;






