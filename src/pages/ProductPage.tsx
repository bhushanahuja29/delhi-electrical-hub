import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ProductCard from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, GitCompare, Copy, Check, FileText, Camera } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const badgeConfig = {
  popular: { label: 'Most Popular', className: 'bg-accent text-accent-foreground' },
  'best-value': { label: 'Best Value', className: 'bg-emerald-500 text-white' },
  new: { label: 'New Arrival', className: 'bg-violet-500 text-white' },
};

const ProductPage = () => {
  const { id } = useParams();
  const { addToRecentlyViewed, trackProductView, toggleShortlist, isInShortlist, toggleComparison, isInComparison, trackWhatsAppClick } = useApp();
  const [copiedSku, setCopiedSku] = useState(false);

  const product = getProductById(id || '');
  
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
      trackProductView(product.id);
    }
  }, [product, addToRecentlyViewed, trackProductView]);

  const handleWhatsApp = () => {
    if (!product) return;
    trackWhatsAppClick();
    const message = encodeURIComponent(`Hi! I'm interested in SKU ${product.sku} - ${product.name}. Sharing my product list shortly.`);
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
  };

  const handlePhotoInquiry = () => {
    trackWhatsAppClick();
    const message = encodeURIComponent("Hi! I'm sharing my order sheet/photo. Please match products and send a quote.");
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
  };

  const copySku = () => {
    if (!product) return;
    navigator.clipboard.writeText(product.sku);
    setCopiedSku(true);
    toast({ description: 'SKU copied to clipboard' });
    setTimeout(() => setCopiedSku(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container">
          <p className="text-center text-muted-foreground">Product not found</p>
        </main>
      </div>
    );
  }

  const inShortlist = isInShortlist(product.id);
  const inComparison = isInComparison(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-foreground">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-square bg-secondary/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                {product.badge && (
                  <Badge className={cn('absolute top-4 left-4', badgeConfig[product.badge].className)}>
                    {badgeConfig[product.badge].label}
                  </Badge>
                )}
                <span className="text-8xl font-bold text-muted-foreground/20">
                  {product.brand.charAt(0)}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  <Link to={`/brand/${product.brand.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground">
                    {product.brand}
                  </Link>
                  {' · '}
                  {product.series}
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={copySku}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedSku ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    SKU: {product.sku}
                  </button>
                </div>

                <p className="text-3xl font-semibold mb-6">
                  ₹{product.listPrice.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-2">List Price</span>
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 mb-8">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="h-5 w-5" />
                  Enquire on WhatsApp
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handlePhotoInquiry}
                >
                  <Camera className="h-5 w-5" />
                  Upload Order Photo
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className={cn('flex-1 gap-2', inShortlist && 'bg-red-50 text-red-600 dark:bg-red-950')}
                    onClick={() => toggleShortlist(product.id)}
                  >
                    <Heart className={cn('h-4 w-4', inShortlist && 'fill-current')} />
                    {inShortlist ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="secondary"
                    className={cn('flex-1 gap-2', inComparison && 'bg-accent/10 text-accent')}
                    onClick={() => toggleComparison(product.id)}
                  >
                    <GitCompare className="h-4 w-4" />
                    {inComparison ? 'In Compare' : 'Compare'}
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                  <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="mt-4">
                  <div className="rounded-2xl border border-border overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <div
                        key={key}
                        className={cn(
                          'flex items-center justify-between py-3 px-4 hover:bg-secondary/50 transition-colors',
                          idx !== Object.entries(product.specs).length - 1 && 'border-b border-border'
                        )}
                      >
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {product.datasheetUrl && (
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <FileText className="h-4 w-4" />
                      Download Datasheet
                    </Button>
                  )}
                </TabsContent>
                <TabsContent value="description" className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default ProductPage;
