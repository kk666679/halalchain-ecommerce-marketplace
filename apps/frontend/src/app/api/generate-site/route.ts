import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  try {
    // Call backend AI tools service
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/ai-tools/generate-site`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    const generatedSite = await response.json();
    return NextResponse.json(generatedSite);
  } catch (error) {
    // Fallback to mock
    const generatedSite = {
      hero: 'Welcome to Your Amazing Site',
      features: 'Our Key Features',
      contact: 'Get In Touch',
    };
    return NextResponse.json(generatedSite);
  }
}
