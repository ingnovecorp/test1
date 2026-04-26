import { useState, useMemo, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, SlidersHorizontal, X, Package, ArrowRight } from "lucide-react";
import { products, categories } from "../data/products";

const industryFilters = ["Agricultura", "Acuicultura", "Hidroponía", "Farmacéutica", "Industrial", "Alimentos"];

interface ProductCatalogProps {
  onNavigate: (page: string, productId?: number) => void;
  activeIndustryFilter?: string | null;
}

export function ProductCatalog({ onNavigate, activeIndustryFilter }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    activeIndustryFilter ? [activeIndustryFilter] : []
  );
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Sync with activeIndustryFilter prop
  useEffect(() => {
    if (activeIndustryFilter) {
      setSelectedIndustries([activeIndustryFilter]);
    }
  }, [activeIndustryFilter]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedIndustries([]);
    setShowOnlyInStock(false);
  };

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedIndustries.length > 0 || showOnlyInStock;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesIndustry =
        selectedIndustries.length === 0 ||
        p.industries.some((ind) => selectedIndustries.includes(ind));
      const matchesStock = !showOnlyInStock || p.inStock;
      return matchesSearch && matchesCategory && matchesIndustry && matchesStock;
    });
  }, [searchQuery, selectedCategories, selectedIndustries, showOnlyInStock]);

  return (
    <section id="catalog" className="py-20 px-6 bg-secondary">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Catálogo B2B</span>
            <h2 className="text-3xl font-semibold text-foreground">
              Equipos de Instrumentación
            </h2>
            <p className="text-muted-foreground">
              {filtered.length} equipos disponibles • Precios y condiciones bajo consulta
            </p>
          </div>

          {/* Search */}
          <div className="relative md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar equipo, SKU o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-border"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filtros activos:
            </span>
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/8 text-primary border border-primary/20 rounded-full text-xs font-medium cursor-pointer hover:bg-primary/15"
                onClick={() => toggleCategory(cat)}
              >
                {cat} <X className="w-3 h-3" />
              </span>
            ))}
            {selectedIndustries.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/8 text-primary border border-primary/20 rounded-full text-xs font-medium cursor-pointer hover:bg-primary/15"
                onClick={() => toggleIndustry(ind)}
              >
                {ind} <X className="w-3 h-3" />
              </span>
            ))}
            {showOnlyInStock && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 rounded-full text-xs font-medium cursor-pointer hover:bg-[#10B981]/20"
                onClick={() => setShowOnlyInStock(false)}
              >
                En Stock <X className="w-3 h-3" />
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-1"
            >
              Limpiar todos
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-4">
            <Card className="p-5 border border-border bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filtros Técnicos
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <Accordion type="multiple" defaultValue={["categories", "industries", "stock"]} className="space-y-1">
                {/* Categories */}
                <AccordionItem value="categories" className="border-b border-border">
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    Categoría de Equipo
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2.5 pt-2 pb-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${cat}`}
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        <label
                          htmlFor={`cat-${cat}`}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Industries */}
                <AccordionItem value="industries" className="border-b border-border">
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    Sector Industrial
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2.5 pt-2 pb-3">
                    {industryFilters.map((ind) => (
                      <div key={ind} className="flex items-center space-x-2">
                        <Checkbox
                          id={`ind-${ind}`}
                          checked={selectedIndustries.includes(ind)}
                          onCheckedChange={() => toggleIndustry(ind)}
                        />
                        <label
                          htmlFor={`ind-${ind}`}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          {ind}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Stock */}
                <AccordionItem value="stock" className="border-b-0">
                  <AccordionTrigger className="text-sm hover:no-underline py-3">
                    Disponibilidad
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2.5 pt-2 pb-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="stock-available"
                        checked={showOnlyInStock}
                        onCheckedChange={(checked) => setShowOnlyInStock(!!checked)}
                      />
                      <label htmlFor="stock-available" className="text-sm text-muted-foreground cursor-pointer">
                        Solo en stock disponible
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="stock-zona10" />
                      <label htmlFor="stock-zona10" className="text-sm text-muted-foreground cursor-pointer">
                        Bodega Zona 10
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="stock-fraijanes" />
                      <label htmlFor="stock-fraijanes" className="text-sm text-muted-foreground cursor-pointer">
                        Bodega Fraijanes
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/* Contact CTA */}
            <Card className="p-5 border border-primary/20 bg-primary/5">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground text-sm">¿Necesita asesoría técnica?</h4>
                <p className="text-xs text-muted-foreground">
                  Nuestros especialistas pueden ayudarle a seleccionar el equipo ideal para su aplicación.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                  Contactar Especialista
                </Button>
              </div>
            </Card>
          </aside>

          {/* Product Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">No se encontraron equipos</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pruebe con otros filtros o términos de búsqueda
                  </p>
                </div>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <Card
                    key={product.id}
                    className="group border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
                  >
                    {/* Product Image */}
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {/* Stock badge */}
                      {product.inStock ? (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#10B981] text-white rounded-full text-xs font-medium shadow-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            En Stock
                          </span>
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2 py-0.5 bg-muted-foreground/80 text-white rounded-full text-xs">
                            Bajo pedido
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <span className="text-xs text-primary font-medium uppercase tracking-wide">
                          {product.category}
                        </span>
                        <h3 className="font-medium text-foreground leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          {product.stockLocation && (
                            <p className="text-xs text-muted-foreground">
                              📍 {product.stockLocation}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            🕐 {product.deliveryTime}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors group/btn text-sm"
                        onClick={() => onNavigate("product-detail", product.id)}
                      >
                        Ver Ficha Técnica
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}