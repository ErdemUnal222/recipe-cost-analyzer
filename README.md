# Recipe Cost Analyzer

A full-stack AI-powered application that analyzes recipe ingredients and estimates food costs, suggested selling price, and profit margin — built by a former Michelin-starred chef turned developer.

## Live Demo

[projectcostanalyzer.netlify.app](https://projectcostanalyzer.netlify.app)

## How it works

1. Paste a recipe (ingredients, quantities, instructions)
2. The app sends it to an Express backend
3. The backend calls the Claude API (Anthropic) to extract ingredients, estimate costs per ingredient, calculate total food cost, suggested price, and margin
4. Results are displayed instantly

## Tech Stack

**Frontend:** React, Vite, deployed on Netlify  
**Backend:** Node.js, Express, deployed on Railway  
**AI:** Anthropic Claude API  

## Run locally

Clone the repository:
git clone https://github.com/ErdemUnal222/recipe-cost-analyzer.git


Install frontend dependencies:
npm install
npm run dev


Install backend dependencies:
cd server
npm install


Create a `.env` file in the `server` folder:
ANTHROPIC_API_KEY=your_key_here


Start the server:
node index.js


## Notes

Ingredient prices are estimated by the AI based on average French market rates. Live supplier price integration is planned for v2.