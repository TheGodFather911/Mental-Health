import React from 'react';
import { Card } from '../ui/Card';
import { Container } from '../layout/Container';
import { Heart, Phone } from 'lucide-react';

interface ResultsViewProps {
  analysis: string;
}

export function ResultsView({ analysis }: ResultsViewProps) {
  return (
    <Container className="py-12">
      <Card className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-xl mb-4">
            <Heart className="h-6 w-6 text-rose-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your Wellbeing Insights
          </h2>
          <p className="text-gray-600">
            Thank you for taking the time to check in with yourself
          </p>
        </div>

        <div className="prose prose-rose max-w-none">
          {analysis.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 p-4 bg-rose-50 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Phone className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                Need to talk to someone?
              </h3>
              <p className="text-sm text-gray-600">
                Remember: This assessment is not a medical diagnosis. If you're experiencing 
                significant distress, please reach out to a mental health professional or 
                contact your local crisis helpline.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}