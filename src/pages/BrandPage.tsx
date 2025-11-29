import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ProductCard from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { brands, getProductsByBrand } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

const BrandPage = () => {
  const { slug } = useParams();
  const { trackPageView } = useApp();

  const brand = brands.find(b => b.slug === slug);
  const brandProducts = useMemo(() => 
    brand ? getProductsByBrand(brand.name) : [], 
    [brand]
  );

  // Group products by category
  const productsByCategory = useMemo(() => {
    const groups: Record<string, typeof brandProducts> = {};
    brandProducts.forEach(product => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });
    return groups;
  }, [brandProducts]);

  useEffect(() => {
    if (brand) {
      trackPageView(`brand-${brand.slug}`);
    }
  }, [brand, trackPageView]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container">
          <p className="text-center text-muted-foreground">Brand not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-6xl md:text-8xl font-bold text-muted-foreground/20 mb-4 block">
                {brand.name.charAt(0)}
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">{brand.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{brand.description}</p>
              
              {brand.catalogUrl && (
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  View Catalogue PDF
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Products by Category */}
        <section className="py-12">
          <div className="container">
            {Object.entries(productsByCategory).map(([category, categoryProducts], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <h2 className="text-2xl font-semibold mb-6">{category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categoryProducts.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                  ))}
                </div>
              </motion.div>
            ))}

            {brandProducts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>No products available for this brand yet</p>
                <Link to="/" className="text-accent hover:underline mt-2 inline-block">
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default BrandPage;
