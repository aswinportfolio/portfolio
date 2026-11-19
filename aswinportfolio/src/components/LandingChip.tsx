import { useState, MouseEvent } from 'react';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { PACKAGE_SPECS } from '../data/socData';

interface LandingChipProps {
  onEnterChip: () => void;
}

export function LandingChip({ onEnterChip }: LandingChipProps) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isOpening, setIsOpening] = useState(false);

  const handlePointerMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (isOpening) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-py * 6).toFixed(2)),
      ry: Number((px * 6).toFixed(2)),
    });
  };

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleTouchChip = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onEnterChip();
    }, 180);
  };

  return (
    <section
      aria-label="Banana Chip Package Overview"
      className="animate-soc-reveal mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 py-10 lg:px-8 lg:py-14"
    >
      {/* 2-Column Balanced Hero Split */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Typographic Hierarchy */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0D121B]/80 p-8 lg:col-span-6 lg:p-10">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#E5A94C]">
              Banana Chip BC-01 · Personal System on a Chip
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#F4F7FB] [text-wrap:balance]">
              Explore what sits <span className="text-[#E5A94C]">inside</span> the silicon.
            </h1>

            <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[#93A4BD]">
              I am Aswin P, an Electronics &amp; Communication Engineering graduate designing digital hardware, Verilog HDL cores, FPGA testbenches, and embedded systems.
            </p>
          </div>

          <div className="mt-8 border-t border-white/[0.07] pt-6">
            <p className="font-mono text-xs text-[#E5A94C]">
              Touch the BC-01 SoC package to inspect all 8 internal modules.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Sealed SoC Package */}
        <div className="flex items-center justify-center lg:col-span-6">
          <button
            type="button"
            onClick={handleTouchChip}
            onMouseMove={handlePointerMove}
            onMouseLeave={resetTilt}
            aria-label="Touch the BC-01 System on a Chip to reveal the internal SoC architecture"
            className={`group relative w-full max-w-[520px] p-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] sm:p-5 ${
              isOpening ? 'scale-[1.03] opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{
              transform: isOpening
                ? 'perspective(950px) scale(1.03)'
                : `perspective(950px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition:
                'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease',
            }}
          >
            {/* Outer Gold QFP Pin Arrays on All 4 Edges */}
            <div
              aria-hidden="true"
              className="soc-pins-horizontal pointer-events-none absolute inset-x-10 top-0 h-3.5 transition-opacity duration-150 group-hover:opacity-100 sm:inset-x-12 sm:h-5"
            />
            <div
              aria-hidden="true"
              className="soc-pins-horizontal pointer-events-none absolute inset-x-10 bottom-0 h-3.5 transition-opacity duration-150 group-hover:opacity-100 sm:inset-x-12 sm:h-5"
            />
            <div
              aria-hidden="true"
              className="soc-pins-vertical pointer-events-none absolute inset-y-10 left-0 w-3.5 transition-opacity duration-150 group-hover:opacity-100 sm:inset-y-12 sm:w-5"
            />
            <div
              aria-hidden="true"
              className="soc-pins-vertical pointer-events-none absolute inset-y-10 right-0 w-3.5 transition-opacity duration-150 group-hover:opacity-100 sm:inset-y-12 sm:w-5"
            />

            {/* Ceramic Package Substrate */}
            <div className="relative min-h-[360px] w-full rounded-2xl border-2 border-[#E5A94C]/50 bg-[#0A0E16] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.7)] transition-colors duration-200 group-hover:border-[#E5A94C] sm:aspect-square sm:p-6">
              {/* Pin-1 Index Marker (Top-Left IC Chamfer Indicator) */}
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 h-2.5 w-2.5 rounded-full border border-[#E5A94C]/80 bg-[#E5A94C]/25"
              />
              {/* Other 3 Corner Fiducials */}
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 h-2 w-2 rounded-full border border-[#E5A94C]/45"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-[#E5A94C]/45"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 h-2 w-2 rounded-full border border-[#E5A94C]/45"
              />

              {/* Inner Substrate Trace Ring */}
              <div className="relative flex h-full min-h-[324px] w-full flex-col justify-between overflow-hidden rounded-xl border border-[#222C3D] bg-[#0D121B] p-4 sm:min-h-0 sm:p-5">
                {/* Etched Package Traces SVG */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 400"
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-25 transition-opacity duration-200 group-hover:opacity-45"
                >
                  <g stroke="#E5A94C" strokeWidth="1" fill="none">
                    <path d="M140 0 V45 M180 0 V45 M220 0 V45 M260 0 V45" />
                    <path d="M140 400 V355 M180 400 V355 M220 400 V355 M260 400 V355" />
                    <path d="M0 140 H45 M0 180 H45 M0 220 H45 M0 260 H45" />
                    <path d="M400 140 H355 M400 180 H355 M400 220 H355 M400 260 H355" />
                  </g>
                </svg>

                {/* Top Substrate Engraving */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#93A4BD]">
                  <span>PIN 1 · BC-01</span>
                  <span className="text-[#E5A94C]">QFP-128</span>
                </div>

                {/* Central Integrated Heat Spreader (IHS) Lid */}
                <div className="relative z-10 my-3 flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-[#E5A94C]/35 bg-gradient-to-br from-[#121824] via-[#0B0F17] to-[#080B11] p-5 transition-colors duration-200 group-hover:border-[#E5A94C]/80">

                  {/* Lid Top Hardware Mark */}
                  <div className="relative z-10 flex items-center justify-start">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5A94C]/40 bg-[#0D121B]/90 text-[#E5A94C]">
                      <Cpu className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Center Laser-Etched Processor Identity */}
                  <div className="relative z-10 my-auto py-4 text-center">
                    <p className="font-display text-3xl font-bold tracking-tight text-[#F4F7FB] sm:text-4xl">
                      ASWIN P
                    </p>
                    <p className="mt-1.5 text-xs text-[#C9D5E6]">
                      Personal System on a Chip
                    </p>
                  </div>

                  {/* Lid Bottom Prompt */}
                  <div className="relative z-10 flex items-center justify-center border-t border-white/[0.1] pt-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#E5A94C] whitespace-nowrap shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
                      <span>Touch to inspect</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Bottom Substrate Engraving */}
                <div className="relative z-10 flex items-center justify-end font-mono text-[11px] text-[#F4F7FB]">
                  <span>2026</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Full-width 4-Column Specification Strip below Hero Split */}
      <div className="mt-6 grid grid-cols-2 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-[#0D121B]/60 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {PACKAGE_SPECS.map((spec) => (
          <div key={spec.label} className="px-6 py-4">
            <p className="text-xs text-[#93A4BD]">{spec.label}</p>
            <p className="mt-1 font-mono text-base font-semibold text-[#F4F7FB] tabular-nums">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
