import React, { useEffect, useState } from 'react';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const TopicNameList: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://github.com/topics');

      const content = await page.content();
      const $ = cheerio.load(content);
      const topicList = $("body > div.logged-out.env-production.page-responsive > div.application-main > main > div.d-lg-flex.container-lg.p-responsive > div.col-lg-3 > ul > li");

      const names: string[] = [];
      topicList.each((index, list) => {
        const name = $(list).find("a").text().trim();
        names.push(`/topics/${name}`);
      });

      setTopics(names);
      browser.close();
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicNameList;