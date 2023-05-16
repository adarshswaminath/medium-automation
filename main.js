const puppeteer = require('puppeteer');

async function increaseReadingTime() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Array of user agents
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/85.0',
  ];

  // Array of Medium writeup URLs
  const mediumUrls = [
    'https://aureliasilva.medium.com/do-you-want-to-be-happy-do-not-be-patient-a4096b7e3aaa',
    'https://medium.com/illumination/why-do-you-need-the-approval-of-others-38d277e029d',
    'https://medium.com/illumination/hand-picked-articles-2023-34-9be5c39fae8',
    'https://aureliasilva.medium.com/do-you-want-to-be-happy-do-not-be-patient-a4096b7e3aaa',

  ];

  for (const url of mediumUrls) {
    // Generate a random user agent
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    // Set a random user agent to simulate a real browser
    await page.setUserAgent(randomUserAgent);

    // Navigate to the Medium writeup URL
    await page.goto(url);

    // Wait for 5 minutes
    // await page.waitForTimeout(5 * 60 * 1000);

    // Auto-scroll the page
    await page.evaluate(async () => {
      // Scroll down to the bottom
      await new Promise((resolve) => {
        const scrollHeight = document.documentElement.scrollHeight;
        const distance = 100;
        const intervalTime = 700; // Delay between each scroll (in milliseconds)
        let scrollOffset = 0;

        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          scrollOffset += distance;

          if (scrollOffset >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, intervalTime);
      });

      // Wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Scroll up to the top
      await new Promise((resolve) => {
        let totalHeight = document.documentElement.scrollHeight;
        const distance = -100;
        const intervalTime = 900; // Delay between each scroll (in milliseconds)

        const timer = setInterval(() => {
          if (window.scrollY === 0) {
            clearInterval(timer);
            resolve();
          } else {
            window.scrollBy(0, distance);
            totalHeight += distance;
          }
        }, intervalTime);
      });
    });

    // Wait for a few seconds before navigating to the next URL
    await page.waitForTimeout(2000);
  }

  // Close the browser
  await browser.close();
 console.log('Reading time increased successfully!');
}

increaseReadingTime();
