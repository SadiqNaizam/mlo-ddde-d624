import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface PackageCardProps {
  slug: string;
  imageUrl: string;
  title: string;
  duration: string;
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ slug, imageUrl, title, duration, highlights }) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Link 
      to={`/package-detail?package=${slug}`} 
      className="group relative block w-full h-80 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
      aria-label={`View details for ${title}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl || 'https://via.placeholder.com/400x320'})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        {/* Always Visible Content */}
        <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-gray-200">{duration}</p>
        </div>

        {/* Hover-revealed Highlights */}
        <div className="mt-4 max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:opacity-100">
          <ul className="space-y-1 text-sm">
            {highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;