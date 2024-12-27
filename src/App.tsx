import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Assessment } from './components/Assessment';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {showAssessment ? (
          <Assessment />
        ) : (
          <>
            <Hero onStartAssessment={() => setShowAssessment(true)} />
            <Features />
          </>
        )}
      </main>
      
      <footer className="bg-gray-50 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            This website is for informational purposes only and is not a substitute for professional medical advice.
            If you're experiencing a mental health emergency, please contact your local emergency services or crisis hotline immediately.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;