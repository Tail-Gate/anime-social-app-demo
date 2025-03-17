import React, { useState, useEffect } from 'react';

interface AppData {
  appName: string;
  selectedFeatures: string[];
  visualStyle: string;
  currentStep: number;
}

interface GenerationStepProps {
  appData: AppData;
  onStartOver: () => void;
}

const GenerationStep: React.FC<GenerationStepProps> = ({
  appData,
  onStartOver,
}) => {
  const [generationPhase, setGenerationPhase] = useState<string>('initializing');
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Simulate generation process
  useEffect(() => {
    const phases = [
      { name: 'initializing', message: 'Initializing app generation...', duration: 1500 },
      { name: 'structure', message: 'Creating app structure...', duration: 2000 },
      { name: 'features', message: 'Implementing selected features...', duration: 3000 },
      { name: 'styling', message: 'Applying visual style...', duration: 2000 },
      { name: 'finalizing', message: 'Finalizing your app...', duration: 1500 },
    ];

    let currentPhaseIndex = 0;
    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      if (currentPhaseIndex >= phases.length) {
        clearInterval(interval);
        setIsComplete(true);
        return;
      }

      const currentPhase = phases[currentPhaseIndex];
      setGenerationPhase(currentPhase.name);
      
      elapsedTime += 100;
      setProgress(Math.min(100, Math.floor((elapsedTime / totalDuration) * 100)));

      if (elapsedTime >= phases.slice(0, currentPhaseIndex + 1).reduce((sum, phase) => sum + phase.duration, 0)) {
        currentPhaseIndex++;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getPhaseMessage = () => {
    switch (generationPhase) {
      case 'initializing':
        return 'Initializing app generation...';
      case 'structure':
        return 'Creating app structure...';
      case 'features':
        return 'Implementing selected features...';
      case 'styling':
        return 'Applying visual style...';
      case 'finalizing':
        return 'Finalizing your app...';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      {!isComplete ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generating Your App</h2>
          
          <p className="mb-6 text-gray-600">
            Please wait while we create your anime social app based on your selections.
          </p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{getPhaseMessage()}</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your App Is Ready!</h2>
          
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              Congratulations! Your anime social app <strong>{appData.appName}</strong> has been successfully created.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">App Preview</h3>
              {/* In a real implementation, we'd show an actual preview */}
              <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
                <p className="text-gray-500">Preview of {appData.appName}</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={onStartOver}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Another App
              </button>
              
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationStep;