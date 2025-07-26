"use client";

import { useState } from 'react';

type Comparison = {
  vintedPrice: number;
  aliexpressPrice: number;
  profit: number;
};

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [comparisonResult, setComparisonResult] = useState<Comparison | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVintedPrice = async (query: string): Promise<number> => {
    const res = await fetch(`/api/vinted-search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Erreur API Vinted');
    const data = await res.json();
    // On prend le prix le plus bas parmi les résultats
    const prices = data.map((item: any) => parseFloat(item.price));
    return prices.length ? Math.min(...prices) : 0;
  };

  const simulateAliexpressPrice = (): number => {
    // Simulation simple, à remplacer par API réelle plus tard
    return parseFloat((Math.random() * 20 + 5).toFixed(2));
  };

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setComparisonResult(null);
    try {
      const vintedPrice = await fetchVintedPrice(itemName);
      const aliexpressPrice = simulateAliexpressPrice();
      const profit = parseFloat((vintedPrice - aliexpressPrice).toFixed(2));
      setComparisonResult({ vintedPrice, aliexpressPrice, profit });
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Comparateur Vinted / AliExpress</h1>

      <input
        type="text"
        placeholder="Nom de l'article"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ marginRight: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleCompare} disabled={loading || !itemName.trim()}>
        {loading ? 'Recherche...' : 'Comparer'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {comparisonResult && (
        <div style={{ marginTop: '1rem' }}>
          <p>Prix Vinted : {comparisonResult.vintedPrice} €</p>
          <p>Prix AliExpress (simulé) : {comparisonResult.aliexpressPrice} €</p>
          <p>Profit potentiel : {comparisonResult.profit} €</p>
        </div>
      )}
    </main>
  );
}
