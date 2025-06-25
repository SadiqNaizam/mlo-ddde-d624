import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/PackageCard';

// shadcn/ui Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const travelPackages = [
  {
    slug: 'golden-triangle-tour',
    imageUrl: 'https://images.unsplash.com/photo-1588135831349-65239221a74d?w=500&auto=format&fit=crop&q=60',
    title: 'Golden Triangle Tour',
    duration: '5 Days, 4 Nights',
    highlights: ['Visit Taj Mahal', 'Explore Jaipur Forts', 'Rickshaw Ride in Delhi'],
  },
  {
    slug: 'kerala-backwaters-escape',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b4046249457?w=500&auto=format&fit=crop&q=60',
    title: 'Kerala Backwaters Escape',
    duration: '7 Days, 6 Nights',
    highlights: ['Houseboat Stay', 'Spice Plantations', 'Kathakali Performance'],
  },
  {
    slug: 'rajasthan-desert-safari',
    imageUrl: 'https://images.unsplash.com/photo-1609533928229-408153835639?w=500&auto=format&fit=crop&q=60',
    title: 'Rajasthan Desert Safari',
    duration: '4 Days, 3 Nights',
    highlights: ['Camel Safari in Jaisalmer', 'Stay in Desert Camp', 'Visit Mehrangarh Fort'],
  },
  {
    slug: 'goa-beach-paradise',
    imageUrl: 'https://images.unsplash.com/photo-1590374504364-0d421a83d12a?w=500&auto=format&fit=crop&q=60',
    title: 'Goa Beach Paradise',
    duration: '6 Days, 5 Nights',
    highlights: ['Relax on Baga Beach', 'Watersports Activities', 'Explore Old Goa Churches'],
  },
  {
    slug: 'himalayan-adventure-rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1609769682973-990c379b36dc?w=500&auto=format&fit=crop&q=60',
    title: 'Himalayan Adventure',
    duration: '5 Days, 4 Nights',
    highlights: ['River Rafting in Ganges', 'Bungee Jumping', 'Yoga & Meditation'],
  },
  {
    slug: 'treasures-of-ladakh',
    imageUrl: 'https://images.unsplash.com/photo-1610413264955-f623a352467b?w=500&auto=format&fit=crop&q=60',
    title: 'Treasures of Ladakh',
    duration: '8 Days, 7 Nights',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Monastery Visits'],
  },
];

const SearchResultsPage = () => {
  console.log('SearchResultsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container py-8 px-4 md:px-6">
        {/* Breadcrumb and Title */}
        <div className="mb-8">
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Search Results</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl font-extrabold tracking-tight">Tour Packages</h1>
          <p className="text-muted-foreground mt-1">Showing {travelPackages.length} amazing destinations for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 mb-8 lg:mb-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sort-by" className="text-sm font-semibold">Sort By</Label>
                  <Select>
                    <SelectTrigger id="sort-by" className="w-full mt-2">
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="duration-asc">Duration: Shortest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-3">Activity Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activity-beach" />
                      <Label htmlFor="activity-beach" className="font-normal">Beaches</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activity-adventure" />
                      <Label htmlFor="activity-adventure" className="font-normal">Adventure</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activity-cultural" />
                      <Label htmlFor="activity-cultural" className="font-normal">Cultural</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="activity-safari" />
                      <Label htmlFor="activity-safari" className="font-normal">Safari</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                   <h4 className="text-sm font-semibold mb-3">Duration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-1-3" />
                      <Label htmlFor="duration-1-3" className="font-normal">1-3 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-4-6" />
                      <Label htmlFor="duration-4-6" className="font-normal">4-6 Days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="duration-7-plus" />
                      <Label htmlFor="duration-7-plus" className="font-normal">7+ Days</Label>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {travelPackages.map((pkg) => (
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

            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;