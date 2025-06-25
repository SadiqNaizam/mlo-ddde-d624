import React from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Page-specific Custom Components
import DestinationSearchBar from '@/components/DestinationSearchBar';
import PackageCard from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// Placeholder data for featured packages
const featuredPackages = [
  {
    slug: 'majestic-rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1599661046223-e06f76e94f34?q=80&w=1974&auto=format&fit=crop',
    title: 'Majestic Rajasthan',
    duration: '10 Days / 9 Nights',
    highlights: ["Explore Jaipur's Palaces", "Udaipur Lake Tour", "Jodhpur's Mehrangarh Fort"],
  },
  {
    slug: 'kerala-backwater-serenity',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    title: 'Kerala Backwater Serenity',
    duration: '7 Days / 6 Nights',
    highlights: ['Houseboat stay in Alleppey', "Munnar's Tea Gardens", "Kochi's historic sites"],
  },
  {
    slug: 'himalayan-adventure-rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1616423839137-2d330a2e8433?q=80&w=1932&auto=format&fit=crop',
    title: 'Himalayan Adventure',
    duration: '8 Days / 7 Nights',
    highlights: ['Trekking in Himachal', 'Visit Shimla & Manali', 'River Rafting'],
  },
];


const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Incredible India Awaits
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
              Discover and book unforgettable travel experiences in the most beautiful destinations.
            </p>
            <div className="w-full mt-8">
              <DestinationSearchBar />
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Featured Travel Packages</h2>
              <p className="mt-2 text-lg text-gray-600">Handpicked journeys to inspire your next adventure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
                  slug={pkg.slug}
                  imageUrl={pkg.imageUrl}
                  title={pkg.title}
                  duration={pkg.duration}
                  highlights={pkg.highlights}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container px-4">
                <OfferBanner />
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;