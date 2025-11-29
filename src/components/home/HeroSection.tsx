import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchModal from '@/components/catalog/SearchModal';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                27 Years of Trusted Service
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
            >
              Premium Electrical
              <br />
              <span className="text-muted-foreground">Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              Authorized partner for ABB, Lauritz Knudsen, Polycab & more. 
              Fast delivery across Delhi NCR.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full sm:w-96 flex items-center gap-3 px-6 py-4 bg-secondary rounded-2xl text-muted-foreground hover:bg-secondary/80 transition-colors group"
              >
                <Search className="h-5 w-5" />
                <span className="flex-1 text-left">Search products, SKUs...</span>
                <kbd className="hidden sm:inline-flex px-2 py-0.5 bg-background rounded text-xs">⌘K</kbd>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">30K+</span> Customers
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Same Day</span> Delivery
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">100%</span> Genuine
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default HeroSection;
