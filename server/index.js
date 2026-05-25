const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/analyze', async (req, res) => {
  const { recipe } = req.body;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `You are a professional chef and food cost analyst. Analyze this recipe and return a JSON object with this exact structure:
{
  "ingredients": [
    { "name": "ingredient name", "quantity": "amount with unit", "estimated_cost_eur": number }
  ],
  "total_cost_eur": number,
  "suggested_price_eur": number,
  "margin_percentage": number,
  "cost_reduction_tip": "one practical suggestion to reduce cost"
}

Recipe:
${recipe}

Return only the JSON object, nothing else.`
        }
      ]
    });

const raw = message.content[0].text.replace(/```json|```/g, '').trim();
const result = JSON.parse(raw);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});