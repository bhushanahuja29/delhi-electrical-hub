import { useState } from 'react';
import { MessageCircle, X, Camera, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppFab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackWhatsAppClick } = useApp();

  const handleQuickInquiry = () => {
    trackWhatsAppClick();
    const message = encodeURIComponent("Hi! I need help with electrical products. Please assist.");
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handlePhotoInquiry = () => {
    trackWhatsAppClick();
    const message = encodeURIComponent("Hi! I'm sharing my product list/order sheet. Please match, verify specs, and send a quote.");
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handleListInquiry = () => {
    trackWhatsAppClick();
    const message = encodeURIComponent("Hi! I'd like to share my requirements list. Please help me with availability and pricing.");
    window.open(`https://wa.me/919654102758?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 bg-card rounded-2xl shadow-float border border-border p-4 mb-4"
          >
            <h4 className="font-semibold mb-3">Quick Inquiry</h4>
            <div className="space-y-2">
              <button
                onClick={handlePhotoInquiry}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Upload Order Photo</p>
                  <p className="text-xs text-muted-foreground">Share photo & get instant quote</p>
                </div>
              </button>
              
              <button
                onClick={handleListInquiry}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Share Requirements</p>
                  <p className="text-xs text-muted-foreground">PDF or text list</p>
                </div>
              </button>
              
              <button
                onClick={handleQuickInquiry}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Send className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quick Chat</p>
                  <p className="text-xs text-muted-foreground">General inquiry</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-elevated animate-breathe"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default WhatsAppFab;
