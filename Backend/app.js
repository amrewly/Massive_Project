const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./db');
const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Read CSV file and insert data into database
fs.createReadStream('mahasiswa.csv')
  .pipe(
    csv({
      separator: ';',
    })
  )
  .on('data', (row) => {
    console.log('Importing data:', row);
    // Check if 'NIM' value is not null or undefined
    if (row.NIM) {
      // Insert data into database with plain password
      mysqlConnection.query('INSERT INTO pemilih (nim, nama, prodi, password) VALUES (?, ?, ?, ?)', [row.NIM, row.NAMA, row.PRODI, row.NIM], (error, results, fields) => {
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', results);
        }
      });
    } else {
      console.warn('Skipped a row with NULL NIM value');
    }
  })
  .on('end', () => {
    console.log('Data import completed');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API endpoint for login
app.post('/login', (req, res) => {
  const { nim, password } = req.body;

  // Fetch user data from the database based on the provided nim
  mysqlConnection.query('SELECT * FROM pemilih WHERE nim = ?', [nim], (error, results, fields) => {
    if (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Check if the user exists
      if (results.length > 0) {
        const user = results[0];

        // Compare the provided password with the plain password in the database
        if (password === user.password) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Incorrect password');
        }
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});
