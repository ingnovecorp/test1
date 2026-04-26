import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { products } from "../data/products";
import {
  ChevronRight, ShieldCheck, Clock, Package, Download,
  CheckCircle2, FileText, ArrowLeft, Star, Zap
} from "lucide-react";

interface ProductDetailProps {
  onNavigate: (page: string, productId?: number) => void;
  productId?: number;
}

const technicalSpecs: Record<number, { param: string; value: string }[]> = {
  1: [
    { param: "Rango de Medición (pH)", value: "0.00 – 14.00 pH" },
    { param: "Tolerancia (pH)", value: "± 0.01 pH" },
    { param: "Rango de Conductividad", value: "0 – 200 mS/cm" },
    { param: "Oxígeno Disuelto", value: "0 – 20 mg/L" },
    { param: "Turbidez", value: "0 – 4000 NTU" },
    { param: "Interfaz de Comunicación", value: "RS485 / Modbus RTU" },
    { param: "Temperatura de Operación", value: "0°C – 50°C" },
    { param: "Alimentación Eléctrica", value: "100–240 VAC, 50/60 Hz" },
    { param: "Grado de Protección", value: "IP65" },
    { param: "Almacenamiento de Datos", value: "10,000 registros con marca temporal" },
  ],
  2: [
    { param: "Rango de pH", value: "0.00 – 14.00 pH" },
    { param: "Resolución", value: "0.01 pH" },
    { param: "Precisión", value: "± 0.01 pH" },
    { param: "Compensación de Temperatura", value: "Automática 0°C – 100°C (ATC)" },
    { param: "Interfaz", value: "USB / RS232" },
    { param: "Pantalla", value: "LCD retroiluminada" },
    { param: "Alimentación", value: "Batería AA x4 / Adaptador 9VDC" },
    { param: "Grado de Protección", value: "IP57 – Resistente al agua" },
    { param: "Memoria", value: "500 registros con fecha/hora" },
    { param: "Calibración", value: "1 a 5 puntos automática" },
  ],
  3: [
    { param: "Rango de Turbidez", value: "0.01 – 4000 NTU" },
    { param: "Resolución", value: "0.01 NTU (0–99.99 NTU)" },
    { param: "Precisión", value: "± 2% de lectura + 0.01 NTU" },
    { param: "Fuente de Luz", value: "LED infrarrojo de larga vida" },
    { param: "Normas Cumplidas", value: "EPA 180.1 / ISO 7027" },
    { param: "Temperatura de Muestra", value: "5°C – 50°C" },
    { param: "Interfaz", value: "USB" },
    { param: "Alimentación", value: "100–240 VAC, 50/60 Hz" },
    { param: "Memoria", value: "1500 mediciones" },
    { param: "Celdas de Muestra", value: "Cuarzo óptico 25 mm" },
  ],
  default: [
    { param: "Temperatura de Operación", value: "0°C – 50°C" },
    { param: "Alimentación Eléctrica", value: "100–240 VAC, 50/60 Hz" },
    { param: "Grado de Protección", value: "IP65" },
    { param: "Interfaz de Comunicación", value: "RS485 / Modbus RTU" },
    { param: "Calibración", value: "Automática multipunto" },
    { param: "Almacenamiento de Datos", value: "5,000 registros con marca temporal" },
    { param: "Normas Cumplidas", value: "ISO 9001:2015 / CE Marking" },
    { param: "Garantía", value: "Ver ficha de producto" },
  ],
};

const certifications = [
  { name: "ISO 9001:2015", desc: "Sistema de Gestión de Calidad" },
  { name: "ISO 10012:2003", desc: "Procesos de Medición y Equipos" },
  { name: "ISO/IEC 17025:2017", desc: "Competencia de Laboratorios" },
  { name: "CE Marking", desc: "Conformidad Europea" },
  { name: "RoHS Compliant", desc: "Restricción de Sustancias Peligrosas" },
  { name: "NIST Traceable", desc: "Trazabilidad a Estándares Nacionales" },
];

