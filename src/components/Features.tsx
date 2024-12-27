import React from 'react';
import { Shield, Clock, Heart } from 'lucide-react';

const features = [
  {
    name: 'Confidential',
    description: 'Your privacy is our top priority. All responses are completely anonymous and secure.',
    icon: Shield,
  },
  {
    name: 'Quick & Easy',
    description: 'Complete the assessment in just 5-10 minutes and get immediate insights.',
    icon: Clock,
  },
  {
    name: 'Professional Guidance',
    description: 'Questions designed by mental health professionals to provide meaningful insights.',
    icon: Heart,
  },
];

export function Features() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Take Our Assessment?
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Understanding your mental health is the first step toward well-being
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-blue-600 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}