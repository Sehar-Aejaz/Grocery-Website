const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a path to the database file in the 'server' folder
const dbPath = path.join(__dirname, 'database.sqlite');

// Open the database (it will be created if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database created and opened successfully.');
    }
});


// Create the table with the specified schema
const createTableQuery = `
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    number INT,
    feedback TEXT
);
`;

db.serialize(() => {
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created successfully.');
        }
    });
});

// Export the database object to be used in other files
module.exports = db;




    
