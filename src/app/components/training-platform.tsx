import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BookOpen, Play, Download, CheckCircle2, Clock, Award,
  ChevronRight, ArrowLeft, Users, BarChart2, FileText,
  Lock, PlayCircle, ChevronLeft
} from "lucide-react";

interface TrainingPlatformProps {
  onNavigate: (page: string, productId?: number) => void;
}

const courses = [
  {
    id: 1,
    title: "Calibración y Mantenimiento de Sensores DBO",
    category: "Análisis de Agua",
    duration: "45 min",
    modules: 8,
    level: "Intermedio",
    progress: 37,
    enrolled: true,
    image: "https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 2,
    title: "Fundamentos de pH y Conductividad",
    category: "pH y Conductividad",
    duration: "30 min",
    modules: 5,
    level: "Básico",
    progress: 100,
    enrolled: true,
    image: "https://images.unsplash.com/photo-1684607632799-63297cf21955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 3,
    title: "Espectrofotometría UV-VIS Avanzada",
    category: "Análisis Espectral",
    duration: "60 min",
    modules: 10,
    level: "Avanzado",
    progress: 0,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1748279265142-8238365920ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 4,
    title: "Turbidimetría: Métodos EPA e ISO 7027",
    category: "Turbidez",
    duration: "40 min",
    modules: 6,
    level: "Intermedio",
    progress: 0,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1685660375327-47bcca398780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 5,
    title: "Telemetría y Sistemas SCADA para Agua",
    category: "Monitoreo en Línea",
    duration: "75 min",
    modules: 12,
    level: "Avanzado",
    progress: 0,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1641133691343-554776de2ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 6,
    title: "Normativa ISO para Laboratorios Acreditados",
    category: "Normativa",
    duration: "50 min",
    modules: 7,
    level: "Intermedio",
    progress: 0,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1657778752979-90b85022f6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const modules = [
  { num: 1, title: "Fundamentos de DBO y DQO", duration: "5 min", completed: true },
  { num: 2, title: "Instalación y Puesta en Marcha", duration: "7 min", completed: true },
  { num: 3, title: "Calibración y Mantenimiento", duration: "12 min", completed: false, current: true },
  { num: 4, title: "Troubleshooting Avanzado", duration: "8 min", completed: false },
  { num: 5, title: "Normativas ISO 5815-1", duration: "6 min", completed: false },
  { num: 6, title: "Interpretación de Resultados", duration: "4 min", completed: false },
  { num: 7, title: "Reporte y Trazabilidad", duration: "2 min", completed: false },
  { num: 8, title: "Evaluación Final", duration: "5 min", completed: false },
];

function CourseCard({
  course,
  onSelect,
}: {
  course: typeof courses[0];
  onSelect: (id: number) => void;
}) {
  const levelColor =
    course.level === "Básico"
      ? "bg-green-50 text-green-700 border-green-100"
      : course.level === "Intermedio"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : "bg-red-50 text-red-700 border-red-100";

  return (
    <Card className="group border border-border hover:border-primary/30 hover:shadow-md transition-all overflow-hidden">
      <div className="relative h-36 overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {!course.enrolled && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${levelColor}`}>
            {course.level}
          </span>
          {course.progress === 100 && (
            <span className="px-2 py-0.5 bg-[#10B981] text-white rounded-full text-xs font-medium">
              ✓ Completado
            </span>
          )}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs text-primary font-medium mb-1">{course.category}</p>
          <h3 className="font-medium text-foreground text-sm leading-snug">{course.title}</h3>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.modules} módulos</span>
        </div>

        {course.enrolled && course.progress > 0 && course.progress < 100 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progreso</span>
              <span className="text-foreground font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1.5" />
          </div>
        )}

        <Button
          className={`w-full text-sm ${
            course.enrolled
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "variant-outline border-border text-foreground hover:bg-accent"
          }`}
          variant={course.enrolled ? "default" : "outline"}
          onClick={() => onSelect(course.id)}
        >
          {course.enrolled
            ? course.progress > 0
              ? "Continuar"
              : "Comenzar"
            : "Inscribirse"}
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
}

export function TrainingPlatform({ onNavigate }: TrainingPlatformProps) {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState(3);

  const activeCourse = courses.find((c) => c.id === selectedCourse);

  if (selectedCourse && activeCourse) {
    return (
      <div className="min-h-screen bg-white pt-16">
        {/* Breadcrumbs */}
        <div className="border-b border-border bg-secondary">
          <div className="max-w-[1440px] mx-auto px-6 py-3">
            <nav className="flex items-center gap-1.5 text-sm flex-wrap">
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Centro de Capacitación
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{activeCourse.category}</span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-foreground font-medium truncate max-w-xs">{activeCourse.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 py-10">
          {/* Module header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground">{activeCourse.title}</h1>
            <p className="text-muted-foreground mt-1">
              Módulo {activeModule} de {activeCourse.modules} • Duración estimada: {activeCourse.duration}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Main content */}
            <div className="space-y-6">
              {/* Video Player */}
              <Card className="border border-border overflow-hidden">
                <div className="aspect-video bg-[#111827] flex items-center justify-center relative">
                  <button className="group flex items-center justify-center z-10">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 group-hover:scale-110 transition-all shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1.5" fill="white" />
                    </div>
                  </button>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] to-[#0f172a]"></div>
                  {/* Play button on top */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all shadow-2xl cursor-pointer mx-auto">
                        <Play className="w-8 h-8 text-white ml-1.5" fill="white" />
                      </div>
                      <p className="text-white/70 text-sm">
                        Módulo {activeModule}: {modules.find(m => m.num === activeModule)?.title}
                      </p>
                    </div>
                  </div>
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-1 flex-1 bg-white/20 rounded-full cursor-pointer">
                          <div className="h-full w-1/3 bg-primary rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                          </div>
                        </div>
                        <span className="text-white text-xs font-medium whitespace-nowrap">15:24 / 42:18</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70">
                        <button className="hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="hover:text-white transition-colors"><Play className="w-4 h-4" /></button>
                        <button className="hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
                        <span className="text-xs ml-auto">HD • 1080p</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tabs: Transcripción / Evaluación */}
              <Tabs defaultValue="transcript">
                <TabsList className="border-b border-border w-full justify-start rounded-none bg-transparent p-0 h-auto gap-1">
                  <TabsTrigger
                    value="transcript"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-sm"
                  >
                    Transcripción Técnica
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-5 py-3 text-sm"
                  >
                    Evaluación del Módulo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="mt-5">
                  <Card className="p-6 border border-border">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Transcripción Técnica</h3>
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Descargar
                        </Button>
                      </div>
                      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        {[
                          { time: "00:15", text: "Bienvenidos al módulo de calibración y mantenimiento de sensores de Demanda Bioquímica de Oxígeno. En esta sesión cubriremos los procedimientos certificados bajo norma ISO 5815-1 para garantizar la precisión de sus mediciones." },
                          { time: "02:30", text: "El sensor DBO requiere calibración cada 30 días o después de 500 mediciones continuas, lo que ocurra primero. Antes de iniciar el proceso, verifique que la temperatura ambiente se encuentre entre 20°C y 25°C." },
                          { time: "05:45", text: "Para la calibración de dos puntos, utilizaremos soluciones estándar certificadas de glucosa-ácido glutámico con valores de 150 mg/L y 300 mg/L respectivamente. Es fundamental que estas soluciones no excedan 6 meses desde su fecha de preparación." },
                          { time: "08:20", text: "Durante el proceso de estabilización, el sensor debe permanecer sumergido en la solución estándar durante un mínimo de 5 minutos. Observe la pantalla del equipo hasta que el indicador de estabilidad muestre el símbolo de confirmación." },
                          { time: "12:15", text: "Una vez completada la calibración, el equipo generará un reporte automático que debe ser almacenado en el sistema de gestión de calidad. Este certificado incluye la desviación estándar, el coeficiente de correlación y la trazabilidad a estándares NIST." },
                          { time: "15:24", text: "El mantenimiento preventivo incluye la limpieza de la membrana del sensor con solución enzimática cada 15 días. Evite el uso de solventes orgánicos que puedan degradar el polímero de la membrana selectiva." },
                        ].map((item) => (
                          <p key={item.time}>
                            <span className="text-primary font-medium">[{item.time}]</span> {item.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz" className="mt-5">
                  <Card className="p-6 border border-border">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BarChart2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Evaluación del Módulo 3</h3>
                          <p className="text-sm text-muted-foreground">5 preguntas de opción múltiple • Aprobación: 80%</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Complete el módulo de video para habilitar la evaluación. El examen estará disponible una vez que haya visto el 90% del contenido.
                      </p>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Completar video primero
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Progress */}
              <Card className="p-5 border border-border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-sm">Progreso del Curso</h3>
                    <span className="text-primary font-semibold text-sm">{activeCourse.progress}%</span>
                  </div>
                  <Progress value={activeCourse.progress} className="h-2" />

                  {/* Module list */}
                  <div className="space-y-2 pt-2">
                    {modules.map((mod) => (
                      <button
                        key={mod.num}
                        onClick={() => setActiveModule(mod.num)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                          mod.current || activeModule === mod.num
                            ? "bg-primary/8 border border-primary/20"
                            : "hover:bg-accent"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          mod.completed
                            ? "bg-[#10B981]"
                            : mod.num === activeModule
                            ? "bg-primary"
                            : "border-2 border-border"
                        }`}>
                          {mod.completed ? (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          ) : mod.num === activeModule ? (
                            <PlayCircle className="w-3 h-3 text-white" />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug truncate ${
                            mod.num === activeModule ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}>
                            {mod.num}. {mod.title}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{mod.duration}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Tiempo restante</span>
                    </div>
                    <p className="font-semibold text-foreground">3h 15min</p>
                  </div>
                </div>
              </Card>

              {/* Resources */}
              <Card className="p-5 border border-border">
                <h3 className="font-semibold text-foreground text-sm mb-4">Recursos del Módulo</h3>
                <div className="space-y-2">
                  {[
                    { name: "Manual Operativo", type: "PDF", size: "3.2 MB", color: "bg-red-50 text-red-500" },
                    { name: "Hoja de Seguridad", type: "PDF", size: "1.1 MB", color: "bg-red-50 text-red-500" },
                    { name: "Checklist de Calibración", type: "XLSX", size: "45 KB", color: "bg-green-50 text-green-600" },
                  ].map((res) => (
                    <button
                      key={res.name}
                      className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className={`w-8 h-8 ${res.color} rounded flex items-center justify-center shrink-0`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{res.name}</p>
                        <p className="text-xs text-muted-foreground">{res.type} • {res.size}</p>
                      </div>
                      <Download className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Certification card */}
              <Card className="p-5 border border-primary/20 bg-primary/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Certificado Digital</h4>
                      <p className="text-xs text-muted-foreground">Al completar el 100%</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Obtenga su certificado avalado por Techno-Chemistry y reconocido por organismos reguladores.
                  </p>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // Course catalog view
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="border-b border-border bg-secondary">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm">
            <button
              onClick={() => onNavigate("home")}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Inicio
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-foreground font-medium">Centro de Capacitación</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#1F2937] text-white py-14 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-primary text-sm font-medium uppercase tracking-widest">LMS Técnico</span>
              <h1 className="text-4xl font-semibold leading-tight">
                Centro de Capacitación
                <span className="text-primary block">Techno-Chemistry</span>
              </h1>
              <p className="text-gray-300 leading-relaxed">
                Formación técnica especializada para operadores de instrumentación analítica,
                avalada por normativas ISO. Aprenda a calibrar, mantener y sacar el máximo provecho
                de sus equipos de laboratorio.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { icon: <BookOpen className="w-4 h-4" />, label: "6 cursos disponibles" },
                  { icon: <Users className="w-4 h-4" />, label: "+320 técnicos certificados" },
                  { icon: <Award className="w-4 h-4" />, label: "Certificados ISO validados" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-primary">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { value: "320+", label: "Técnicos certificados" },
                { value: "6", label: "Módulos especializados" },
                { value: "98%", label: "Tasa de aprobación" },
                { value: "ISO", label: "Normas cubiertas" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#374151] rounded-xl p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My courses progress */}
      <div className="py-10 px-6 bg-secondary border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-6">Mi Progreso</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.filter((c) => c.enrolled).map((course) => (
              <Card
                key={course.id}
                className="p-5 border border-border bg-white hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => setSelectedCourse(course.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-primary font-medium mb-0.5">{course.category}</p>
                      <h4 className="text-sm font-medium text-foreground leading-snug">{course.title}</h4>
                    </div>
                    {course.progress === 100 ? (
                      <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <PlayCircle className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {course.progress === 100 ? "Completado" : "En progreso"}
                      </span>
                      <span className="font-medium text-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.modules} módulos</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* All courses */}
      <div className="py-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Todos los Cursos</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              {courses.length} cursos disponibles
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={setSelectedCourse} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}