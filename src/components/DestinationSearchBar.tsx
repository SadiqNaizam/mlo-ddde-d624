import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar as CalendarIcon, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DestinationSearchBar: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const navigate = useNavigate();

  console.log('DestinationSearchBar loaded');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) {
      params.append('destination', destination);
    }
    if (checkInDate) {
      params.append('checkin', format(checkInDate, 'yyyy-MM-dd'));
    }
    if (checkOutDate) {
      params.append('checkout', format(checkOutDate, 'yyyy-MM-dd'));
    }
    
    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 md:p-6 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Destination Input */}
          <div className="md:col-span-4">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="destination"
                type="text"
                placeholder="e.g., Goa, Kerala, Rajasthan"
                className="pl-10 h-12 text-base"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Check-in Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal h-12 text-base',
                    !checkInDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal h-12 text-base',
                    !checkOutDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  disabled={(date) => 
                    date < (checkInDate || new Date(new Date().setHours(0, 0, 0, 0)))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <Button size="lg" className="w-full h-12 text-base" onClick={handleSearch}>
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationSearchBar;