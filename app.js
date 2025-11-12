const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
  const results = [];
  fs.createReadStream(path.join(__dirname, 'data.tsv')).pipe(
    csv({ headers: ['datetime', 'value'], separator: '\t' })
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        res.status(500).send('Error processing CSV file.');
      })
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
