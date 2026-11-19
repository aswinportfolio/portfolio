import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  Cpu,
  FileText,
  FolderGit2,
  Mail,
  Share2,
  User,
  Wrench,
} from 'lucide-react';
import { ModuleId, SOC_MODULES, SocModuleMeta } from '../data/socData';

interface SocFloorplanProps {
  activeModule: ModuleId | null;
  onSelectModule: (id: ModuleId) => void;
}

const MODULE_ICONS: Record<ModuleId, typeof User> = {
  about: User,
  projects: FolderGit2,
  skills: Wrench,
  experience: Briefcase,
  education: BookOpen,
  social: Share2,
  resume: FileText,
  contact: Mail,
};

function ModuleBlock({
  mod,
  isActive,
  onSelect,
}: {
  mod: SocModuleMeta;
  isActive: boolean;
  onSelect: (id: ModuleId) => void;
}) {
  const Icon = MODULE_ICONS[mod.id];
  const isWide = mod.span === 'wide';

  return (
    <button
      type="button"
      onClick={() => onSelect(mod.id)}
      aria-pressed={isActive}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A94C] ${
        isWide ? 'col-span-6 md:col-span-3 min-h-[144px] p-5' : 'col-span-6 sm:col-span-3 md:col-span-2 min-h-[124px] p-4'
      } ${
        isActive
          ? 'border-[#E5A94C] bg-[#171E2C] shadow-[0_0_0_1px_rgba(229,169,76,0.35)]'
          : 'border-[#222C3D] bg-[#101622]/95 hover:-translate-y-0.5 hover:border-[#E5A94C]/70 hover:bg-[#141B29]'
      }`}
    >
      {/* Top Row: Block Code + Hardware Icon */}
      <div className="flex w-full items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-medium text-[#93A4BD] transition-colors duration-150 group-hover:text-[#E5A94C]">
          {mod.code} · {mod.busLane}
        </span>
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-150 ${
            isActive
              ? 'border-[#E5A94C]/50 bg-[#E5A94C]/15 text-[#E5A94C]'
              : 'border-white/[0.08] bg-[#0B0F17] text-[#E5A94C] group-hover:border-[#E5A94C]/40'
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {/* Main Content */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-semibold tracking-tight text-[#F4F7FB] sm:text-xl">
            {mod.title}
          </h2>
          <span className="font-mono text-[11px] text-[#93A4BD] whitespace-nowrap shrink-0">
            {mod.summaryTag}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[#93A4BD]">
          {mod.subtitle}
        </p>
      </div>
    </button>
  );
}

export function SocFloorplan({ activeModule, onSelectModule }: SocFloorplanProps) {
  const upperModules = SOC_MODULES.filter((m) => m.tier === 'upper');
  const lowerModules = SOC_MODULES.filter((m) => m.tier === 'lower');

  return (
    <section
      aria-label="Inside the Portfolio System on a Chip"
      className="animate-soc-reveal mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 py-10 lg:px-8 lg:py-12"
    >
      {/* Architecture Heading */}
      <div className="mb-8 max-w-2xl text-center">
        <p className="font-mono text-xs font-medium text-[#E5A94C]">
          Architecture Overview · Revision 1.0
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-tight tracking-tight text-[#F4F7FB] [text-wrap:balance]">
          Inside the Portfolio <span className="text-[#E5A94C]">SoC</span>
        </h1>
        <p className="mt-2 text-sm text-[#93A4BD] sm:text-base">
          Every silicon block represents a discipline in my engineering profile. Select any module to open its specification drawer.
        </p>
      </div>

      {/* Physical IC Package Shell with Gold QFP Pin Strips */}
      <div className="relative w-full max-w-[920px] p-3.5 sm:p-5">
        {/* Top, Bottom, Left, Right Gold Pin Arrays */}
        <div
          aria-hidden="true"
          className="soc-pins-horizontal pointer-events-none absolute inset-x-10 top-0 h-3.5 sm:inset-x-12 sm:h-5"
        />
        <div
          aria-hidden="true"
          className="soc-pins-horizontal pointer-events-none absolute inset-x-10 bottom-0 h-3.5 sm:inset-x-12 sm:h-5"
        />
        <div
          aria-hidden="true"
          className="soc-pins-vertical pointer-events-none absolute inset-y-10 left-0 w-3.5 sm:inset-y-12 sm:w-5"
        />
        <div
          aria-hidden="true"
          className="soc-pins-vertical pointer-events-none absolute inset-y-10 right-0 w-3.5 sm:inset-y-12 sm:w-5"
        />

        {/* Ceramic Package Substrate Frame */}
        <div className="relative rounded-2xl border-2 border-[#E5A94C]/45 bg-[#0B0F17] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-4">
          {/* Corner Fiducial Alignment Marks */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 left-2.5 h-2 w-2 rounded-full border border-[#E5A94C]/60"
          />
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border border-[#E5A94C]/60"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 left-2.5 h-2 w-2 rounded-full border border-[#E5A94C]/60"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 h-2 w-2 rounded-full border border-[#E5A94C]/60"
          />

          {/* Inner Silicon Die Cavity */}
          <div className="relative overflow-hidden rounded-xl border border-[#222C3D] bg-[#0D121B] p-4 sm:p-6">
            <div className="relative z-10">
              {/* Die Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 text-xs">
                <div className="flex items-center gap-2 font-mono text-[#93A4BD]">
                  <Cpu className="h-3.5 w-3.5 text-[#E5A94C]" aria-hidden="true" />
                  <span>BC — 01</span>
                </div>
                <span className="font-display text-sm font-semibold tracking-wide text-[#F4F7FB]">
                  Personal System on a Chip
                </span>
                <span className="font-mono text-[#E5A94C]">
                  8 IP Blocks · Ready
                </span>
              </div>

              {/* Upper Module Grid (Core Logic & Portfolio Domains) */}
              <div className="mt-5 grid grid-cols-6 gap-3">
                {upperModules.map((mod) => (
                  <ModuleBlock
                    key={mod.id}
                    mod={mod}
                    isActive={activeModule === mod.id}
                    onSelect={onSelectModule}
                  />
                ))}
              </div>

              {/* Vertical Trace Connectors: Upper Grid -> System Bus */}
              <div
                aria-hidden="true"
                className="grid grid-cols-3 place-items-center py-1.5"
              >
                <div className="h-4 w-px bg-gradient-to-b from-[#222C3D] to-[#E5A94C]/70" />
                <div className="h-4 w-px bg-gradient-to-b from-[#222C3D] to-[#E5A94C]/70" />
                <div className="h-4 w-px bg-gradient-to-b from-[#222C3D] to-[#E5A94C]/70" />
              </div>

              {/* System Bus Interconnect */}
              <div className="relative overflow-hidden rounded-lg border border-[#E5A94C]/55 bg-[#090D14] px-4 py-2.5">
                <div
                  aria-hidden="true"
                  className="animate-bus-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#E5A94C]/15 to-transparent"
                />
                <div className="relative z-10 flex items-center justify-between gap-4 text-xs">
                  <span className="font-mono text-[#93A4BD] hidden sm:inline">
                    Core Logic Domain
                  </span>
                  <div className="flex items-center gap-2.5 mx-auto sm:mx-0 font-display font-semibold tracking-wider text-[#E5A94C]">
                    <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>System Bus · 32-Bit APB Interconnect</span>
                  </div>
                  <span className="font-mono text-[#93A4BD] hidden sm:inline">
                    I/O Peripherals
                  </span>
                </div>
              </div>

              {/* Vertical Trace Connectors: System Bus -> Lower Grid */}
              <div
                aria-hidden="true"
                className="grid grid-cols-3 place-items-center py-1.5"
              >
                <div className="h-4 w-px bg-gradient-to-b from-[#E5A94C]/70 to-[#222C3D]" />
                <div className="h-4 w-px bg-gradient-to-b from-[#E5A94C]/70 to-[#222C3D]" />
                <div className="h-4 w-px bg-gradient-to-b from-[#E5A94C]/70 to-[#222C3D]" />
              </div>

              {/* Lower Module Grid (I/O & Contact Peripherals) */}
              <div className="grid grid-cols-6 gap-3">
                {lowerModules.map((mod) => (
                  <ModuleBlock
                    key={mod.id}
                    mod={mod}
                    isActive={activeModule === mod.id}
                    onSelect={onSelectModule}
                  />
                ))}
              </div>

              {/* Die Footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4 font-mono text-[11px] text-[#93A4BD]">
                <span>8 Modules Indexed</span>
                <span>Select any block to inspect</span>
                <span>© {new Date().getFullYear()} Aswin P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
