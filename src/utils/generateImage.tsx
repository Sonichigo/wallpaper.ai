import fetch from 'node-fetch';

const generateImage = async (prompt: string) => {
  const apiKey = process.env.AZURE_OPENAI_KEY;
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const deploymentName = 'dall-e-3'; // Replace with your DALL·E 3 deployment name

  const url = `${endpoint}openai/deployments/${deploymentName}/images/generations?api-version=2024-02-01`;

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['api-key'] = apiKey;
  }

  const body = JSON.stringify({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Error generating image: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].url; // Assuming the API returns the image URL in this format
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate image');
  }
};

export default generateImage;
