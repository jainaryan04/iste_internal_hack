import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from "axios"

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;


const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM foodconnect');
        res.json(result.rows);
    } catch (err) {
        console.error('Query error', err.stack);
        res.status(500).send({ message: 'Server error' });
    }
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: "Email already exists. Try logging in" });
      } else {
        const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        return res.status(201).json({ message: "Registration successful", email });
      }
    } catch (err) {
      console.error('Registration error', err.stack);
      return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/items', async (req, res) => {
  const { item_name, dept, listed_by, price } = req.body;

  try {
    await db.query(
      'INSERT INTO items (item_name, dept, listed_by, price) VALUES ($1, $2, $3, $4)',
      [item_name, dept, listed_by, price]
    );
    res.status(201).json({ message: 'Item added successfully' });
  } catch (err) {
    console.error('Error adding item:', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/items/:username', async (req, res) => {
  const username = req.params.username; 

  try {
    const result = await db.query('SELECT * FROM foodconnect WHERE listed_by = $1', [username]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});





app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      const role = user.role;

      if (password === storedPassword) {
        return res.status(200).json({ message: "Login successful", email, role });
      } else {
        return res.status(401).json({ message: "Incorrect password. Try again" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error('Login error', err.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
