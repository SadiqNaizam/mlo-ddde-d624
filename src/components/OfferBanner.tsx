import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OfferBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Exclusive Monsoon Deals",
  subtitle = "Up to 30% off on packages to Kerala & Goa.",
  ctaText = "Explore Offers",
  ctaLink = "/search-results?offer=monsoon-deals",
  className = '',
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={`
        relative w-full rounded-2xl overflow-hidden p-8 md:p-12
        bg-gradient-to-br from-gray-900 to-gray-800
        text-white border border-cyan-500/20
        transition-all duration-300 ease-in-out
        shadow-lg shadow-cyan-900/20 hover:shadow-xl hover:shadow-cyan-700/20
        ${className}
      `}
    >
      {/* Decorative background elements */}
      <Sparkles className="absolute top-4 right-4 h-8 w-8 text-cyan-500/50" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Text Content */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
            {title}
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex-shrink-0">
          <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold group">
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;