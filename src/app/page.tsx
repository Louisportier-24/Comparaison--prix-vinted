import { useState } from 'react';

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const simulateComparison = () => {
    const vintedPrice = parseFloat((Math.random() * 30 + 10).toFixed(2)); // entre 10€ et 40€
    const aliexpressPrice = parseFloat((Math.random() * 20 + 5).toFixed(2)); // entre 5€ et 25€
    const profit = parseFloat((vintedPrice - aliexpressPrice).toFixed(2));
    setComparisonResult({ vintedPrice, aliexpressPrice, profit });
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Comparateur Vinted vs AliExpress
      </h1>

      <input
        type="text"
        placeholder="Nom de l'article"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button
        onClick={simulateComparison}
        style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Comparer
      </button>

      {comparisonResult && (
        <div style={{ marginTop: '2rem', background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
          <p><strong>Article :</strong> {itemName}</p>
          <p><strong>Prix Vinted :</strong> {comparisonResult.vintedPrice} €</p>
          <p><strong>Prix AliExpress :</strong> {comparisonResult.aliexpressPrice} €</p>
          <p style={{ color: 'green' }}>
            <strong>Profit potentiel :</strong> {comparisonResult.profit} €
          </p>
        </div>
      )}
    </main>
  );
}
