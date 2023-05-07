const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
  console.log('Received POST request at /api');
  const { timeTaken, errorCount } = req.body;

  let learningStrategy = 'interactive';
  if (timeTaken > 10 && errorCount > 3) {
    learningStrategy = 'visual';
  }

  console.log(req.body); // moved inside post endpoint
  res.json({ learningStrategy });
});

// Add this simple GET route
app.get('/api', (req, res) => {
  res.json({ message: 'Test route is working' });
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
