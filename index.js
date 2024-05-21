const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public_html'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('/home', (req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/offers', (req, res) => {
    res.render('offers', { title: 'Offers'});
});
app.get('/products', (req, res) => {
    res.render('products', { title: 'Products'});
});
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', errors: [], data: {} });
});
app.get('/search', (req, res) => {
    res.render('search');
});

const db = require('./createDB'); 
const db1 = new sqlite3.Database('./database.db'); 

app.post('/feedback', async (req, res) => {
    const { name, email, number, feedback } = req.body;
    // Check for missing data types
    if (!name) {
        return res.render('missing', { title: 'Name' });
    }
    if (!email) {
        return res.render('missing', { title: 'Email' });
    }

    if (!number) {
        return res.render('missing', { title: 'Number' });
    }
    if (!feedback) {
        return res.render('missing', { title: 'Feedback' });
    }
    if (!isValidEmail(email)) {
        return res.render('incorrectFormat', { title: 'Email' });
    }
    if (!isValidNumber(number)) {
        return res.render('incorrectFormat', { title: 'Number' });
    }
    const hashedNumber = await bcrypt.hash(number, 10);

    const insertQuery = `INSERT INTO feedback (name, email, number, feedback) VALUES (?, ?, ?, ?)`;

    db.run(insertQuery, [name, email, hashedNumber, feedback], function(err) {
        if (err) {
            res.status(500).send('Error saving feedback');
        } else {
            res.render('thankyou', { title: 'Feedback', name, email, hashedNumber, feedback });
        }
    });
});


/*
// Route to handle search request
app.post('/search', (req, res) => {
    const searchTerm = req.body.searchType;
    const query = "SELECT * FROM products WHERE name LIKE ?";
    db1.all(query, [`%${searchTerm}%`], (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.render('search', { title: 'Search Results', products: rows });
    });
});*/
app.post('/search', (req, res) => {
    const searchType = req.body.searchType;
    const query = `SELECT * FROM products WHERE subcategory LIKE ?`;

    // Logging the search type for debugging
    console.log(`Search Type: ${searchType}`);

    db1.all(query, [`%${searchType}%`], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Error searching database');
        } else {
            // Logging the number of rows found
            console.log(`Number of products found: ${rows.length}`);
            console.log(rows); // Log the rows for debugging
            res.render('search', { title: 'Search Results', products: rows });
        }
    });
});




// Route to handle GET request for feedback
app.get('/feedback', (req, res) => {
  const selectQuery = `SELECT * FROM feedback`;

  db.all(selectQuery, [], (err, rows) => {
      if (err) {
          res.status(500).send('Error retrieving feedback');
      } else {
          res.render('feedback_list', { title: 'Feedback List', feedbacks: rows });
      }
  });
});

///
function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidNumber(number) {
    // Regular expression to validate number format (10 digits)
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
}
///

// Error handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('404 - Resource Not Found');
});

// Error handler for 500 - Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




    
