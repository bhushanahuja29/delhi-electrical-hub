import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">New Delhi Electricals</h3>
            <p className="text-primary-foreground/80 text-sm">
              Your trusted partner for premium electrical solutions since 1998. 
              Authorized retail partner for India's finest brands.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>30 A Corner Market, Malviya Nagar<br />New Delhi – 110017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>9654102758</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Operating Hours</h4>
            <div className="text-sm text-primary-foreground/80">
              <p className="mb-2">Monday – Sunday</p>
              <p className="font-semibold">10:00 AM – 7:30 PM</p>
            </div>
            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <p className="text-sm text-primary-foreground/80">Service Area</p>
              <p className="font-semibold text-sm">Delhi NCR</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} New Delhi Electricals. All rights reserved.</p>
          <p className="mt-2">27 Years of Trusted Service | 30,000+ Happy Customers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;