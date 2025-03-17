import React, { useState } from 'react';
import WelcomeStep from './components/conversation/WelcomeStep';
import FeatureSelectionStep from './components/conversation/FeatureSelectionStep';
import VisualStyleStep from './components/conversation/VisualStyleStep';
import SummaryStep from './components/conversation/SummaryStep';
import GenerationStep from './components/conversation/GenerationStep';
import './index.css';

// Define the app state type
type AppState = {
  currentStep: number;
  appName: string;
  selectedFeatures: string[];
  visualStyle: string;
};

const App = () => {
  // Initialize state with default values
  const [state, setState] = useState<AppState>({
    currentStep: 1,
    appName: '',
    selectedFeatures: [],
    visualStyle: '',
  });

  // Function to update state based on user input
  const updateState = (updates: Partial<AppState>) => {
    setState({ ...state, ...updates });
  };

  // Function to go to the next step
  const nextStep = () => {
    setState({ ...state, currentStep: state.currentStep + 1 });
  };

  // Function to go to the previous step
  const prevStep = () => {
    setState({ ...state, currentStep: state.currentStep - 1 });
  };

  // Render the current step based on state
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <WelcomeStep
            appName={state.appName}
            onUpdateAppName={(appName) => updateState({ appName })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <FeatureSelectionStep
            selectedFeatures={state.selectedFeatures}
            onUpdateFeatures={(selectedFeatures) => updateState({ selectedFeatures })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <VisualStyleStep
            visualStyle={state.visualStyle}
            onUpdateVisualStyle={(visualStyle) => updateState({ visualStyle })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <SummaryStep
            appData={state}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <GenerationStep
            appData={state}
            onStartOver={() => setState({
              currentStep: 1,
              appName: '',
              selectedFeatures: [],
              visualStyle: '',
            })}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Tana
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create your own app in minutes with no technical skills required
          </p>
        </header>
        
        <main>
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;