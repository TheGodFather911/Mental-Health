import React from 'react';
import { Heart } from 'lucide-react';
import { Container } from './layout/Container';
import { Button } from './ui/Button';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-b from-rose-50 to-white py-24">
      <Container>
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-2xl mb-8">
            <Heart className="h-8 w-8 text-rose-600" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Take a Moment for</span>
            <span className="block text-rose-600">Your Mental Wellbeing</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
            In our fast-paced world, it's important to check in with yourself. 
            Take our gentle assessment to understand your mental health better, 
            in a safe and caring space.
          </p>
          
          <Button size="lg" onClick={onStartAssessment}>
            Begin Your Journey
          </Button>
        </div>
      </Container>
    </div>
  );
}