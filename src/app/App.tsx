import { useState } from "react";
import { Navbar } from "./components/navbar";
import { Home } from "./components/home";
import { ProductDetail } from "./components/product-detail";
import { TrainingPlatform } from "./components/training-platform";
import { Footer } from "./components/footer";

type Page = 'home' | 'product-detail' | 'training';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);

  const handleNavigate = (page: string, productId?: number) => {
    setCurrentPage(page as Page);
    if (productId !== undefined) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'product-detail' && (
        <ProductDetail onNavigate={handleNavigate} productId={selectedProductId} />
      )}
      {currentPage === 'training' && <TrainingPlatform onNavigate={handleNavigate} />}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
