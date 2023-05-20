const fs = require('fs');
const readline = require('readline');

async function readFileToArray(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const lines = [];
  for await (const line of rl) {
    // Add each line to the array
    lines.push(line);
  }

  return lines;
}

// Example usage
const filePath = 'urls.txt';
readFileToArray(filePath)
  .then(lines => {
    console.log('File content:');
    console.log(lines);
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });
