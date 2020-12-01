const connection = require('./config');
const express = require('express');
const movies = require('./movies');
const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to my favorite movie list');
});

app.get('/api/movies', (req, res) => {
  connection.query('SELECT * from movies', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/movies/:id', (req, res) => {
  connection.query(
    'SELECT * from movies WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data');
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get('/api/search', (req, res) => {
  connection.query(
    `SELECT * from movies WHERE duration <= ?`,
    [req.query.durationMax],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving data');
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.get('/api/user', (req, res) => {
  res.status(401).send('Unauthorized');
});

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
