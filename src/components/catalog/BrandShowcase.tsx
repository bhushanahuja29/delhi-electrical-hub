import { Link } from 'react-router-dom';
import { brands } from '@/data/mockData';
import { motion } from 'framer-motion';

const BrandShowcase = () => {
  const featuredBrands = brands.filter(b => b.featured);

  return (
    <section className="py-16 border-y border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Authorized Partner For
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {featuredBrands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/brand/${brand.slug}`}
                className="block group relative"
              >
                <span className="text-xl md:text-2xl font-semibold text-muted-foreground/40 group-hover:text-foreground transition-all duration-300">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
