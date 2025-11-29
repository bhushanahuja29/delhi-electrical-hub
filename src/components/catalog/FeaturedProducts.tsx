import { getFeaturedProducts, brands } from '@/data/mockData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const featuredBrands = brands.filter(b => b.featured).slice(0, 3);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        {featuredBrands.map((brand, brandIdx) => {
          const brandProducts = getFeaturedProducts(brand.name);
          if (brandProducts.length === 0) return null;

          return (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: brandIdx * 0.15 }}
              className="mb-16 last:mb-0"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    Featured from {brand.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{brand.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {brandProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
