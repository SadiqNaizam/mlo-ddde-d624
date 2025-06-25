import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plane, Hotel, Car, Sparkles, IndianRupee } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

const COST_CONFIG = {
  flight: 12000,
  hotel: {
    '3-star': 2500,
    '4-star': 4500,
    '5-star': 8000,
  },
  transportPerDay: 1500,
  activitiesPerDay: 2000,
};

type HotelQuality = '3-star' | '4-star' | '5-star';

const TripCostEstimatorTool: React.FC = () => {
  const [includeFlights, setIncludeFlights] = useState(true);
  const [hotelQuality, setHotelQuality] = useState<HotelQuality>('4-star');
  const [duration, setDuration] = useState([7]);
  const [includeTransport, setIncludeTransport] = useState(true);
  const [includeActivities, setIncludeActivities] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  
  const navigate = useNavigate();

  console.log('TripCostEstimatorTool loaded');

  useEffect(() => {
    let cost = 0;
    const tripDuration = duration[0];

    // Accommodation cost
    cost += COST_CONFIG.hotel[hotelQuality] * tripDuration;

    // Optional costs
    if (includeFlights) {
      cost += COST_CONFIG.flight;
    }
    if (includeTransport) {
      cost += COST_CONFIG.transportPerDay * tripDuration;
    }
    if (includeActivities) {
      cost += COST_CONFIG.activitiesPerDay * tripDuration;
    }
    
    setTotalCost(cost);
  }, [includeFlights, hotelQuality, duration, includeTransport, includeActivities]);
  
  const handleFindPackages = () => {
    navigate(`/search-results?maxBudget=${totalCost}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trip Cost Estimator</CardTitle>
        <CardDescription>Build a custom trip to estimate your budget.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Flights */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-4">
                <Plane className="h-6 w-6 text-primary" />
                <Label htmlFor="flights-switch" className="text-lg">Include Round-trip Flights</Label>
            </div>
            <Switch id="flights-switch" checked={includeFlights} onCheckedChange={setIncludeFlights} />
        </div>

        {/* Duration */}
        <div className="p-4 rounded-lg border space-y-4">
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-4'>
                    <Hotel className="h-6 w-6 text-primary" />
                    <Label htmlFor="duration-slider" className="text-lg">Stay Duration</Label>
                </div>
                <span className="font-semibold text-lg">{duration[0]} Days</span>
            </div>
            <Slider id="duration-slider" min={1} max={30} step={1} value={duration} onValueChange={setDuration} />
        </div>

        {/* Hotel Quality */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="hotel-quality-select" className="text-lg">Hotel Quality</Label>
            <Select value={hotelQuality} onValueChange={(value: HotelQuality) => setHotelQuality(value)}>
                <SelectTrigger id="hotel-quality-select" className="w-[180px]">
                    <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3-star">3-Star</SelectItem>
                    <SelectItem value="4-star">4-Star</SelectItem>
                    <SelectItem value="5-star">5-Star</SelectItem>
                </SelectContent>
            </Select>
        </div>

        {/* Local Transport */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-4">
                <Car className="h-6 w-6 text-primary" />
                <Label htmlFor="transport-switch" className="text-lg">Include Local Transport</Label>
            </div>
            <Switch id="transport-switch" checked={includeTransport} onCheckedChange={setIncludeTransport} />
        </div>
        
        {/* Activities */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <Label htmlFor="activities-switch" className="text-lg">Include Activity Packages</Label>
            </div>
            <Switch id="activities-switch" checked={includeActivities} onCheckedChange={setIncludeActivities} />
        </div>

      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-6 rounded-b-lg gap-4">
        <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-gray-600">Total Estimated Cost</p>
            <div className="flex items-center justify-center sm:justify-start text-3xl font-bold text-primary">
                <IndianRupee className="h-7 w-7 mr-1" />
                <AnimatedCounter value={totalCost} />
            </div>
        </div>
        <Button size="lg" onClick={handleFindPackages}>
            Find Packages for this Budget
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCostEstimatorTool;