import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import mongoose from 'mongoose';
import Product from "./models/productModel.js";
import axios from 'axios';

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
  const { clothing, skinTone, background = "plain white", gender, n } = req.body;

  if (!clothing || !skinTone || !gender) {
    console.warn("Missing fields:", { clothing, skinTone, gender });
    return res.status(400).json({
      error: "Missing required fields. Please provide clothing, skin tone, background, and gender.",
    });
  }


  try {
    const captionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: "You are a fashion stylist assistant. Describe clothing in detailed fashion terms from images.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a fashion catalog expert.
            Describe only the clothing item in the image in as much detail as possible. Focus on:
            - Garment type (e.g., t-shirt, hoodie, blouse)
            - Color(s) and pattern
            - Material/fabric (e.g., cotton, denim, silk)
            - Style and cut (e.g., loose fit, cropped, V-neck)
            - Notable features (e.g., buttons, zippers, pockets, graphics)
            Do NOT describe any people, poses, background, or scene.
            Be concise but precise.`,
            },
            {
              type: "image_url",
              image_url: {
                url: clothing,
              },
            },
          ],
        },
      ],
    });

    const caption = captionResponse.choices[0].message.content;
    const angles = ["front", "left side", "back", "right side"];
    const prompt = `A realistic full-body image of a ${gender} with ${skinTone} skin tone wearing ${caption}, viewed from the ${angles}, ${background} background.`;
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n:1,
      size: "1024x1024",
    });
     const imageUrls = imageResponse.data.map((img) => img.url);
    res.json({ imageUrls });
  } catch (error) {
    console.error("Error generating image:", error?.message || error);
    res.status(500).json({ error: "Image generation failed." });
  }
});

app.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
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