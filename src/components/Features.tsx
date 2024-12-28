import React from 'react';
import { Shield, Clock, Heart, Coffee } from 'lucide-react';
import { Container } from './layout/Container';
import { Card } from './ui/Card';

const features = [
  {
    name: 'Safe & Confidential',
    description: 'Your privacy matters. All responses are completely anonymous and protected.',
    icon: Shield,
  },
  {
    name: 'Quick & Gentle',
    description: 'A thoughtful 5-10 minute check-in with immediate, caring insights.',
    icon: Clock,
  },
  {
    name: 'Professional Care',
    description: 'Questions crafted by mental health experts to provide meaningful guidance.',
    icon: Heart,
  },
  {
    name: 'Comfortable Space',
    description: 'Take the assessment at your own pace in a cozy, judgment-free environment.',
    icon: Coffee,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Why Take a Moment with Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding your mental health is the first step toward a more balanced life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.name} className="flex flex-col items-center text-center p-8">
              <div className="rounded-2xl bg-rose-100 p-3 mb-6">
                <feature.icon className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}