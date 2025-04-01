import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import mongoose from 'mongoose';
import Product from "./models/productModel.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect to mongoDB Atlas
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
}
connectDB();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  app.post('/get-size', async (req, res) => {
    let { height, weight, gender } = req.body;

    if (!height || !weight) {
        return res.status(400).json({ error: 'Please provide height and weight' });
    }

    // If gender is missing, ask the user
    if (!gender) {
        return res.status(400).json({ error: 'Please provide gender (male/female)' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: `You are a clothing size assistant for India. 
                    Use Indian size charts for brands like Allen Solly, Peter England, and FabIndia.
                    If gender is 'male', use men's size charts. If gender is 'female', use women's size charts.
                    Always return only one size (XS, S, M, L, XL, XXL) without explanation.` },
                { role: 'user', content: `I am ${gender}. My height is ${height} cm and weight is ${weight} kg. What is my shirt size?` },
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



app.post("/generate-image", async (req, res) => {
  const { clothing, skinTone, background, gender, n } = req.body;

  if (!clothing || !skinTone || !gender) {
      return res.status(400).json({ error: "Clothing, skin tone, and gender are required." });
  }

  // Set default value for `n` if not provided or invalid
  const numImages = Number(n) > 0 && Number(n) <= 5 ? Number(n) : 1; 

  try {
      const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: `A realistic image of a ${gender} with ${skinTone} skin tone wearing ${clothing}, plain ${background} background.`,
          n: numImages,
          size: "1024x1024",
      });

      res.json({ imageUrls: response.data.map(img => img.url) });
  } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image." });
  }
});


// API to Get All Products
app.get('/products', async (req, res) => {
  try {
      const products = await Product.find(); // Fetch all products
      res.json(products);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});