export function ProductDetail({ onNavigate, productId = 1 }: ProductDetailProps) {
  const product = products.find((p) => p.id === productId) ?? products[0];
  const specs = technicalSpecs[productId] ?? technicalSpecs.default;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const otherRelated = products
    .filter(
      (p) => p.id !== product.id &&
        !relatedProducts.find((r) => r.id === p.id) &&
        p.industries.some((ind) => product.industries.includes(ind))
    )
    .slice(0, 3 - relatedProducts.length);

  const allRelated = [...relatedProducts, ...otherRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="border-b border-border bg-secondary">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm flex-wrap">
            <button
              onClick={() => onNavigate("home")}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Catálogo
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium truncate max-w-xs">{product.sku}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Hero Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-14">
          {/* Image column */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, ...products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => p.image)].map(
                (img, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg overflow-hidden border cursor-pointer ${
                      i === 0 ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Vista ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-primary font-medium uppercase tracking-widest">
                  {product.category}
                </span>
                {product.inStock ? (
                  <Badge className="bg-[#10B981] text-white text-xs px-2.5 py-0.5">
                    ✓ Stock: {product.stockLocation}
                  </Badge>
                ) : (
                  <Badge className="bg-muted-foreground text-white text-xs px-2.5 py-0.5">
                    Bajo pedido
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-semibold text-foreground leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-muted-foreground font-mono">SKU: {product.sku}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Industries */}
            <div className="flex flex-wrap gap-2">
              {product.industries.map((ind) => (
                <span
                  key={ind}
                  className="px-2.5 py-1 bg-secondary border border-border rounded-full text-xs text-muted-foreground"
                >
                  {ind}
                </span>
              ))}
            </div>

            {/* Key specs */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
              <div className="text-center space-y-1">
                <div className="flex justify-center"><Clock className="w-5 h-5 text-primary" /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Entrega</p>
                <p className="text-sm font-medium text-foreground">{product.deliveryTime}</p>
              </div>
              <div className="text-center space-y-1">
                <div className="flex justify-center"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Garantía</p>
                <p className="text-sm font-medium text-foreground">{product.warranty}</p>
              </div>
              <div className="text-center space-y-1">
                <div className="flex justify-center"><Star className="w-5 h-5 text-primary" /></div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Certificación</p>
                <p className="text-sm font-medium text-foreground">ISO 9001</p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-1">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Zap className="w-4 h-4 mr-2" />
                Ejecutar Cotización Automatizada
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-border hover:bg-accent"
              >
                <FileText className="w-4 h-4 mr-2" />
                Solicitar Demostración Técnica
              </Button>
            </div>

            {/* Trust note */}
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              Incluye certificado de calibración NIST trazable y soporte técnico 24/7
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="space-y-6">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto gap-1">
            {[
              { value: "specs", label: "Especificaciones Técnicas" },
              { value: "docs", label: "Documentación PDF" },
              { value: "iso", label: "Normativa ISO" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-5 py-3 text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Specs Tab */}
          <TabsContent value="specs" className="mt-6 space-y-6">
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="text-left py-4 px-6 text-sm font-medium text-foreground w-1/2">Parámetro</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-foreground">Especificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((row, i) => (
                      <tr key={i} className="border-b border-border hover:bg-accent/40 transition-colors last:border-0">
                        <td className="py-3.5 px-6 text-sm text-muted-foreground">{row.param}</td>
                        <td className="py-3.5 px-6 text-sm text-foreground font-medium">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Calibración", desc: "Automática de 1 a 5 puntos con reconocimiento de buffer estándar NIST" },
                { title: "Almacenamiento", desc: "Hasta 10,000 registros con marca temporal y exportación CSV/USB" },
                { title: "Protección IP", desc: "IP65 – Resistente a polvo y chorros directos de agua" },
              ].map((item) => (
                <Card key={item.title} className="p-5 border border-border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Docs Tab */}
          <TabsContent value="docs" className="mt-6">
            <Card className="p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Documentación Técnica Disponible</h3>
                  <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                    Descargar Todo
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: `Manual de Usuario ${product.sku}`, size: "2.4 MB", type: "PDF" },
                    { name: "Guía de Instalación y Configuración", size: "1.8 MB", type: "PDF" },
                    { name: "Certificado de Calibración", size: "450 KB", type: "PDF" },
                    { name: "Hoja de Datos de Seguridad (MSDS)", size: "890 KB", type: "PDF" },
                    { name: "Guía Rápida de Inicio", size: "340 KB", type: "PDF" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/40 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* ISO Tab */}
          <TabsContent value="iso" className="mt-6">
            <Card className="p-8 border border-border">
              <div className="space-y-6">
                <h3 className="font-semibold text-foreground">Certificaciones y Cumplimiento Normativo</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-accent/40 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{cert.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Todos los equipos son calibrados y certificados antes de su entrega.
                    La documentación de calibración incluye trazabilidad a estándares NIST y
                    certificados de laboratorios acreditados ISO/IEC 17025.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {allRelated.length > 0 && (
          <div className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-foreground">Equipos Relacionados</h3>
              <button
                onClick={() => onNavigate("home")}
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
              >
                Ver catálogo completo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allRelated.map((related) => (
                <Card
                  key={related.id}
                  className="group border border-border hover:border-primary/30 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                  onClick={() => onNavigate("product-detail", related.id)}
                >
                  <div className="h-36 overflow-hidden">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-xs text-primary font-medium">{related.category}</span>
                    <h4 className="font-medium text-foreground text-sm leading-snug">{related.name}</h4>
                    <div className="flex items-center justify-between">
                      {related.inStock ? (
                        <span className="text-xs text-[#10B981] font-medium">● En Stock</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Bajo pedido</span>
                      )}
                      <span className="text-xs text-primary font-medium flex items-center gap-0.5">
                        Ver ficha <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
