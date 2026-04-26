import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Phone, Mail, Linkedin, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string, productId?: number) => void;
}

const scrollTo = (sectionId: string, navigateFn: () => void) => {
  navigateFn();
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="footer" className="bg-[#111827] text-gray-300">
      {/* Top CTA Banner */}
      <div className="bg-primary px-6 py-10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-semibold text-xl mb-1">¿Listo para optimizar su control de calidad?</h3>
            <p className="text-white/80 text-sm">Solicite una demostración técnica sin costo con nuestros especialistas.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button className="bg-white text-primary hover:bg-white/90 font-medium">
              Solicitar Cotización
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() => onNavigate("training")}
            >
              Ver Cursos
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 pt-14 pb-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="space-y-5 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-semibold">TC</span>
                </div>
                <div>
                  <span className="font-semibold text-white block text-sm">Techno-Chemistry</span>
                  <span className="text-xs text-gray-500">Instrumentación Analítica B2B</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Soluciones de instrumentación analítica de precisión para control de calidad de agua en entornos industriales críticos. Certificados ISO 9001:2015.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Zona 10, Ciudad de Guatemala</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>+502 2222-3333</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>info@technochemistry.gt</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm">Productos</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Analizadores Multiparamétrico", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Medidores de pH y Conductividad", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Turbidímetros", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Espectrofotómetros UV-VIS", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Sensores de Oxígeno Disuelto", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Analizadores de Cloro", action: () => scrollTo("catalog", () => onNavigate("home")) },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm">Empresa</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Sectores de Aplicación", action: () => scrollTo("industries", () => onNavigate("home")) },
                  { label: "Centro de Capacitación", action: () => onNavigate("training") },
                  { label: "Panel de Telemetría", action: () => scrollTo("catalog", () => onNavigate("home")) },
                  { label: "Términos y Condiciones", action: () => onNavigate("home") },
                  { label: "Política de Privacidad", action: () => onNavigate("home") },
                  { label: "Certificaciones ISO", action: () => onNavigate("product-detail", 1) },
                  { label: "Soporte Técnico 24/7", action: () => onNavigate("home") },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Bodegas</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  Bodega Zona 10 — Activa
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  Bodega Fraijanes — Activa
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-sm">Boletín Técnico</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Reciba actualizaciones sobre nuevas tecnologías, normativas ISO y novedades de productos analíticos.
              </p>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email corporativo"
                  className="bg-[#1F2937] border-[#374151] text-white placeholder:text-gray-500 focus:border-primary"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Suscribirse al Boletín
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Sin spam. Solo contenido técnico relevante. Cancele cuando quiera.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2026 Techno-Chemistry S.A. — Guatemala. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <button
                  onClick={() => onNavigate("training")}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Capacitación
                </button>
                <button
                  onClick={() => onNavigate("home")}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Portal Inteligente
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
