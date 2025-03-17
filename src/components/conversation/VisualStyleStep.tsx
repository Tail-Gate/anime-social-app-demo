// src/components/conversation/VisualStyleStep.tsx
import React from 'react';

interface StyleOption {
  id: string;
  name: string;
  description: string;
  // In a real implementation, we might include preview images
  previewColor: string;
}

interface VisualStyleStepProps {
  visualStyle: string;
  onUpdateVisualStyle: (style: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const VisualStyleStep: React.FC<VisualStyleStepProps> = ({
  visualStyle,
  onUpdateVisualStyle,
  onNext,
  onPrev,
}) => {
  // Define available style options
  const styleOptions: StyleOption[] = [
    {
      id: 'vibrant-anime',
      name: 'Vibrant Anime',
      description: 'Colorful and bold, inspired by popular anime visual styles',
      previewColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      id: 'dark-otaku',
      name: 'Dark Otaku',
      description: 'Dark theme with bright accent colors for a modern feel',
      previewColor: 'bg-gradient-to-r from-gray-900 to-gray-800',
    },
    {
      id: 'minimal-manga',
      name: 'Minimal Manga',
      description: 'Clean black and white design inspired by manga pages',
      previewColor: 'bg-gradient-to-r from-gray-100 to-white',
    },
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Choose Visual Style</h2>
      
      <p className="mb-6 text-gray-600">
        Select a visual theme for your anime community app.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {styleOptions.map((style) => (
            <div 
              key={style.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                visualStyle === style.id 
                  ? 'border-blue-500 ring-2 ring-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onUpdateVisualStyle(style.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded ${style.previewColor} ${
                    style.id === 'minimal-manga' ? 'border border-gray-300' : ''
                  }`}
                ></div>
                <div className="ml-4">
                  <h3 className="font-medium">{style.name}</h3>
                  <p className="text-sm text-gray-500">{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-5 flex justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!visualStyle}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisualStyleStep;