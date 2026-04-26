import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

const stats = [
  { value: "500+", label: "Clientes B2B activos", icon: <Globe className="w-4 h-4" /> },
  { value: "2,800+", label: "Equipos en campo", icon: <Zap className="w-4 h-4" /> },
  { value: "ISO 9001", label: "Certificación vigente", icon: <ShieldCheck className="w-4 h-4" /> },
  { value: "99.4%", label: "Uptime de equipos", icon: <CheckCircle2 className="w-4 h-4" /> },
];

const badges = [
  "ISO 9001:2015 Certificado",
  "Soporte Técnico 24/7",
  "Garantía extendida hasta 36 meses",
];

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const scrollToCatalog = () => {
    if (onNavigate) onNavigate("home");
    setTimeout(() => {
      const el = document.getElementById("catalog");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="pt-16 bg-secondary overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[560px]">
          {/* Left Column */}
          <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 text-primary rounded-full text-xs font-medium border border-primary/15"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-semibold text-foreground leading-tight">
                Precisión Analítica
                <span className="text-primary block">para Entornos Críticos</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Soluciones automatizadas de instrumentación y control de calidad
                de agua certificadas bajo estándares ISO. Maximice la confiabilidad
                de sus procesos con tecnología de vanguardia.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Solicitar Cotización
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-6"
                onClick={scrollToCatalog}
              >
                Ver Catálogo B2B
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Todos los equipos incluyen certificado de calibración NIST trazable</span>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-tl-3xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Instrumentación analítica de laboratorio"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent"></div>
            </div>

            {/* Floating card - top right */}
            <div className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 border border-border z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telemetría en vivo</p>
                  <p className="text-sm font-medium text-foreground">3 Estaciones activas</p>
                </div>
              </div>
            </div>

            {/* Floating card - bottom left */}
            <div className="absolute bottom-8 left-8 bg-white rounded-xl shadow-lg p-4 border border-border z-10 max-w-[200px]">
              <p className="text-xs text-muted-foreground mb-1">Último análisis</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-foreground">7.24</span>
                <span className="text-sm text-muted-foreground">pH</span>
              </div>
              <p className="text-xs text-[#10B981] font-medium mt-1">✓ Dentro del rango óptimo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/8 rounded-lg flex items-center justify-center text-primary shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground leading-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
