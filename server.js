const express = require('express');
const cors = require('cors');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// GET /questions - Fetch all questions
app.get('/questions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// POST /questions - Add a new question
app.post('/questions', async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, correct } = req.body;

    const { data, error } = await supabase
      .from('questions')
      .insert([
        { question, option1, option2, option3, option4, correct }
      ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Question added successfully', data });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});