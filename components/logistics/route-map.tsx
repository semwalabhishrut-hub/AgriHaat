"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Navigation,
  Truck,
  Play,
  Pause,
  RotateCcw,
  LocateFixed,
  Search,
  Layers,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

export interface MapStop {
  id: string;
  type: "farmer" | "hub" | "buyer" | "custom";
  name: string;
  subtext: string;
  pincode: string;
  lat: number;
  lng: number;
  status: "Completed" | "In Progress" | "Upcoming";
  eta: string;
  quantityKg?: number;
}

const DEFAULT_STOPS: MapStop[] = [
  {
    id: "stop-1",
    type: "farmer",
    name: "Farmer A: Ramesh Kumar (ABC FPO)",
    subtext: "Walajabad Road, Kanchipuram · Grade A Tomatoes",
    pincode: "631501",
    lat: 12.8342,
    lng: 79.7036,
    status: "Completed",
    eta: "05:30 AM (Loaded)",
    quantityKg: 800,
  },
  {
    id: "stop-2",
    type: "farmer",
    name: "Farmer B: Suresh Reddy (GreenFields)",
    subtext: "Main Agrarian Belt, Walajabad · Grade A Tomatoes",
    pincode: "631605",
    lat: 12.7981,
    lng: 79.8152,
    status: "Completed",
    eta: "06:15 AM (Loaded)",
    quantityKg: 700,
  },
  {
    id: "stop-3",
    type: "hub",
    name: "Walajabad QC & Aggregation Hub",
    subtext: "Consolidation, Weighing & Reefer Quality Check",
    pincode: "631605",
    lat: 12.8120,
    lng: 79.8240,
    status: "In Progress",
    eta: "07:30 AM (Inspected)",
    quantityKg: 1500,
  },
  {
    id: "stop-4",
    type: "buyer",
    name: "Buyer Central Kitchen: ABC Grand",
    subtext: "No. 42 Anna Salai, Thousand Lights, Chennai",
    pincode: "600006",
    lat: 13.0604,
    lng: 80.2496,
    status: "Upcoming",
    eta: "08:45 AM (Est. Arrival)",
    quantityKg: 2000,
  },
];

