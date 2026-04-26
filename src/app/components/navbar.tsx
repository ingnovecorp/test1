import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Beaker, Cpu, BookOpen, Phone } from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string, productId?: number) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "Equipos",
      page: "home",
      icon: <Beaker className="w-4 h-4" />,
      action: () => {
        onNavigate("home");
        setTimeout(() => {
          const el = document.getElementById("catalog");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      },
    },
    {
      label: "Industrias",
      page: "home",
      icon: <Cpu className="w-4 h-4" />,
      action: () => {
        onNavigate("home");
        setTimeout(() => {
          const el = document.getElementById("industries");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      },
    },
    {
      label: "Centro de Capacitación",
      page: "training",
      icon: <BookOpen className="w-4 h-4" />,
      action: () => onNavigate("training"),
    },
    {
      label: "Contacto",
      page: "contact",
      icon: <Phone className="w-4 h-4" />,
      action: () => {
        onNavigate("home");
        setTimeout(() => {
          const el = document.getElementById("footer");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      },
    },
  ];

  const isActive = (link: typeof navLinks[0]) => {
    if (link.page === "training" && currentPage === "training") return true;
    if (link.page === "home" && currentPage === "home") return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-semibold tracking-wide">TC</span>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-foreground">Techno-Chemistry</span>
            <span className="text-xs text-muted-foreground">Instrumentación Analítica B2B</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.action();
                setMobileOpen(false);
              }}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-all
                ${isActive(link) && link.page === currentPage
                  ? "text-primary bg-primary/5 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }
              `}
            >
              {link.label}
              {isActive(link) && link.page === currentPage && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary ml-0.5"></span>
              )}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4"
          >
            Portal Inteligente
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="max-w-[1440px] mx-auto px-6 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all text-left
                  ${isActive(link) && link.page === currentPage
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }
                `}
              >
                <span className="text-primary">{link.icon}</span>
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                Portal Inteligente
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
