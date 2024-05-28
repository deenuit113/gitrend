// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto('https://github.com/topics');
  
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const TopicList = $("body > div.logged-out.env-production.page-responsive > div.application-main > main > div.d-lg-flex.container-lg.p-responsive > div.col-lg-3 > ul > li");
  // 모든 리스트를 순환한다.
  const TopicNameList = [];
  TopicList.each((index, list) => {
    const name = $(list).find("a").text().trim();
    TopicNameList.push(`/topics/${name}`);

    //console.log({index, name});
  });

  console.log(TopicNameList);

  browser.close();
  
  module.exports = TopicNameList;
})();

