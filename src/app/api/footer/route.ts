import { NextResponse } from 'next/server';
import { getFooterDataForISR } from '@/lib/api';

export async function GET() {
  try {
    const footerData = await getFooterDataForISR();
    
    return NextResponse.json({
      success: true,
      data: footerData,
    });
  } catch (error) {
    console.error('Error in footer API route:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch footer data',
      },
      { status: 500 }
    );
  }
} 