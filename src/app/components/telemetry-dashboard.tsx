import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";
import { Activity, Droplets, Waves, Thermometer, RefreshCw, MapPin } from "lucide-react";

// Generate realistic 24-hour telemetry data
function genPhData() {
  const base = [7.0, 7.1, 7.2, 7.15, 7.3, 7.25, 7.4, 7.35, 7.2, 7.1, 7.0, 7.05,
    7.2, 7.3, 7.35, 7.4, 7.3, 7.25, 7.2, 7.15, 7.1, 7.05, 7.0, 7.1];
  return base.map((v, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: parseFloat((v + (Math.random() - 0.5) * 0.08).toFixed(2)),
  }));
}

function genTurbData() {
  const base = [2.1, 2.3, 2.0, 1.9, 2.2, 2.5, 3.1, 3.8, 4.2, 3.9, 3.5, 3.2,
    3.0, 2.8, 2.5, 2.3, 2.1, 2.4, 2.7, 3.0, 3.2, 2.9, 2.6, 2.2];
  return base.map((v, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: parseFloat((v + (Math.random() - 0.5) * 0.3).toFixed(2)),
  }));
}

function genCondData() {
  const base = [142, 143, 141, 140, 145, 148, 150, 152, 149, 147, 145, 144,
    143, 145, 147, 149, 148, 146, 145, 143, 142, 141, 143, 144];
  return base.map((v, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: Math.round(v + (Math.random() - 0.5) * 4),
  }));
}

function genOdData() {
  const base = [8.2, 8.1, 8.3, 8.4, 8.3, 8.1, 7.9, 7.8, 7.7, 7.9, 8.0, 8.2,
    8.3, 8.4, 8.2, 8.1, 8.0, 7.9, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3];
  return base.map((v, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    value: parseFloat((v + (Math.random() - 0.5) * 0.15).toFixed(2)),
  }));
}

