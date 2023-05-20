const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');


// Array of Medium writeup URLs 
const mediumUrls = [];

// function to read url from file
async function readFileToArray(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const lines = [];
  for await (const line of rl) {
    // Add each line to the array
     mediumUrls.push(line);
  }

  return lines;
}

// read the file
const filePath = 'urls.txt';
readFileToArray(filePath)
  .then(mediumUrls => {
    // console.log('File content:');
    // console.log(mediumUrls);
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });


async function increaseReadingTime() {
  // const browser = await puppeteer.launch({ headless: false });
   const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Array of user agents
 const userAgents = [
   // Windows Chrome
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
 
   // Windows Firefox
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0',
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0',
 
   // macOS Chrome
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
 
   // macOS Firefox
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:89.0) Gecko/20100101 Firefox/89.0',
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:88.0) Gecko/20100101 Firefox/88.0',
   'Mozilla/5.0 (Macintosh; Intel Mac OS X 11.5; rv:87.0) Gecko/20100101 Firefox/87.0'
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
        const intervalTime = 750; // Delay between each scroll (in milliseconds)
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
        const intervalTime = 750; // Delay between each scroll (in milliseconds)

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
