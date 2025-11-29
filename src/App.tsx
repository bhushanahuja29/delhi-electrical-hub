import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/contexts/AppContext";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import BrandPage from "./pages/BrandPage";
import ProductPage from "./pages/ProductPage";
import ShortlistPage from "./pages/ShortlistPage";
import ComparePage from "./pages/ComparePage";
import BrandsListPage from "./pages/BrandsListPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoriesListPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/brands" element={<BrandsListPage />} />
              <Route path="/brand/:slug" element={<BrandPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/shortlist" element={<ShortlistPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
