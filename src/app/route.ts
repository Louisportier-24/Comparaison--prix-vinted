import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ error: "Paramètre 'query' manquant" }, { status: 400 });
  }

  const vintedURL = `https://www.vinted.fr/api/v2/catalog/items?search_text=${encodeURIComponent(query)}&per_page=1`;

  try {
    const res = await fetch(vintedURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Erreur API Vinted", status: res.status }, { status: res.status });
    }

    const data = await res.json();
    const item = data.items?.[0];
    const price = item?.price || null;

    return NextResponse.json({ price });
  } catch (error) {
    return NextResponse.json({ error: "Échec de la requête vers Vinted" }, { status: 500 });
  }
}