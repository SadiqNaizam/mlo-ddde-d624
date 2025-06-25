import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Wanderlust India</span>
            </Link>
            <p className="text-sm">Your gateway to exploring the incredible destinations of India.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/about" className="text-sm hover:text-primary">About Us</Link>
                <Link to="/contact" className="text-sm hover:text-primary">Contact</Link>
                <Link to="/careers" className="text-sm hover:text-primary">Careers</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/faq" className="text-sm hover:text-primary">FAQ</Link>
                <Link to="/terms" className="text-sm hover:text-primary">Terms of Service</Link>
                <Link to="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-primary"><Facebook size={20} /></Link>
                <Link to="#" className="hover:text-primary"><Twitter size={20} /></Link>
                <Link to="#" className="hover:text-primary"><Instagram size={20} /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {currentYear} Wanderlust India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;