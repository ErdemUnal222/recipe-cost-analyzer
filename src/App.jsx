import { useState } from 'react'

function App() {
  const [recipe, setRecipe] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeRecipe = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
     const response = await fetch('https://recipe-cost-analyzer-production.up.railway.app/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe })
      })

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Recipe Cost Analyzer</h1>
      <textarea
        rows={10}
        style={{ width: '100%', marginBottom: '10px' }}
        placeholder="Paste your recipe here..."
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />
      <button onClick={analyzeRecipe} disabled={loading || !recipe}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h2>Results</h2>
          <ul>
            {result.ingredients.map((ing, i) => (
              <li key={i}>{ing.name} — {ing.quantity} — €{ing.estimated_cost_eur}</li>
            ))}
          </ul>
          <p>Total cost: €{result.total_cost_eur}</p>
          <p>Suggested price: €{result.suggested_price_eur}</p>
          <p>Margin: {result.margin_percentage}%</p>
          <p>Tip: {result.cost_reduction_tip}</p>
        </div>
      )}
    </div>
  )
}

export default App