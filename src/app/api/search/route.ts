import { getProductsByTitle } from '@/actions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const products = await getProductsByTitle(query);
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Error buscando productos' },
      { status: 500 }
    );
  }
}
