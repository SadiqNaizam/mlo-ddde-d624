import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Icons
import { CalendarIcon, CheckCircle, CreditCard, Mail, Phone, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  travelers: z.string().min(1, { message: "Please select the number of travelers." }),
  travelDate: z.date({ required_error: "A travel date is required." }),
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), { message: "Please enter a valid 16-digit card number." }),
  cardExpiry: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Expiry must be in MM/YY format." }),
  cardCvc: z.string().refine((val) => /^\d{3,4}$/.test(val), { message: "CVC must be 3 or 4 digits." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  console.log('BookingPage loaded');
  const [step, setStep] = useState(1);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'email', 'phone', 'travelers', 'travelDate'];
    }
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  function onSubmit(data: BookingFormValues) {
    console.log("Form submitted", data);
    toast({
      title: "Processing Payment...",
      description: "Please wait while we confirm your booking.",
    });
    // Simulate API call
    setTimeout(() => {
      setStep(3); // Move to confirmation step
    }, 2000);
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Traveler Information</CardTitle>
              <CardDescription>Enter the details for the primary traveler.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g., John Doe" {...field} className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="email" placeholder="email@example.com" {...field} className="pl-9" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g., 9876543210" {...field} className="pl-9" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="travelers" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Number of Travelers</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <div className="relative">
                                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <SelectTrigger className="pl-9"><SelectValue placeholder="Select number of people" /></SelectTrigger>
                                  </div>
                              </FormControl>
                              <SelectContent>
                                  {[...Array(5)].map((_, i) => <SelectItem key={i+1} value={`${i + 1}`}>{i + 1} Traveler{i > 0 && 's'}</SelectItem>)}
                              </SelectContent>
                          </Select>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="travelDate" render={({ field }) => (
                      <FormItem className="flex flex-col">
                          <FormLabel>Travel Date</FormLabel>
                          <Popover>
                              <PopoverTrigger asChild>
                                  <FormControl>
                                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                  </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} initialFocus />
                              </PopoverContent>
                          </Popover>
                          <FormMessage />
                      </FormItem>
                  )} />
               </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information to complete the booking.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
               <FormField name="cardName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder="John Doe" {...field} className="pl-9" />
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="cardNumber" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input placeholder="---- ---- ---- ----" {...field} className="pl-9" />
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField name="cardExpiry" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="cardCvc" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl><Input placeholder="123" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for booking with Wanderlust India. Your confirmation and itinerary have been sent to your email.
            </p>
            <p className="text-sm font-mono text-gray-500 mb-6">Booking ID: WNDR-XYZ-123</p>
            <Button asChild>
              <Link to="/">Back to Homepage</Link>
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
              {/* Form Side */}
              <div className="md:col-span-2">
                <Card className="shadow-lg">
                  {renderStepContent()}
                  {step < 3 && (
                    <CardFooter className="flex justify-between">
                      {step > 1 && <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>}
                      {step === 1 && <div />} {/* Placeholder to keep "Next" on the right */}
                      {step === 1 && <Button type="button" onClick={handleNextStep}>Continue to Payment</Button>}
                      {step === 2 && <Button type="submit">Confirm & Pay</Button>}
                    </CardFooter>
                  )}
                </Card>
              </div>

              {/* Summary Side */}
              <div className="md:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1544998133-8a3c86992d95?q=80&w=800"
                        alt="Taj Mahal"
                        className="rounded-lg w-24 h-24 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">Golden Triangle Tour</h3>
                        <p className="text-sm text-muted-foreground">Delhi, Agra, Jaipur</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Package Price:</span>
                        <span>₹45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees:</span>
                        <span>₹2,250</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold text-base">
                        <span>Total:</span>
                        <span>₹47,250</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;