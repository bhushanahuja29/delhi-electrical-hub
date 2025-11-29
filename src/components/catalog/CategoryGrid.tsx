import { Link } from 'react-router-dom';
import { ToggleRight, Cable, Zap, Lightbulb, Fan, Smartphone } from 'lucide-react';
import { categories } from '@/data/mockData';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  ToggleRight,
  Cable,
  Zap,
  Lightbulb,
  Fan,
  Smartphone,
};

const CategoryGrid = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find exactly what you need from our comprehensive range of electrical products
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Zap;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/category/${category.slug}`} className="block group">
                  <div className="relative bg-card rounded-2xl border border-border p-6 text-center transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 hover:border-accent/20">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-4 group-hover:bg-accent/10 transition-colors"
                    >
                      <IconComponent className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
                    </motion.div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
