const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // res.send('Hello World! This is my small Express site.');
});

app.get('/data', (req, res) => {
  const results = [];
  fs.createReadStream(path.join(__dirname, 'data.csv'))
    .pipe(csv())
    .on('data', (data) =>  results.push(data))
    .on('end', () => {
        res.json(results);
    })
    .on('error', (error) => {
        console.error('Error reading CSV:', error);
        res.status(500).send('Error processing CSV file.');
    });
});

app.get('/data/data.csv', (req, res) => {
  // Fetch data from database or other source
  // const data = [
  //   { date: '10/26/2025', time: '11:42', value: 8.5 },
  //   { date: '10/26/2025', time: '11:52', value: 7.5 },
  //   { date: '10/26/2025', time: '12:05', value: 6.5 },
  //   { date: '10/27/2025', time: '11:42', value: 8.2 },
  //   { date: '10/27/2025', time: '11:52', value: 7.2 },
  //   { date: '10/27/2025', time: '12:10', value: 5.8 },
   
  // ];
  res.download(path.join(__dirname, 'data', 'data.csv'));
  // res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});