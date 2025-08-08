import { NextResponse } from 'next/server';
import { getBrandingDataForISR } from '@/lib/api';

export async function GET() {
  try {
    const brandingData = await getBrandingDataForISR();
    
    return NextResponse.json({
      success: true,
      data: brandingData,
    });
  } catch (error) {
    console.error('Error in branding API route:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch branding data',
      },
      { status: 500 }
    );
  }
} 