export function RouteMapCanvas({ className = "" }: { className?: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const driverMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  const [stops, setStops] = useState<MapStop[]>(DEFAULT_STOPS);
  const [selectedStop, setSelectedStop] = useState<MapStop>(DEFAULT_STOPS[2]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [driverProgress, setDriverProgress] = useState(0.55); // 55% along the route
  const [driverSpeedKmH, setDriverSpeedKmH] = useState(48);
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [usingRealGps, setUsingRealGps] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;
      const L = (await import("leaflet")).default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [12.92, 79.95],
          zoom: 10,
          zoomControl: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Clean CartoDB Voyager Tile Layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://carto.com/">CartoDB</a> OpenStreetMap',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      if (!map) return;

      // Clear existing layers if any
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      // Draw Route Polyline
      const latLngs = stops.map((s) => [s.lat, s.lng]);
      polylineRef.current = L.polyline(latLngs, {
        color: "#16803A",
        weight: 4,
        dashArray: "6, 6",
        opacity: 0.8,
      }).addTo(map);

      // Add Custom Status Pins
      stops.forEach((stop, index) => {
        const isFarmer = stop.type === "farmer";
        const isHub = stop.type === "hub";
        const isBuyer = stop.type === "buyer";

        const pinColor = isFarmer ? "#16803A" : isHub ? "#2563EB" : isBuyer ? "#D97706" : "#4B5563";
        const pinLetter = isFarmer ? `F${index + 1}` : isHub ? "H" : isBuyer ? "B" : "P";

        const iconHtml = `
          <div style="
            background-color: ${pinColor};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 11px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            border: 2px solid white;
            cursor: pointer;
          ">
            ${pinLetter}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-leaflet-pin",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          setSelectedStop(stop);
        });
      });

      // Driver Live Commute Marker
      const driverIconHtml = `
        <div style="
          background-color: #172019;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          border: 2px solid #16A34A;
          animation: pulse 2s infinite;
        ">
          🚚
        </div>
      `;

      const driverIcon = L.divIcon({
        html: driverIconHtml,
        className: "custom-driver-pin",
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      // Calculate initial driver position
      const p1 = stops[1];
      const p2 = stops[3];
      const currentLat = p1.lat + (p2.lat - p1.lat) * driverProgress;
      const currentLng = p1.lng + (p2.lng - p1.lng) * driverProgress;

      driverMarkerRef.current = L.marker([currentLat, currentLng], { icon: driverIcon }).addTo(map);
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [stops]);

  // Driver Commute Simulation Loop
  useEffect(() => {
    if (!isPlaying || usingRealGps) return;

    const interval = setInterval(() => {
      setDriverProgress((prev) => {
        const next = prev >= 0.98 ? 0.1 : prev + 0.01;
        if (driverMarkerRef.current && stops.length >= 4) {
          const p1 = stops[1];
          const p2 = stops[3];
          const currentLat = p1.lat + (p2.lat - p1.lat) * next;
          const currentLng = p1.lng + (p2.lng - p1.lng) * next;
          driverMarkerRef.current.setLatLng([currentLat, currentLng]);
        }
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, stops, usingRealGps]);

  // Handle Real Device GPS Locator Toggle
  const handleToggleRealGps = () => {
    if (usingRealGps) {
      setUsingRealGps(false);
      setGpsCoordinates(null);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setGpsCoordinates({ lat: latitude, lng: longitude });
          setUsingRealGps(true);

          if (mapInstanceRef.current && driverMarkerRef.current) {
            driverMarkerRef.current.setLatLng([latitude, longitude]);
            mapInstanceRef.current.setView([latitude, longitude], 13);
          }
          setSearchFeedback(`📍 GPS Locked: Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`);
        },
        (err) => {
          setSearchFeedback("⚠️ Unable to access device GPS. Please grant location permissions.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setSearchFeedback("⚠️ Geolocation is not supported by your browser.");
    }
  };

  // Handle Pincode / Location Lookup
  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = pincodeQuery.trim();
    if (!query) return;

    // Simulated Pincode Geocoding Database for Tamil Nadu / AP Agrarian corridors
    const PIN_GEOCODES: Record<string, { name: string; lat: number; lng: number; sub: string }> = {
      "631501": { name: "Kanchipuram Farmer Cluster", lat: 12.8342, lng: 79.7036, sub: "Kanchipuram District" },
      "631605": { name: "Walajabad Aggregation Centre", lat: 12.8120, lng: 79.8240, sub: "Walajabad Taluk" },
      "600006": { name: "Thousand Lights Central Facility", lat: 13.0604, lng: 80.2496, sub: "Chennai Central" },
      "603001": { name: "Chengalpattu Farm Belt", lat: 12.6819, lng: 79.9888, sub: "Chengalpattu District" },
      "524001": { name: "Nellore Onion Cluster", lat: 14.4426, lng: 79.9865, sub: "Nellore, Andhra Pradesh" },
    };

    const found = PIN_GEOCODES[query];
    if (found) {
      const newStop: MapStop = {
        id: `stop-custom-${Date.now()}`,
        type: "custom",
        name: found.name,
        subtext: `Pincode: ${query} · ${found.sub}`,
        pincode: query,
        lat: found.lat,
        lng: found.lng,
        status: "Upcoming",
        eta: "Scheduled Checkpoint",
      };

      setStops((prev) => [...prev, newStop]);
      setSelectedStop(newStop);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([found.lat, found.lng], 12);
      }
      setSearchFeedback(`✓ Added & pinned ${found.name} (Pincode ${query}) to route!`);
      setPincodeQuery("");
    } else {
      setSearchFeedback(`📍 Pincode ${query} registered. Centering regional corridor coordinates.`);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([12.85, 79.85], 11);
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ─── Top Control & Search Bar ─── */}
      <div className="rounded-3xl border border-[#E2E7E2] bg-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Pincode Search */}
        <form onSubmit={handlePincodeSearch} className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="size-4 text-[#687D6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pincodeQuery}
              onChange={(e) => setPincodeQuery(e.target.value)}
              placeholder="Search or add pin by Pincode (e.g. 631501, 631605, 600006)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2E7E2] text-xs outline-none focus:border-[#16803A] bg-[#FAFAF7]"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-[#172019] px-4 py-2 text-xs font-bold text-white hover:bg-[#172019]/90 transition"
          >
            Locate Pin
          </button>
        </form>

        {/* Live GPS & Simulation Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleRealGps}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-2xs ${
              usingRealGps
                ? "bg-[#16803A] text-white ring-2 ring-[#16803A]/30"
                : "border border-[#E2E7E2] bg-white text-[#172019] hover:bg-[#EEF7EF]"
            }`}
          >
            <LocateFixed className="size-3.5" />
            {usingRealGps ? "Live Driver GPS Active" : "Track Driver via GPS"}
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-[#FAFAF7] px-3.5 py-2 text-xs font-semibold text-[#172019] hover:bg-[#EEF7EF] transition"
          >
            {isPlaying ? <Pause className="size-3.5 text-[#16803A]" /> : <Play className="size-3.5 text-[#16803A]" />}
            <span>{isPlaying ? "Pause Commute" : "Simulate Transit"}</span>
          </button>
        </div>
      </div>

      {searchFeedback && (
        <div className="text-xs font-semibold text-[#16803A] bg-[#EEF7EF] border border-[#16803A]/20 px-4 py-2 rounded-2xl animate-in fade-in">
          {searchFeedback}
        </div>
      )}

      {/* ─── Map & Selected Inspection View ─── */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: Leaflet Interactive Map Container (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs relative h-[480px]">
          <div ref={mapContainerRef} className="h-full w-full z-0" />

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 z-10 rounded-2xl bg-white/95 px-3.5 py-2 text-xs font-bold text-[#172019] shadow-md border border-[#E2E7E2] backdrop-blur-xs flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#16803A] animate-ping" />
            <span>Multi-Stop Route #RT-KCH-CHN-001 (124 km)</span>
          </div>

          {/* Driver Telemetry Floating Pill */}
          <div className="absolute bottom-4 left-4 z-10 rounded-2xl bg-[#172019]/95 px-4 py-2.5 text-xs text-white shadow-lg backdrop-blur-xs flex items-center gap-3">
            <Truck className="size-4 text-[#16A34A]" />
            <div>
              <p className="font-bold text-[11px] text-[#16A34A]">Vehicle TN-21-AX-9942</p>
              <p className="text-[10px] text-gray-300">
                Speed: {driverSpeedKmH} km/h · ETA Buyer: 08:45 AM ({Math.round(driverProgress * 100)}% route complete)
              </p>
            </div>
          </div>
        </div>

        {/* Right: Selected Stop & Telemetry Inspector (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                INSPECTED CHECKPOINT
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  selectedStop.status === "Completed"
                    ? "bg-[#EEF7EF] text-[#16803A]"
                    : selectedStop.status === "In Progress"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {selectedStop.status}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#172019]">{selectedStop.name}</h3>
              <p className="text-xs text-[#687D6B] mt-0.5">{selectedStop.subtext}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-[#FAFAF7] p-2.5 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">Pincode:</span>
                <p className="font-mono font-bold text-[#172019]">{selectedStop.pincode}</p>
              </div>
              <div className="rounded-xl bg-[#FAFAF7] p-2.5 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">Schedule / ETA:</span>
                <p className="font-bold text-[#16803A]">{selectedStop.eta}</p>
              </div>
              <div className="rounded-xl bg-[#FAFAF7] p-2.5 border border-[#E2E7E2] col-span-2">
                <span className="text-[#687D6B]">GPS Coordinates:</span>
                <p className="font-mono text-[11px] text-[#172019]">
                  Lat: {selectedStop.lat.toFixed(4)}, Lng: {selectedStop.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {selectedStop.quantityKg && (
              <div className="rounded-2xl bg-[#EEF7EF] p-3 text-xs border border-[#16803A]/20">
                <div className="flex justify-between font-bold text-[#16803A]">
                  <span>Loaded Produce Weight:</span>
                  <span>{selectedStop.quantityKg} kg</span>
                </div>
              </div>
            )}
          </div>

          {/* List of stops */}
          <div className="border-t border-[#E2E7E2] pt-3 space-y-1.5">
            <p className="text-[10px] font-bold uppercase text-[#687D6B]">All Stops on Route:</p>
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
              {stops.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedStop(s);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([s.lat, s.lng], 12);
                    }
                  }}
                  className={`w-full p-2 rounded-xl text-left text-xs transition flex justify-between items-center ${
                    selectedStop.id === s.id
                      ? "bg-[#EEF7EF] text-[#16803A] font-bold"
                      : "hover:bg-[#FAFAF7] text-[#172019]"
                  }`}
                >
                  <span className="truncate">{idx + 1}. {s.name.split(":")[0]}</span>
                  <span className="font-mono text-[10px] text-[#687D6B] ml-2 shrink-0">{s.pincode}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const RouteMap = RouteMapCanvas;
