import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchTrendingRepos = async () => {
  const response = await axios.get(`${GITHUB_API_URL}/search/repositories?q=stars:>1&sort=stars`);
  return response.data.items;
};