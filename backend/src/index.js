import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// API to Get Clothing Size
app.post('/get-size', async (req, res) => {
    const { height, weight } = req.body;
  
    if (!height || !weight) {
      return res.status(400).json({ error: 'Please provide height and weight' });
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system',  content: `You are a clothing size assistant for India. Use Indian size charts for brands like Allen Solly, Peter England, and FabIndia.
            Always return only one size (XS, S, M, L, XL, XXL) without explanation.` },
          { role: 'user', content: `My height is ${height} cm and weight is ${weight} kg. What is my shirt size?` },
        ],
        temperature: 0,
        max_tokens: 5,
      });

      const size = response.choices[0]?.message?.content?.trim();
      res.json({ size });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch clothing size' });
    }
});

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });