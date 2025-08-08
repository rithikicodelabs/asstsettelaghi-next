import { NextResponse } from 'next/server';
import { getHeaderDataForISR } from '@/lib/api';

export async function GET() {
  try {
    const headerData = await getHeaderDataForISR();
    
    return NextResponse.json(headerData, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=300', // 15 minutes cache
      },
    });
  } catch (error) {
    console.error('Error in header API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch header data' },
      { status: 500 }
    );
  }
} 