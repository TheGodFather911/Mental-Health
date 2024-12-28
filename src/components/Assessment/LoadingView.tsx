import React from 'react';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';

export function LoadingView() {
  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto text-center">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-200 border-t-rose-600 mx-auto" />
          <p className="text-gray-600">
            Preparing your personalized assessment...
          </p>
        </div>
      </Card>
    </Container>
  );
}