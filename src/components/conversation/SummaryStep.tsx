import React from 'react';

interface AppData {
  appName: string;
  selectedFeatures: string[];
  visualStyle: string;
  currentStep: number;
}

interface SummaryStepProps {
  appData: AppData;
  onNext: () => void;
  onPrev: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  appData,
  onNext,
  onPrev,
}) => {
  // Maps for readable feature and style names
  const featureNames: Record<string, string> = {
    'user-profiles': 'User Profiles',
    'content-sharing': 'Content Sharing',
    'social-interactions': 'Social Interactions',
    'anime-tracking': 'Anime Tracking',
    'discussion-forums': 'Discussion Forums',
  };

  const styleNames: Record<string, string> = {
    'vibrant-anime': 'Vibrant Anime',
    'dark-otaku': 'Dark Otaku',
    'minimal-manga': 'Minimal Manga',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review Your App</h2>
      
      <p className="mb-6 text-gray-600">
        Review your selections before we generate your anime social app.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">App Name</h3>
          <p className="mt-1 text-gray-600">{appData.appName}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900">Selected Features</h3>
          <ul className="mt-1 text-gray-600 list-disc list-inside">
            {appData.selectedFeatures.map(featureId => (
              <li key={featureId}>{featureNames[featureId] || featureId}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900">Visual Style</h3>
          <p className="mt-1 text-gray-600">{styleNames[appData.visualStyle] || appData.visualStyle}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate App
          </button>
        </div>
      </form>
    </div>
  );
};

export default SummaryStep;