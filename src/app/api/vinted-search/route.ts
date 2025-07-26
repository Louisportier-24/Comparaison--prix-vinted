import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Aucune requête fournie' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.vinted.fr/api/v2/catalog/items?search_text=${encodeURIComponent(query)}&per_page=5`);
    const data = await res.json();

    const articles = data.items.map((item: any) => ({
      title: item.title,
      price: item.price,
      currency: item.currency,
      url: `https://www.vinted.fr${item.path}`,
      image: item.photos?.[0]?.url,
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Erreur Vinted :', error);
    return NextResponse.json({ error: 'Erreur de récupération' }, { status: 500 });
  }
}
