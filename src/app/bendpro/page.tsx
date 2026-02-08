"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Camera,
  ChevronRight,
  DoorOpen,
  Grid2X2,
  Home,
  Landmark,
  Layers,
  Plus,
  Ruler,
  Scan,
  Upload,
} from "lucide-react";

type TemplateType = "window" | "door" | "fascia" | "parapet" | "more";

type Template = {
  id: number;
  template_type: TemplateType;
  name: string;
  default_width: number;
  default_height: number;
  materials: string[];
  returns_in: number;
  hem_in: number;
  notes: string;
};

const tools: { id: TemplateType; label: string; icon: React.ElementType }[] = [
  { id: "window", label: "Window", icon: Grid2X2 },
  { id: "door", label: "Door", icon: DoorOpen },
  { id: "fascia", label: "Fascia / Rake", icon: Layers },
  { id: "parapet", label: "Parapet / Flashing", icon: Landmark },
  { id: "more", label: "More", icon: Home },
];

export default function BendProPage() {
  const [activeTool, setActiveTool] = useState<TemplateType>("door");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadTemplates() {
      const res = await fetch(`/api/templates?type=${activeTool}`);
      const data = await res.json();
      if (!isMounted) return;
      setTemplates(data.templates ?? []);
      setActiveTemplate((data.templates ?? [])[0] ?? null);
    }
    loadTemplates();
    return () => {
      isMounted = false;
    };
  }, [activeTool]);

  const displayTemplate = useMemo(() => {
    return (
      activeTemplate ?? {
        id: 0,
        template_type: activeTool,
        name: "Custom",
        default_width: 96,
        default_height: 84,
        materials: ["Aluminum", "1 in Returns", "1/2 in Hem"],
        returns_in: 1,
        hem_in: 0.5,
        notes: "Customize this template as needed.",
      }
    );
  }, [activeTemplate, activeTool]);

  const widthIn = displayTemplate.default_width;
  const heightIn = displayTemplate.default_height;

  const cycleTool = () => {
    const index = tools.findIndex((tool) => tool.id === activeTool);
    const next = tools[(index + 1) % tools.length];
    setActiveTool(next.id);
    setLastAction(`Changed type to ${next.label}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-bp-full bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-bp-texture bg-cover bg-center opacity-25 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-bp-ink bg-cover bg-center opacity-35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(254,189,23,0.18),_transparent_45%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8">
          <header className="glass-panel flex items-center justify-between rounded-2xl px-6 py-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/70 ring-1 ring-white/15">
                <span className="text-xl font-semibold text-bp-yellow">RM</span>
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "var(--font-oxanium)" }}>
                  BendPro™
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/60">Execution Standard</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/brand/rainmaker_media.jpeg"
                alt="Rainmaker Media"
                className="h-10 w-auto rounded-lg object-contain opacity-75"
              />
              <button
                className="cursor-pointer rounded-xl border border-bp-yellow/40 bg-[#22170a]/80 px-4 py-2 text-sm font-semibold text-bp-yellow transition hover:border-bp-yellow"
                onClick={() => setLastAction("New Project created")}
              >
                New Project
              </button>
              <button
                aria-label="Add project"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-bp-yellow/60 text-bp-yellow transition hover:bg-bp-yellow/10"
                onClick={() => setLastAction("Quick add pressed")}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </header>

          {lastAction && (
            <div className="mt-4 rounded-xl border border-bp-yellow/30 bg-black/40 px-4 py-3 text-sm text-bp-yellow">
              {lastAction}
            </div>
          )}

          <div className="mt-8 grid flex-1 grid-cols-[240px_1fr_320px] gap-6">
            <aside className="flex flex-col gap-4">
              <div className="glass-panel rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Tools</div>
                <div className="mt-4 flex flex-col gap-3">
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    const active = tool.id === activeTool;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "border-bp-yellow bg-bp-yellow/10 text-bp-yellow"
                            : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tool.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Capture</div>
                <div className="mt-4 grid gap-3">
                  <button
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:border-white/30"
                    onClick={() => setLastAction("Take Photo started")}
                  >
                    <span className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                  <button
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:border-white/30"
                    onClick={() => setLastAction("Scan Marker started")}
                  >
                    <span className="flex items-center gap-2">
                      <Scan className="h-4 w-4" />
                      Scan Marker
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                  <button
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:border-white/30"
                    onClick={() => setLastAction("Upload Image opened")}
                  >
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </span>
                    <ChevronRight className="h-4 w-4 text-white/50" />
                  </button>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Templates</div>
                <div className="mt-4 space-y-3">
                  {templates.length === 0 && (
                    <div className="text-sm text-white/60">No templates for this tool yet.</div>
                  )}
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setActiveTemplate(template);
                        setLastAction(`Loaded ${template.name}`);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                        activeTemplate?.id === template.id
                          ? "border-bp-yellow bg-bp-yellow/10 text-bp-yellow"
                          : "border-white/10 bg-white/5 text-white/80 hover:border-white/30"
                      }`}
                    >
                      <span>{template.name}</span>
                      <ChevronRight className="h-4 w-4 text-white/50" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="relative flex flex-col gap-6">
              <div className="glass-panel-strong rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-white/50">Project</div>
                    <div className="mt-2 text-2xl font-semibold" style={{ fontFamily: "var(--font-oxanium)" }}>
                      {activeTool === "door" ? "Garage Door" : displayTemplate.name}
                    </div>
                  </div>
                  <button
                    className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:border-white/30"
                    onClick={cycleTool}
                  >
                    Change Type
                  </button>
                </div>

                <div className="relative mt-6 h-[520px] rounded-3xl border border-white/10 bg-[linear-gradient(180deg,_rgba(80,80,80,0.55)_0%,_rgba(15,15,15,0.95)_100%)]">
                  <div className="absolute left-1/2 top-[8%] h-[70%] w-[70%] -translate-x-1/2 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,_rgba(70,70,70,0.7),_rgba(40,40,40,0.25))]">
                    <div className="absolute inset-x-0 top-0 h-10 rounded-t-3xl bg-black/30" />
                    <div className="absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-[38%] rounded-2xl border border-white/10 bg-white/10" />
                  </div>

                  <div className="absolute left-[12%] top-[12%] right-[12%]">
                    <div className="relative h-[280px]">
                      <div className="absolute inset-x-8 top-6 h-0.5 border-t-2 border-dashed border-bp-yellow/80" />
                      <div className="absolute left-7 top-5 h-3 w-3 rounded-sm bg-bp-yellow" />
                      <div className="absolute right-7 top-5 h-3 w-3 rounded-sm bg-bp-yellow" />
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 text-2xl font-semibold text-white">
                        {widthIn} <span className="text-base text-white/80">in</span>
                      </div>

                      <div className="absolute left-8 top-6 h-[200px] w-0.5 border-l-2 border-dashed border-bp-yellow/80" />
                      <div className="absolute left-7 bottom-10 h-3 w-3 rounded-sm bg-bp-yellow" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-2xl font-semibold text-white">
                        {heightIn} <span className="text-base text-white/80">in</span>
                      </div>

                      <div className="absolute bottom-6 right-8 h-0.5 border-t-2 border-dashed border-bp-yellow/80" />
                      <div className="absolute bottom-4 right-7 h-3 w-3 rounded-sm bg-bp-yellow" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/70">
                        2in Calibration Marker
                      </div>

                      <div className="absolute bottom-8 right-10 grid h-12 w-12 place-items-center rounded-md border border-white/30 bg-white/15">
                        <div className="grid h-8 w-8 grid-cols-4 gap-px">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <span key={i} className={i % 3 === 0 ? "bg-white" : "bg-transparent"} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Opening Size</div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-white/70">Width</span>
                    <span className="font-semibold">{widthIn} in</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-white/70">Height</span>
                    <span className="font-semibold">{heightIn} in</span>
                  </div>
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Materials</div>
                  <div className="mt-3 space-y-2 text-sm text-white/80">
                    {displayTemplate.materials.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Workflow</div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                    <Ruler className="h-4 w-4 text-bp-yellow" />
                    Visual measurement locked
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <Scan className="h-4 w-4 text-bp-yellow" />
                    Scan marker confirmed
                  </div>
                </div>
              </div>
            </main>

            <aside className="flex flex-col gap-4">
              <div className="glass-panel rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Bend Sheet</div>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Left jamb</span>
                    <span className="text-white/60">{heightIn} in</span>
                    <span className="font-semibold text-bp-yellow">90°</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Head</span>
                    <span className="text-white/60">{widthIn} in</span>
                    <span className="font-semibold text-bp-yellow">90°</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Right jamb</span>
                    <span className="text-white/60">{heightIn} in</span>
                    <span className="font-semibold text-bp-yellow">90°</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel-strong rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-bp-yellow/80">Next Action</div>
                <div className="mt-3 text-lg font-semibold" style={{ fontFamily: "var(--font-oxanium)" }}>
                  Generate Bend Sheet
                </div>
                <p className="mt-2 text-sm text-white/70">{displayTemplate.notes}</p>
                <button
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-bp-yellow/50 bg-black/40 px-4 py-3 text-sm font-semibold text-bp-yellow transition hover:bg-bp-yellow/10"
                  onClick={() => setLastAction("Bend sheet generated")}
                >
                  <Scan className="h-4 w-4" />
                  NEXT
                </button>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Status</div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Calibration</span>
                    <span className="text-bp-yellow">Confirmed</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Material</span>
                    <span className="text-white/80">{displayTemplate.materials[0] ?? "Aluminum"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Returns</span>
                    <span className="text-white/80">{displayTemplate.returns_in} in</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Hem</span>
                    <span className="text-white/80">{displayTemplate.hem_in} in</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
