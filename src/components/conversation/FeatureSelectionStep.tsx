import React from 'react';

interface Feature {
  id: string;
  name: string;
  description: string;
}

interface FeatureSelectionStepProps {
  selectedFeatures: string[];
  onUpdateFeatures: (features: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FeatureSelectionStep: React.FC<FeatureSelectionStepProps> = ({
  selectedFeatures,
  onUpdateFeatures,
  onNext,
  onPrev,
}) => {
  // Define available features
  const availableFeatures: Feature[] = [
    {
      id: 'user-profiles',
      name: 'User Profiles',
      description: 'Allow users to customize profiles with anime preferences, favorites, and currently watching',
    },
    {
      id: 'content-sharing',
      name: 'Content Sharing',
      description: 'Enable users to share posts, images, and videos related to anime',
    },
    {
      id: 'social-interactions',
      name: 'Social Interactions',
      description: 'Let users follow, comment, and like content from other users',
    },
    {
      id: 'anime-tracking',
      name: 'Anime Tracking',
      description: 'Track episodes watched, rate anime, and get recommendations',
    },
    {
      id: 'discussion-forums',
      name: 'Discussion Forums',
      description: 'Create forums organized by anime series or genres',
    },
  ];

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      onUpdateFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      onUpdateFeatures([...selectedFeatures, featureId]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select App Features</h2>
      
      <p className="mb-6 text-gray-600">
        Choose which features you want in your anime social app. You can select multiple options.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {availableFeatures.map((feature) => (
            <div key={feature.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={feature.id}
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => toggleFeature(feature.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={feature.id} className="font-medium text-gray-700">
                  {feature.name}
                </label>
                <p className="text-gray-500">{feature.description}</p>
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
            disabled={selectedFeatures.length === 0}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeatureSelectionStep;