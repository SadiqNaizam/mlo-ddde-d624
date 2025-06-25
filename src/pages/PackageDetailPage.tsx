import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Icons from lucide-react
import { CheckCircle2, XCircle, Clock, Users, IndianRupee } from 'lucide-react';

// --- Placeholder Data ---
const packageDetails = {
  title: 'Kerala Paradise: Backwaters & Beaches',
  description: 'Embark on a mesmerizing journey through the lush green landscapes of Kerala. From the serene backwaters of Alleppey to the sun-kissed beaches of Varkala, this package offers a perfect blend of relaxation and cultural exploration.',
  price: 24999,
  duration: '7 Days / 6 Nights',
  travelers: '2 Adults',
};

const galleryImages = [
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587370560942-ad2a0f5abbec?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1932&auto=format&fit=crop',
];

const itinerary = [
  { day: 'Day 1', title: 'Arrival in Kochi & City Tour', details: 'Arrive at Cochin International Airport, transfer to your hotel. Later, explore Fort Kochi, the Chinese Fishing Nets, and St. Francis Church.' },
  { day: 'Day 2', title: 'Journey to Munnar\'s Tea Gardens', details: 'Drive to Munnar, a famous hill station known for its sprawling tea plantations. Check into your resort and enjoy the evening at leisure.' },
  { day: 'Day 3', title: 'Munnar Sightseeing', details: 'Visit Eravikulam National Park to see the Nilgiri Tahr, Mattupetty Dam, and Tea Museum.' },
  { day: 'Day 4', title: 'Thekkady\'s Wildlife', details: 'Proceed to Thekkady and visit the Periyar Wildlife Sanctuary. Enjoy a boat ride on Periyar Lake to spot elephants, deer, and various birds.' },
  { day: 'Day 5', title: 'Alleppey Backwater Houseboat Stay', details: 'Drive to Alleppey and board a traditional houseboat for a magical overnight journey through the tranquil backwaters.' },
  { day: 'Day 6', title: 'Relax at Varkala Beach', details: 'Disembark from the houseboat and head to the cliff-side Varkala beach. Relax, swim, or explore the local shops.' },
  { day: 'Day 7', title: 'Departure from Trivandrum', details: 'After breakfast, transfer to Trivandrum International Airport for your onward journey.' },
];

const inclusions = ['Accommodation in 3-star hotels', 'Daily breakfast', 'All transfers and sightseeing by AC vehicle', 'Houseboat stay with all meals', 'All applicable taxes'];
const exclusions = ['Airfare / Train fare', 'Lunches and dinners (unless specified)', 'Entry fees to monuments and parks', 'Personal expenses'];

const PackageDetailPage = () => {
  console.log('PackageDetailPage loaded');
  const navigate = useNavigate();

  const handleBooking = () => {
    // Navigate to the booking page, potentially passing package info
    navigate('/booking'); // Path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/search-results">Packages</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{packageDetails.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column: Gallery and Itinerary */}
            <div className="lg:col-span-3">
              <Carousel className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                <CarouselContent>
                  {galleryImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <img src={src} alt={`Package Image ${index + 1}`} className="w-full h-96 object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
              </Carousel>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{packageDetails.title}</h1>
              <p className="text-muted-foreground mb-8">{packageDetails.description}</p>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Detailed Itinerary</h2>
                <Accordion type="single" collapsible className="w-full">
                  {itinerary.map((item) => (
                    <AccordionItem value={item.day} key={item.day}>
                      <AccordionTrigger className="text-lg font-medium">{`${item.day}: ${item.title}`}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.details}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Column: Booking Card */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Package Price</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-4xl font-bold text-primary">
                    <IndianRupee className="h-8 w-8 mr-1" /> {packageDetails.price.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-muted-foreground -mt-2">per person</p>

                  <div className="border-t pt-4 space-y-3 text-sm">
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-muted-foreground" /> <span>{packageDetails.duration}</span></div>
                    <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-muted-foreground" /> <span>{packageDetails.travelers}</span></div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold">Inclusions</h4>
                    <ul className="space-y-2">
                      {inclusions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold">Exclusions</h4>
                    <ul className="space-y-2">
                      {exclusions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <XCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" onClick={handleBooking}>
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetailPage;