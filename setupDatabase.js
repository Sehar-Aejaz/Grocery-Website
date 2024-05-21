const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, subcategory TEXT, name TEXT, price REAL, description TEXT)");

    const stmt = db.prepare("INSERT INTO products (category, subcategory, name, price, description) VALUES (?, ?, ?, ?, ?)");

    // Fruits & Vegetables
    stmt.run("Fruits & Vegetables", "Fresh Fruits", "Apple", 1.2, "Fresh red apples");
    stmt.run("Fruits & Vegetables", "Fresh Fruits", "Banana", 0.5, "Ripe yellow bananas");
    stmt.run("Fruits & Vegetables", "Fresh Vegetables", "Carrot", 0.8, "Organic carrots");
    stmt.run("Fruits & Vegetables", "Fresh Vegetables", "Broccoli", 1.5, "Fresh green broccoli");
    stmt.run("Fruits & Vegetables", "Organic Produce", "Organic Spinach", 2.0, "Fresh organic spinach");

    // Meat, Poultry & Seafood
    stmt.run("Meat, Poultry & Seafood", "Beef", "Ground Beef", 5.0, "Lean ground beef");
    stmt.run("Meat, Poultry & Seafood", "Chicken", "Chicken Breast", 4.0, "Boneless chicken breast");
    stmt.run("Meat, Poultry & Seafood", "Seafood", "Salmon Fillet", 7.0, "Fresh salmon fillet");
    stmt.run("Meat, Poultry & Seafood", "Seafood", "Shrimp", 10.0, "Fresh shrimp");

    // Dairy Products
    stmt.run("Dairy Products", "Milk", "Whole Milk", 3.0, "Fresh whole milk");
    stmt.run("Dairy Products", "Cheese", "Cheddar Cheese", 4.5, "Sharp cheddar cheese");
    stmt.run("Dairy Products", "Yogurt", "Greek Yogurt", 2.5, "Plain Greek yogurt");

    // Grains & Pasta
    stmt.run("Grains & Pasta", "Rice", "Basmati Rice", 2.0, "Long-grain basmati rice");
    stmt.run("Grains & Pasta", "Pasta", "Spaghetti", 1.5, "Classic spaghetti pasta");
    stmt.run("Grains & Pasta", "Bread", "Whole Wheat Bread", 3.0, "Fresh whole wheat bread");

    // Canned & Packaged Food
    stmt.run("Canned & Packaged Food", "Canned Soups", "Chicken Noodle Soup", 2.5, "Canned chicken noodle soup");
    stmt.run("Canned & Packaged Food", "Canned Vegetables", "Green Beans", 1.0, "Canned green beans");
    stmt.run("Canned & Packaged Food", "Instant Meals", "Mac and Cheese", 3.0, "Instant mac and cheese");

    // Snacks & Beverages
    stmt.run("Snacks & Beverages", "Chips", "Potato Chips", 2.0, "Crunchy potato chips");
    stmt.run("Snacks & Beverages", "Soft Drinks", "Cola", 1.5, "Classic cola soft drink");
    stmt.run("Snacks & Beverages", "Energy Drinks", "Energy Drink", 2.5, "Revitalizing energy drink");

    stmt.finalize();
});

db.close();


// Export the database object to be used in other files
module.exports = db;




    