const stations = [
  { id: "A", name: "Estación A", location: "Zona 10", status: "online", lat: "14.6097", lng: "-90.5093" },
  { id: "B", name: "Estación B", location: "Fraijanes", status: "online", lat: "14.4992", lng: "-90.4335" },
  { id: "C", name: "Estación C", location: "Amatitlán", status: "warning", lat: "14.4750", lng: "-90.6169" },
];

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="font-semibold text-foreground">
          {payload[0].value} <span className="text-muted-foreground">{unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function TelemetryDashboard() {
  const [activeStation, setActiveStation] = useState("A");
  const [phData] = useState(genPhData());
  const [turbData] = useState(genTurbData());
  const [condData] = useState(genCondData());
  const [odData] = useState(genOdData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  // Current values (last data point)
  const currentPh = phData[phData.length - 1]?.value ?? 7.2;
  const currentTurb = turbData[turbData.length - 1]?.value ?? 3.5;
  const currentCond = condData[condData.length - 1]?.value ?? 145;
  const currentOd = odData[odData.length - 1]?.value ?? 8.2;

  const activeStationData = stations.find((s) => s.id === activeStation);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Monitoreo en Tiempo Real</span>
            <h2 className="text-3xl font-semibold text-foreground">
              Panel de Telemetría
            </h2>
            <p className="text-muted-foreground">
              Datos actualizados cada 15 minutos desde sensores en campo
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Últ. actualización: {lastUpdate.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Actualizar
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Station Sidebar */}
          <aside className="bg-[#1F2937] rounded-xl p-5 space-y-4">
            <h3 className="text-white font-medium text-sm uppercase tracking-widest">Estaciones</h3>

            <div className="space-y-2">
              {stations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setActiveStation(station.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all
                    ${activeStation === station.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-[#374151] text-gray-300 hover:bg-[#4B5563]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{station.name}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      station.status === "online" ? "bg-[#10B981]" : "bg-amber-400"
                    } ${station.status === "online" ? "animate-pulse" : ""}`}></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-70">
                    <MapPin className="w-3 h-3" />
                    {station.location}
                  </div>
                </button>
              ))}
            </div>

            {/* Station info */}
            {activeStationData && (
              <div className="pt-4 border-t border-gray-700 space-y-3">
                <p className="text-gray-400 text-xs uppercase tracking-wide">Parámetros Actuales</p>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">pH</span>
                    <span className="text-white font-medium">{currentPh}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Turbidez</span>
                    <span className="text-white font-medium">{currentTurb} NTU</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Conductividad</span>
                    <span className="text-white font-medium">{currentCond} µS/cm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">OD</span>
                    <span className="text-white font-medium">{currentOd} mg/L</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                    activeStationData.status === "online"
                      ? "bg-[#10B981]/20 text-[#10B981]"
                      : "bg-amber-400/20 text-amber-400"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      activeStationData.status === "online" ? "bg-[#10B981]" : "bg-amber-400"
                    }`}></div>
                    {activeStationData.status === "online" ? "En línea" : "Advertencia"}
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Charts Grid */}
          <div className="space-y-5">
            {/* Top row - KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "pH", value: currentPh, unit: "pH", icon: <Droplets className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10", ok: currentPh >= 6.5 && currentPh <= 8.5 },
                { label: "Turbidez", value: currentTurb, unit: "NTU", icon: <Waves className="w-4 h-4" />, color: "text-amber-600", bg: "bg-amber-50", ok: currentTurb < 5 },
                { label: "Conductividad", value: currentCond, unit: "µS/cm", icon: <Activity className="w-4 h-4" />, color: "text-violet-600", bg: "bg-violet-50", ok: currentCond < 300 },
                { label: "Oxígeno Disuelto", value: currentOd, unit: "mg/L", icon: <Thermometer className="w-4 h-4" />, color: "text-emerald-600", bg: "bg-emerald-50", ok: currentOd >= 6 },
              ].map((kpi) => (
                <Card key={kpi.label} className="p-4 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 ${kpi.bg} rounded-lg flex items-center justify-center ${kpi.color}`}>
                      {kpi.icon}
                    </div>
                    <Badge className={`text-xs px-1.5 ${kpi.ok ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20" : "bg-red-50 text-red-600 border-red-100"}`}>
                      {kpi.ok ? "Normal" : "Alerta"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-semibold text-foreground">{kpi.value}</span>
                    <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* pH Chart */}
              <Card className="p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">pH — Últimas 24h</h4>
                    <p className="text-xs text-muted-foreground">Rango óptimo: 6.5 – 8.5</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                    <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                    En vivo
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={phData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} interval={5} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} domain={[6.5, 8.0]} />
                    <Tooltip content={<CustomTooltip unit="pH" />} />
                    <ReferenceLine y={6.5} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1} />
                    <ReferenceLine y={8.5} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: "#2563EB" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Turbidity Chart */}
              <Card className="p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Turbidez — Últimas 24h</h4>
                    <p className="text-xs text-muted-foreground">Límite máx: 5 NTU</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                    <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                    En vivo
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={turbData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} interval={5} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} domain={[0, 6]} />
                    <Tooltip content={<CustomTooltip unit="NTU" />} />
                    <ReferenceLine y={5} stroke="#F59E0B" strokeDasharray="4 4" strokeWidth={1} />
                    <defs>
                      <linearGradient id="turbGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      fill="url(#turbGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* Conductivity Chart */}
              <Card className="p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Conductividad — Últimas 24h</h4>
                    <p className="text-xs text-muted-foreground">Rango nominal: 130–160 µS/cm</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                    <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                    En vivo
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={condData.filter((_, i) => i % 3 === 0)} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} domain={[120, 165]} />
                    <Tooltip content={<CustomTooltip unit="µS/cm" />} />
                    <Bar dataKey="value" fill="#2563EB" radius={[3, 3, 0, 0]} opacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* OD Chart */}
              <Card className="p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Oxígeno Disuelto — Últimas 24h</h4>
                    <p className="text-xs text-muted-foreground">Mínimo requerido: 6.0 mg/L</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                    <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                    En vivo
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={odData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} interval={5} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} domain={[5.5, 9.0]} />
                    <Tooltip content={<CustomTooltip unit="mg/L" />} />
                    <ReferenceLine y={6} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1} />
                    <defs>
                      <linearGradient id="odGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#odGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
