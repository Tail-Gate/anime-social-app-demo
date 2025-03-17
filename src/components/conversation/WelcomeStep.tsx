import React, { useState } from 'react';

interface WelcomeStepProps {
  appName: string;
  onUpdateAppName: (name: string) => void;
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ 
  appName, 
  onUpdateAppName, 
  onNext 
}) => {
  const [nameInput, setNameInput] = useState(appName || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppName(nameInput);
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome To Tana</h2>
      
      <p className="mb-6 text-gray-600">
        Let's create your app! We'll guide you through a few simple steps
        to customize your app, and then generate it for you. Let's start with naming your app.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="appName" className="block text-sm font-medium text-gray-700 mb-1">
            What would you like to name your app?
          </label>
          <input
            type="text"
            id="appName"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="AnimeConnect"
            required
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default WelcomeStep;