import { NextResponse } from 'next/server';
import axios from 'axios';
export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { prompt, n, size } = await request.json();

    const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
    const API_KEY = process.env.AZURE_OPENAI_KEY;
    
    const apiUrl = `${AZURE_ENDPOINT}/openai/deployments/dall-e-3/images/generations?api-version=2024-02-01`;

    const body = {
      prompt,
      n,
      size,
    };
    // Make the POST request to the image generation API
    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      }
    });

    // Return the image URL from the API response
    return NextResponse.json({ images: response.data.data.map((img: any) => img.url) });
  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 });
  }
}