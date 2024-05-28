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
  await page.goto('https://github.com/trending/developers');

  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const articles = $('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2)');

    // 각 article 태그 안의 a 태그의 href 속성을 가져와서 리스트에 추가한다.
    const DeveloperNameList = [];
    articles.each((index, article) => {
        const articleHrefs = $(article).find("h1.h3.lh-condensed a").map((i, a) => $(a).attr('href')).get();
        DeveloperNameList.push(...articleHrefs);
    });

    // href 속성들을 출력한다.
    console.log(DeveloperNameList);

    browser.close();

    module.exports = DeveloperNameList;

})();