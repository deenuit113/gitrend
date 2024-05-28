import React, { useEffect, useState } from 'react';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const RepoNameList: React.FC = () => {
  const [repoNames, setRepoNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchRepoNames = async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://github.com/trending');

      const content = await page.content();
      const $ = cheerio.load(content);
      const articles = $('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) article');

      const names: string[] = [];
      articles.each((index, article) => {
        const articleHrefs = $(article).find('h2 a').map((i, a) => $(a).attr('href')).get();
        names.push(...articleHrefs);
      });

      setRepoNames(names);
      browser.close();
    };

    fetchRepoNames();
  }, []);

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repoNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepoNameList;