import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, GitCompare, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTheme } from 'next-themes';
import SearchModal from '@/components/catalog/SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { shortlistCount, comparisonCount } = useApp();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-semibold tracking-tight">
                New Delhi Electricals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link to="/brands" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Brands
              </Link>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Link to="/shortlist">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Heart className="h-5 w-5" />
                  {shortlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                      {shortlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/compare">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <GitCompare className="h-5 w-5" />
                  {comparisonCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                      {comparisonCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="container py-4 flex flex-col gap-2">
              <Link
                to="/categories"
                className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/brands"
                className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Header;
