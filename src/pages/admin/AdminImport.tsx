import { useState, useCallback } from 'react';
import { 
  Upload, FileText, AlertCircle, CheckCircle, X, 
  RefreshCw, Download, ChevronDown, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ParsedProduct {
  id: string;
  sku: string;
  name: string;
  series: string;
  listPrice: number;
  pageNo: number;
  confidence: number;
  selected: boolean;
  imageUrl?: string;
}

const mockParsedProducts: ParsedProduct[] = [
  { id: '1', sku: 'LK-ENT-SW-01', name: 'Entice 1 Way Switch 10AX', series: 'Entice', listPrice: 249, pageNo: 12, confidence: 0.95, selected: true },
  { id: '2', sku: 'LK-ENT-SW-02', name: 'Entice 2 Way Switch 10AX', series: 'Entice', listPrice: 289, pageNo: 12, confidence: 0.92, selected: true },
  { id: '3', sku: 'LK-ENT-DIM-01', name: 'Entice Dimmer 400W', series: 'Entice', listPrice: 599, pageNo: 14, confidence: 0.78, selected: true },
  { id: '4', sku: 'ABB-MCB-16A', name: 'MCB Single Pole 16A', series: 'S200', listPrice: 185, pageNo: 8, confidence: 0.88, selected: true },
  { id: '5', sku: 'UNKNOWN-001', name: 'Product Name Unclear', series: '-', listPrice: 0, pageNo: 22, confidence: 0.45, selected: false },
];

const AdminImport = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.csv'))) {
      handleFileUpload(file);
    } else {
      toast.error('Please upload a PDF or CSV file');
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsParsing(true);
    setParseProgress(0);

    // Simulate parsing progress
    const interval = setInterval(() => {
      setParseProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate parsing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setParsedProducts(mockParsedProducts);
    setIsParsing(false);
    setShowPreview(true);
    toast.success(`Parsed ${mockParsedProducts.length} products from ${file.name}`);
  };

  const toggleProduct = (id: string) => {
    setParsedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    );
  };

  const toggleAll = (selected: boolean) => {
    setParsedProducts(prev => prev.map(p => ({ ...p, selected })));
  };

  const handleImport = () => {
    const selectedCount = parsedProducts.filter(p => p.selected).length;
    toast.success(`Imported ${selectedCount} products`);
    setShowPreview(false);
    setParsedProducts([]);
    setUploadedFile(null);
  };

  const updateProduct = (id: string, field: keyof ParsedProduct, value: string | number) => {
    setParsedProducts(prev =>
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Import Catalog</h1>
        <p className="text-muted-foreground">Upload PDF or CSV files to import products</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-muted-foreground/50'
            }`}
          >
            {isParsing ? (
              <div className="space-y-4">
                <RefreshCw className="h-12 w-12 mx-auto text-primary animate-spin" />
                <div>
                  <p className="font-medium mb-2">Parsing {uploadedFile?.name}...</p>
                  <Progress value={parseProgress} className="w-64 mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">{parseProgress}%</p>
                </div>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Drop your catalog file here</p>
                <p className="text-muted-foreground mb-4">Supports PDF and CSV files</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.csv"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Imports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { file: 'LK_PriceList_May2024.pdf', products: 156, date: '2 days ago', status: 'success' },
              { file: 'ABB_Catalog_2024.pdf', products: 89, date: '1 week ago', status: 'success' },
              { file: 'Polycab_Wires.csv', products: 45, date: '2 weeks ago', status: 'success' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{item.file}</p>
                    <p className="text-xs text-muted-foreground">{item.products} products • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Imported
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Imported Products Preview
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between py-4 border-b border-border">
            <div className="flex items-center gap-4">
              <Checkbox 
                checked={parsedProducts.every(p => p.selected)}
                onCheckedChange={(checked) => toggleAll(!!checked)}
              />
              <span className="text-sm text-muted-foreground">
                {parsedProducts.filter(p => p.selected).length} of {parsedProducts.length} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <AlertCircle className="h-3 w-3 text-warning" />
                {parsedProducts.filter(p => p.confidence < 0.7).length} need review
              </Badge>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground w-10"></th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">SKU</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Series</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Page</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Confidence</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Image</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {parsedProducts.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        backgroundColor: product.confidence < 0.7 ? 'hsl(var(--warning) / 0.1)' : 'transparent'
                      }}
                      className={`border-b border-border ${product.confidence < 0.7 ? 'animate-pulse' : ''}`}
                    >
                      <td className="p-3">
                        <Checkbox 
                          checked={product.selected}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={product.sku}
                          onChange={(e) => updateProduct(product.id, 'sku', e.target.value)}
                          className="h-8 text-sm font-mono"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="h-8 text-sm"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={product.series}
                          onChange={(e) => updateProduct(product.id, 'series', e.target.value)}
                          className="h-8 text-sm w-24"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          value={product.listPrice}
                          onChange={(e) => updateProduct(product.id, 'listPrice', Number(e.target.value))}
                          className="h-8 text-sm w-24"
                        />
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{product.pageNo}</td>
                      <td className="p-3">
                        <Badge 
                          variant={product.confidence >= 0.8 ? 'default' : product.confidence >= 0.6 ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {Math.round(product.confidence * 100)}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button onClick={handleImport} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Import {parsedProducts.filter(p => p.selected).length} Products
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminImport;
