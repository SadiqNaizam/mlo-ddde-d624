import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/search-results' },
    { name: 'Offers', href: '/offers' },
    { name: 'Trip Cost Estimator', href: '/trip-cost-estimator' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <span className="font-bold">Wanderlust India</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.href} className={navLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost">Login</Button>
          <Button>Register</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Mountain className="h-6 w-6" />
                  <span>Wanderlust India</span>
                </Link>
                {navLinks.map((link) => (
                  <NavLink key={link.name} to={link.href} className={({isActive}) => `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;