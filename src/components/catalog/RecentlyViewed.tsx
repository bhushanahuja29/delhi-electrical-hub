import { useApp } from '@/contexts/AppContext';
import { getProductById } from '@/data/mockData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const RecentlyViewed = () => {
  const { recentlyViewed } = useApp();
  
  const products = recentlyViewed
    .map(id => getProductById(id))
    .filter(Boolean)
    .slice(0, 5);

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6">Recently Viewed</h3>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {products.map((product, idx) => (
              <div key={product!.id} className="flex-shrink-0 w-56">
                <ProductCard product={product!} index={idx} variant="compact" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
