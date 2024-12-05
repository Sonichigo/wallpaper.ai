/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY,
  },
  // Optional: if you have CORS issues
  async headers() {
    return [
      {
        source: '/api/generate-image',
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "POST" },
        ]
      }
    ]
  }
}

module.exports = nextConfig