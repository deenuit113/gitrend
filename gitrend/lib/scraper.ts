import puppeteer from 'puppeteer';

export const fetchTrendingRepos = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/trending');

  const repos = await page.evaluate(() => {
    const repoElements = document.querySelectorAll('article.Box-row');
    const repoList = [];

    repoElements.forEach(repo => {
      const title = repo.querySelector('h1.h3 a').textContent.trim();
      const stars = repo.querySelector('.octicon-star + span').textContent.trim();
      repoList.push({ full_name: title, stargazers_count: parseInt(stars.replace(/,/g, ''), 10) });
    });

    return repoList;
  });

  await browser.close();
  return repos;
};

export const fetchTrendingTopics = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/topics');

  const topics = await page.evaluate(() => {
    const topicElements = document.querySelectorAll('div.col-12.col-sm-6.col-md-4.mb-4');
    const topicList = [];

    topicElements.forEach(topic => {
      const name = topic.querySelector('p.f3').textContent.trim();
      const stars = topic.querySelector('a.d-flex.no-underline').textContent.trim();
      topicList.push({ name: name, stargazers_count: parseInt(stars.replace(/,/g, ''), 10) });
    });

    return topicList;
  });

  await browser.close();
  return topics;
};