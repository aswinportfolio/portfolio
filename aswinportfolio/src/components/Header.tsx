import { ArrowLeft, Download, Mail } from 'lucide-react';
import { CONTACT_INFO, ModuleId } from '../data/socData';

interface HeaderProps {
  view: 'landing' | 'inside';
  activeModule: ModuleId | null;
  onSelectHome: () => void;
  onEnterChip: () => void;
  onOpenModule: (id: ModuleId) => void;
}

export function Header({
  view,
  activeModule,
  onSelectHome,
  onEnterChip,
  onOpenModule,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#070A0F]/90 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#package"
          onClick={(e) => {
            e.preventDefault();
            onSelectHome();
          }}
          className="font-display text-lg font-semibold tracking-tight text-[#F4F7FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#E5A94C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C]"
        >
          Aswin P
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#93A4BD]"
        >
          <button
            type="button"
            onClick={onSelectHome}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] ${
              view === 'landing'
                ? 'text-[#F4F7FB] underline decoration-[#E5A94C] decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Package
          </button>
          <button
            type="button"
            onClick={onEnterChip}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] ${
              view === 'inside' && !activeModule
                ? 'text-[#F4F7FB] underline decoration-[#E5A94C] decoration-2 underline-offset-8'
                : ''
            }`}
          >
            SoC Die
          </button>
          <button
            type="button"
            onClick={() => onOpenModule('projects')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] ${
              activeModule === 'projects'
                ? 'text-[#F4F7FB] underline decoration-[#E5A94C] decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => onOpenModule('skills')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] ${
              activeModule === 'skills'
                ? 'text-[#F4F7FB] underline decoration-[#E5A94C] decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Skills
          </button>
          <button
            type="button"
            onClick={() => onOpenModule('contact')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F4F7FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A94C] ${
              activeModule === 'contact'
                ? 'text-[#F4F7FB] underline decoration-[#E5A94C] decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Resume download + Mail on landing; absent inside Portfolio SoC */}
        <div className="flex items-center gap-2.5 shrink-0">
          {view === 'landing' ? (
            <>
              <a
                href="/Aswin_P.pdf"
                download="Aswin_P.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#111722] px-3.5 py-2 text-xs font-semibold text-[#F4F7FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#E5A94C]/60 hover:text-[#E5A94C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A94C]"
              >
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Resume</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#E5A94C] px-3.5 py-2 text-xs font-semibold text-[#070A0F] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#F0BA65] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A94C]"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Mail</span>
              </a>
            </>
          ) : (
            <button
              type="button"
              onClick={onSelectHome}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#111722] px-3.5 py-2 text-xs font-semibold text-[#F4F7FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#E5A94C]/60 hover:text-[#E5A94C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A94C]"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Back to Package</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
