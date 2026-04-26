import { Card } from "./ui/card";
import { Sprout, Fish, FlaskConical, Pill, Factory, UtensilsCrossed, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Industry {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  metrics: string;
  image: string;
  color: string;
}

const industries: Industry[] = [
  {
    id: 1,
    name: "Agricultura",
    icon: <Sprout className="w-6 h-6" />,
    description: "Control de pH, CE y nutrientes en suelos y sistemas de riego",
    metrics: "120+ clientes",
    image: "https://images.unsplash.com/photo-1697165927010-a966c1456ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    id: 2,
    name: "Acuicultura",
    icon: <Fish className="w-6 h-6" />,
    description: "Monitoreo de oxígeno disuelto, turbidez y temperatura en estanques",
    metrics: "80+ proyectos",
    image: "https://images.unsplash.com/photo-1628859742240-269783f56d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    id: 3,
    name: "Hidroponía",
    icon: <FlaskConical className="w-6 h-6" />,
    description: "Análisis preciso de conductividad y nutrientes para cultivos sin suelo",
    metrics: "65+ instalaciones",
    image: "https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-lime-50 text-lime-700 border-lime-100",
  },
  {
    id: 4,
    name: "Farmacéutica",
    icon: <Pill className="w-6 h-6" />,
    description: "Instrumentación certificada para control de calidad en procesos GMP",
    metrics: "45+ laboratorios",
    image: "https://images.unsplash.com/photo-1669707040789-b39a52afb84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    id: 5,
    name: "Industrial",
    icon: <Factory className="w-6 h-6" />,
    description: "Telemetría en línea y control de procesos para plantas de manufactura",
    metrics: "200+ plantas",
    image: "https://images.unsplash.com/photo-1748279265142-8238365920ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-slate-50 text-slate-700 border-slate-100",
  },
  {
    id: 6,
    name: "Alimentos",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    description: "Control microbiológico y fisicoquímico en líneas de producción alimentaria",
    metrics: "95+ empresas",
    image: "https://images.unsplash.com/photo-1685660375327-47bcca398780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    color: "bg-orange-50 text-orange-700 border-orange-100",
  },
];

interface IndustryGridProps {
  onNavigate?: (page: string) => void;
  onFilterIndustry?: (industry: string) => void;
}

export function IndustryGrid({ onNavigate, onFilterIndustry }: IndustryGridProps) {
  const handleIndustryClick = (industry: Industry) => {
    if (onFilterIndustry) {
      onFilterIndustry(industry.name);
    }
    if (onNavigate) {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById("catalog");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <section id="industries" className="py-20 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Sectores de Aplicación</span>
            <h2 className="text-3xl font-semibold text-foreground">
              Soluciones para cada industria
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Más de 600 empresas en Guatemala confían en nuestra instrumentación para sus procesos críticos.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigate) onNavigate("home");
              setTimeout(() => {
                const el = document.getElementById("catalog");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors shrink-0 font-medium"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry) => (
            <Card
              key={industry.id}
              onClick={() => handleIndustryClick(industry)}
              className="group relative overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="h-36 overflow-hidden">
                <ImageWithFallback
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 h-36 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-sm font-medium ${industry.color}`}>
                    {industry.icon}
                    {industry.name}
                  </div>
                  <span className="text-xs text-muted-foreground">{industry.metrics}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>

                <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver equipos para {industry.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
