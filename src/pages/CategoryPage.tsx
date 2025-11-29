import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ProductCard from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { categories, products, brands } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, List, X } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams();
  const { trackCategoryView } = useApp();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const category = categories.find(c => c.slug === slug);
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = p.category.toLowerCase().includes(category?.name.toLowerCase() || '');
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesPrice = p.listPrice >= priceRange[0] && p.listPrice <= priceRange[1];
      return matchesCategory && matchesBrand && matchesPrice;
    });
  }, [category, selectedBrands, priceRange]);

  const availableBrands = useMemo(() => {
    const brandSet = new Set(
      products
        .filter(p => p.category.toLowerCase().includes(category?.name.toLowerCase() || ''))
        .map(p => p.brand)
    );
    return brands.filter(b => brandSet.has(b.name));
  }, [category]);

  useEffect(() => {
    if (category) {
      trackCategoryView(category.name);
    }
  }, [category, trackCategoryView]);

  const toggleBrand = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container">
          <p className="text-center text-muted-foreground">Category not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </motion.div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              
              {selectedBrands.map(brand => (
                <Button
                  key={brand}
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleBrand(brand)}
                  className="gap-1.5"
                >
                  {brand}
                  <X className="h-3 w-3" />
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={view === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setView('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-64 flex-shrink-0"
              >
                <div className="sticky top-24 bg-card rounded-2xl border border-border p-4">
                  <h3 className="font-medium mb-4">Brands</h3>
                  <div className="space-y-2">
                    {availableBrands.map(brand => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrand(brand.name)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-4 ${
                  view === 'grid' 
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <p>No products found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default CategoryPage;
