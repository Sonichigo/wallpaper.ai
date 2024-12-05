"use client";

import React, { useState, useEffect } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/components/Footer';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [catalog, setCatalog] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load images from session storage on mount
  useEffect(() => {
    const storedImages = sessionStorage.getItem('generatedImages');
    const storedCatalog = sessionStorage.getItem('imageCatalog');

    if (storedImages) setImages(JSON.parse(storedImages));
    if (storedCatalog) setCatalog(JSON.parse(storedCatalog));
  }, []);

  // Update session storage when images or catalog changes
  useEffect(() => {
    sessionStorage.setItem('generatedImages', JSON.stringify(images));
    sessionStorage.setItem('imageCatalog', JSON.stringify(catalog));
  }, [images, catalog]);

  const generateImages = async (userPrompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generateWallpaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt,
          n: 1,
          size: "1792x1024",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate images');
      }

      const data = await response.json();
      const newImages = data.images || [];
      setImages(newImages);
      setCatalog((prev) => [...newImages, ...prev]); // Add new images to catalog
    } catch (err) {
      console.error('Image generation failed', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-4">ImageInator</h1>
        <div className="flex space-x-4">
          <div className="flex-grow">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image description..."
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-400 mt-2 text-sm">
                {error}
              </p>
            )}
          </div>
          <button
            onClick={() => generateImages(prompt)}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors 
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      )}

      {/* Display the first generated image */}
      {images.length > 0 && (
        <div className="mt-6">
          <div
            className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={images[0]} // Display only the first image
              alt="Generated image"
              className="w-full h-96 object-cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {/* Catalog Section */}
      {catalog.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Previously Generated Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {catalog.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={imageUrl}
                  alt={`Catalog image ${index + 1}`}
                  className="w-full h-48 object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && images.length === 0 && !error && (
        <div className="text-center py-12 text-gray-400">
          <ImageIcon size={64} className="mx-auto mb-4 text-gray-500" />
          <p>Your generated images will appear here</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ImageGenerator;
