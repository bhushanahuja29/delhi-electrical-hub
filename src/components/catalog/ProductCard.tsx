import { Link } from 'react-router-dom';
import { Heart, GitCompare, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact';
}

const badgeConfig = {
  popular: { label: 'Most Popular', className: 'bg-accent text-accent-foreground' },
  'best-value': { label: 'Best Value', className: 'bg-emerald-500 text-white' },
  new: { label: 'New Arrival', className: 'bg-violet-500 text-white' },
};

const ProductCard = ({ product, index = 0, variant = 'default' }: ProductCardProps) => {
  const { toggleShortlist, isInShortlist, toggleComparison, isInComparison, trackWhatsAppClick } = useApp();

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackWhatsAppClick();
    const message = encodeURIComponent(`Hi! I'm interested in SKU ${product.sku} - ${product.name}. Please share availability and pricing.`);
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
  };

  const handleShortlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleShortlist(product.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComparison(product.id);
  };

  const inShortlist = isInShortlist(product.id);
  const inComparison = isInComparison(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 group-hover:shadow-elevated group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square bg-secondary/50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground/30 text-4xl font-light">
                {product.brand.charAt(0)}
              </span>
            </div>
            
            {/* Badge */}
            {product.badge && (
              <Badge className={cn('absolute top-3 left-3 text-[10px]', badgeConfig[product.badge].className)}>
                {badgeConfig[product.badge].label}
              </Badge>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full shadow-md',
                  inShortlist && 'bg-red-50 text-red-500 dark:bg-red-950'
                )}
                onClick={handleShortlist}
              >
                <Heart className={cn('h-4 w-4', inShortlist && 'fill-current')} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full shadow-md',
                  inComparison && 'bg-accent/10 text-accent'
                )}
                onClick={handleCompare}
              >
                <GitCompare className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{product.brand} · {product.series}</p>
            <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-base">
                ₹{product.listPrice.toLocaleString()}
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-3 gap-1.5 text-xs rounded-full"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Enquire</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
