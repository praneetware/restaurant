const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // ✅ Import mysql2

const app = express();
const PORT = 3000;

// ✅ Enable JSON request body parsing
app.use(express.json());

// ✅ MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // ⚠️ Replace if you use a different MySQL user
  password: 'Boojho@123',           // ⚠️ Add password if your MySQL needs it
  database: 'restaurant_db'  // ⚠️ Ensure this DB and table `ingredients` exists
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

// ✅ Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Basic test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// ✅ Restock route
app.post('/api/restock', (req, res) => {
  const { name, amount } = req.body;

  if (!name || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  db.query(
    'UPDATE inventory SET quantity = quantity + ? WHERE ingredient = ?',
    [amount, name],
    (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      res.json({ message: 'Restocked successfully' });
    }
  );
});

app.get('/api/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      console.error('Failed to fetch inventory:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
