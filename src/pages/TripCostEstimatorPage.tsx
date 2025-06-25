import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <section>
          {/* 
            The TripCostEstimatorTool is the main feature of this page.
            It is a self-contained component that includes the Card, inputs,
            AnimatedCounter, and the final Button for navigation.
            We are placing it centrally for focus.
          */}
          <TripCostEstimatorTool />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;