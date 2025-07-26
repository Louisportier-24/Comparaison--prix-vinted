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

  const simulateComparison = () => {
    const vintedPrice = parseFloat((Math.random() * 30 + 10).toFixed(2));
    const aliexpressPrice = parseFloat((Math.random() * 20 + 5).toFixed(2));
    const profit = parseFloat((vintedPrice - aliexpressPrice).toFixed(2));
    setComparisonResult({ vintedPrice, aliexpressPrice, profit });
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
      <button onClick={simulateComparison}>
        Comparer
      </button>

      {comparisonResult && (
        <div style={{ marginTop: '1rem' }}>
          <p>Prix Vinted : {comparisonResult.vintedPrice} €</p>
          <p>Prix AliExpress : {comparisonResult.aliexpressPrice} €</p>
          <p>Profit potentiel : {comparisonResult.profit} €</p>
        </div>
      )}
    </main>
  );
}
