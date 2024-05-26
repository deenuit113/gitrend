import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTrendingRepos, fetchTrendingTopics } from '../../lib/scraper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const repos = await fetchTrendingRepos();
    const topics = await fetchTrendingTopics();

    // Ensure repos and topics are defined before processing
    if (repos && topics) {
      const repoWords = repos.slice(0, 5).map(repo => ({ text: repo.full_name, value: repo.stargazers_count }));
      const topicWords = topics.slice(0, 5).map(topic => ({ text: topic.name, value: topic.stargazers_count }));
      res.status(200).json({ repos: repoWords, topics: topicWords });
    } else {
      res.status(500).json({ message: 'Failed to fetch data from GitHub' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};