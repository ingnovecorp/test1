export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  inStock: boolean;
  stockLocation?: string;
  image: string;
  description: string;
  industries: string[];
  deliveryTime: string;
  warranty: string;
  priceRange: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Analizador Multiparamétrico LH-G8300",
    sku: "LH-G8300-2026",
    category: "Análisis de Agua",
    inStock: true,
    stockLocation: "Bodega Fraijanes",
    image: "https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Sistema de medición multiparamétrico de alta precisión para análisis simultáneo de pH, conductividad, oxígeno disuelto y turbidez. Diseñado para entornos industriales críticos con certificación ISO 9001:2015.",
    industries: ["Industrial", "Farmacéutica", "Alimentos"],
    deliveryTime: "24-48 horas",
    warranty: "24 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 2,
    name: "Medidor de pH Digital HX-200",
    sku: "HX-200-2026",
    category: "pH y Conductividad",
    inStock: true,
    stockLocation: "Bodega Zona 10",
    image: "https://images.unsplash.com/photo-1684607632799-63297cf21955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Medidor de pH de alta precisión con compensación automática de temperatura. Ideal para control de calidad en procesos industriales y laboratorios.",
    industries: ["Agricultura", "Hidroponía", "Farmacéutica"],
    deliveryTime: "24 horas",
    warranty: "18 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 3,
    name: "Turbidímetro de Laboratorio TB-5000",
    sku: "TB-5000-2026",
    category: "Turbidez",
    inStock: false,
    image: "https://images.unsplash.com/photo-1685660375327-47bcca398780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Turbidímetro de banco de alta resolución con rango de 0-4000 NTU. Cumple con normas EPA y ISO 7027 para control de calidad de agua potable e industrial.",
    industries: ["Industrial", "Alimentos", "Acuicultura"],
    deliveryTime: "5-7 días hábiles",
    warranty: "24 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 4,
    name: "Espectrofotómetro UV-VIS SP-4000",
    sku: "SP-4000-2026",
    category: "Análisis Espectral",
    inStock: true,
    stockLocation: "Bodega Fraijanes",
    image: "https://images.unsplash.com/photo-1748279265142-8238365920ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Espectrofotómetro de doble haz con rango UV-VIS de 190-1100 nm. Precisión analítica para análisis de muestras complejas en industria farmacéutica y alimentaria.",
    industries: ["Farmacéutica", "Alimentos", "Industrial"],
    deliveryTime: "7-10 días hábiles",
    warranty: "36 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 5,
    name: "Medidor de Oxígeno Disuelto OD-8X",
    sku: "OD-8X-2026",
    category: "Oxígeno Disuelto",
    inStock: true,
    stockLocation: "Bodega Zona 10",
    image: "https://images.unsplash.com/photo-1641133691343-554776de2ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Sensor óptico de oxígeno disuelto sin membrana ni electrolito. Tecnología luminiscente con tiempo de respuesta rápido para acuicultura e industria de aguas residuales.",
    industries: ["Acuicultura", "Industrial", "Agricultura"],
    deliveryTime: "24-48 horas",
    warranty: "24 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 6,
    name: "Conductímetro Portátil EC-300",
    sku: "EC-300-2026",
    category: "pH y Conductividad",
    inStock: true,
    stockLocation: "Bodega Zona 10",
    image: "https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Conductímetro de campo con compensación de temperatura automática (ATC). Diseño robusto IP67 para monitoreo en campo de riego y cultivos hidropónicos.",
    industries: ["Agricultura", "Hidroponía", "Acuicultura"],
    deliveryTime: "24 horas",
    warranty: "18 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 7,
    name: "Analizador de Cloro CL-900",
    sku: "CL-900-2026",
    category: "Desinfección",
    inStock: false,
    image: "https://images.unsplash.com/photo-1684607632799-63297cf21955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Analizador en línea de cloro libre y cloro total para sistemas de agua potable. Alarmas configurables y comunicación Modbus para integración con SCADA.",
    industries: ["Industrial", "Alimentos"],
    deliveryTime: "10-15 días hábiles",
    warranty: "24 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 8,
    name: "Fotómetro Multiparamétrico FP-350",
    sku: "FP-350-2026",
    category: "Análisis de Agua",
    inStock: true,
    stockLocation: "Bodega Fraijanes",
    image: "https://images.unsplash.com/photo-1748279265142-8238365920ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Fotómetro portátil con más de 50 métodos preprogramados para análisis de agua. Pantalla táctil, memoria interna y conectividad USB/Bluetooth.",
    industries: ["Industrial", "Alimentos", "Farmacéutica"],
    deliveryTime: "24-48 horas",
    warranty: "18 meses",
    priceRange: "Precio bajo consulta",
  },
  {
    id: 9,
    name: "Medidor de Turbidez Portátil TB-250",
    sku: "TB-250-2026",
    category: "Turbidez",
    inStock: true,
    stockLocation: "Bodega Zona 10",
    image: "https://images.unsplash.com/photo-1685660375327-47bcca398780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    description: "Turbidímetro portátil compacto para trabajo de campo. Rango 0-1000 NTU, resistente al agua IP67, con visualización de datos en tiempo real.",
    industries: ["Acuicultura", "Agricultura", "Industrial"],
    deliveryTime: "24 horas",
    warranty: "12 meses",
    priceRange: "Precio bajo consulta",
  },
];

export const categories = ["Análisis de Agua", "pH y Conductividad", "Turbidez", "Análisis Espectral", "Oxígeno Disuelto", "Desinfección"];
export const industriesList = ["Agricultura", "Acuicultura", "Hidroponía", "Farmacéutica", "Industrial", "Alimentos"];
