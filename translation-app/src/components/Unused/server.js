// server.js
const express = require('express');
const translate = require('@vitalets/google-translate-api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  try {
    const result = await translate(text, { to: targetLanguage });
    res.json({ translation: result.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

