import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await req.json();

    // Mock response for now - replace with actual v0 SDK integration
    const mockResponse = {
      demo: `https://v0.dev/chat/${Date.now()}`,
      webUrl: `https://v0.dev/chat/${Date.now()}`,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Site</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        .button {
            background: white;
            color: #667eea;
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your Generated Site!</h1>
        <p>This beautiful site was created based on your prompt: "${prompt}"</p>
        <button class="button" onclick="alert('Thanks for visiting!')">Get Started</button>
    </div>
</body>
</html>`,
      title: 'Generated Site'
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('v0 API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}
