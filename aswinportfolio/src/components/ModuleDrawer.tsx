import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Printer,
  Send,
  X,
} from 'lucide-react';
import {
  ABOUT_CONTENT,
  CHIP_ASSETS,
  CONTACT_INFO,
  EDUCATION_LIST,
  EXPERIENCE_LIST,
  ModuleId,
  PROJECTS_LIST,
  ProjectDomain,
  SKILL_GROUPS,
  SkillDomain,
  SOC_MODULES,
  SOCIAL_LINKS,
} from '../data/socData';
import { ElevatorFsmDemo, SpiTimingDemo } from './HardwareDemos';
import { ImageWithFallback } from './ImageWithFallback';

interface ModuleDrawerProps {
  moduleId: ModuleId | null;
  onClose: () => void;
  onNavigateModule: (id: ModuleId) => void;
}

export function ModuleDrawer({
  moduleId,
  onClose,
  onNavigateModule,
}: ModuleDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [projectFilter, setProjectFilter] = useState<ProjectDomain>('All');
  const [skillFilter, setSkillFilter] = useState<SkillDomain>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (!moduleId) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moduleId, onClose]);

  if (!moduleId) return null;

  const currentIndex = SOC_MODULES.findIndex((m) => m.id === moduleId);
  const currentMeta = SOC_MODULES[currentIndex];
  const prevMeta =
    SOC_MODULES[(currentIndex - 1 + SOC_MODULES.length) % SOC_MODULES.length];
  const nextMeta = SOC_MODULES[(currentIndex + 1) % SOC_MODULES.length];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) return;
    setMessageSent(true);
    setSenderName('');
    setSenderEmail('');
    setMessageText('');
  };

  const filteredProjects =
    projectFilter === 'All'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.domain === projectFilter);

  const filteredSkillGroups =
    skillFilter === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.domain === skillFilter);

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:static print:block">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200 print:hidden"
      />

      {/* Slide-Over Hardware Specification Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${currentMeta.title} module specification`}
        className="relative z-10 flex h-full w-full max-w-[660px] flex-col border-l border-[#222C3D] bg-[#0B0F17] text-[#F4F7FB] shadow-2xl print:max-w-none print:border-0 print:bg-white print:text-black"
      >
        {/* Top Drawer Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-4 sm:px-8 print:hidden">
          <div className="flex items-center gap-3 font-mono text-xs text-[#93A4BD]">
            <span className="text-[#E5A94C]">{currentMeta.code}</span>
            <span aria-hidden="true">·</span>
            <span>{currentMeta.busLane}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close module drawer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#111722] text-[#F4F7FB] transition-colors duration-150 hover:border-[#E5A94C]/60 hover:text-[#E5A94C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A94C]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F7FB] sm:text-4xl print:text-black">
            {currentMeta.title}
          </h2>

          {/* MODULE 01: ABOUT */}
          {moduleId === 'about' && (
            <div className="mt-4 space-y-6">
              <p className="text-base leading-relaxed text-[#93A4BD]">
                {ABOUT_CONTENT.intro}
              </p>

              <div className="relative overflow-hidden rounded-xl border border-[#222C3D] bg-[#101622]">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <ImageWithFallback
                    src={CHIP_ASSETS.siliconDie}
                    alt={CHIP_ASSETS.siliconDieAlt}
                    fallbackTitle="Silicon Die Architecture"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="border-t border-white/[0.08] p-5">
                  <p className="font-display text-lg font-semibold text-[#F4F7FB]">
                    {ABOUT_CONTENT.headline}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ABOUT_CONTENT.pillars.map((pillar) => (
                  <article
                    key={pillar.title}
                    className="rounded-xl border border-[#222C3D] bg-[#101622] p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-[#E5A94C]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#93A4BD]">
                      {pillar.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="rounded-xl border border-[#222C3D] bg-[#101622] divide-y divide-white/[0.07]">
                {ABOUT_CONTENT.specifications.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm"
                  >
                    <span className="text-[#93A4BD]">{row.key}</span>
                    <span className="font-mono text-xs font-medium text-[#F4F7FB] text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 02: PROJECTS */}
          {moduleId === 'projects' && (
            <div className="mt-4 space-y-6">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                A curated selection of digital hardware cores, FPGA state machines, and embedded systems I have designed and built.
              </p>

              {/* Interactive Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter projects by engineering domain"
                className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-[#222C3D] bg-[#101622] p-1"
              >
                {(['All', 'Verilog & RTL', 'Embedded & IoT'] as ProjectDomain[]).map(
                  (domain) => (
                    <button
                      key={domain}
                      type="button"
                      role="tab"
                      aria-selected={projectFilter === domain}
                      onClick={() => setProjectFilter(domain)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                        projectFilter === domain
                          ? 'bg-[#E5A94C] text-[#070A0F]'
                          : 'text-[#93A4BD] hover:text-[#F4F7FB]'
                      }`}
                    >
                      {domain}
                    </button>
                  )
                )}
              </div>

              <div className="space-y-5">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-xl border border-[#222C3D] bg-[#101622]"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/[0.07] bg-[#070A0F]">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#93A4BD]">
                        <span className="text-[#E5A94C]">{project.domain}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.architecture}</span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-semibold text-[#F4F7FB]">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#93A4BD]">
                        {project.summary}
                      </p>

                      <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-[#C9D5E6]">
                        {project.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#E5A94C]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {project.interactiveDemo === 'spi-timing' && <SpiTimingDemo />}
                      {project.interactiveDemo === 'elevator-fsm' && <ElevatorFsmDemo />}

                      <p className="mt-4 border-t border-white/[0.07] pt-3 font-mono text-xs text-[#93A4BD]">
                        {project.stack.join(' · ')}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 03: SKILLS */}
          {moduleId === 'skills' && (
            <div className="mt-4 space-y-6">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                Hardware description languages, synthesis tools, embedded controllers, and protocols I build with.
              </p>

              {/* Domain Filter */}
              <div
                role="tablist"
                aria-label="Filter skills by domain"
                className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-[#222C3D] bg-[#101622] p-1"
              >
                {(
                  [
                    'All',
                    'Hardware & RTL',
                    'Embedded & Firmware',
                    'Software & Tools',
                  ] as SkillDomain[]
                ).map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    role="tab"
                    aria-selected={skillFilter === domain}
                    onClick={() => setSkillFilter(domain)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                      skillFilter === domain
                        ? 'bg-[#E5A94C] text-[#070A0F]'
                        : 'text-[#93A4BD] hover:text-[#F4F7FB]'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {filteredSkillGroups.map((group) => (
                  <section
                    key={group.domain}
                    className="rounded-xl border border-[#222C3D] bg-[#101622] p-5"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#E5A94C]">
                      {group.domain}
                    </h3>
                    <p className="mt-1 text-xs text-[#93A4BD]">{group.description}</p>

                    <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
                      {group.items.map((skill) => (
                        <div key={skill.name} className="bg-[#0D121B] px-4 py-3">
                          <p className="font-mono text-sm font-medium text-[#F4F7FB]">
                            {skill.name}
                          </p>
                          <p className="mt-0.5 text-xs text-[#93A4BD]">{skill.focus}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 04: EXPERIENCE */}
          {moduleId === 'experience' && (
            <div className="mt-4 space-y-5">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                Hands-on digital design, embedded prototyping, and technical training milestones.
              </p>

              <div className="space-y-4">
                {EXPERIENCE_LIST.map((exp) => (
                  <article
                    key={exp.id}
                    className="rounded-xl border border-[#222C3D] bg-[#101622] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#93A4BD]">
                      <span className="text-[#E5A94C]">{exp.period}</span>
                      <span>{exp.context}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#F4F7FB]">
                      {exp.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#93A4BD]">
                      {exp.description}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-white/[0.07] pt-3 text-xs text-[#C9D5E6]">
                      {exp.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#E5A94C]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 05: EDUCATION */}
          {moduleId === 'education' && (
            <div className="mt-4 space-y-5">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                Academic progression from foundational mechanical engineering into electronics, communication systems, and digital silicon design.
              </p>

              <div className="space-y-4">
                {EDUCATION_LIST.map((edu) => (
                  <article
                    key={edu.id}
                    className="rounded-xl border border-[#222C3D] bg-[#101622] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-[#E5A94C]">{edu.period}</span>
                      <span className="text-[#93A4BD]">{edu.status}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#F4F7FB]">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#C9D5E6]">{edu.field}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#93A4BD]">
                      {edu.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 06: SOCIAL */}
          {moduleId === 'social' && (
            <div className="mt-4 space-y-5">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                Explore my repositories, hardware notes, and professional profiles.
              </p>

              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-xl border border-[#222C3D] bg-[#101622] p-5 transition-colors duration-150 hover:border-[#E5A94C]/70 hover:bg-[#141B29]"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#E5A94C]">
                        <span>{link.platform}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#93A4BD]">{link.handle}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#93A4BD]">
                        {link.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#93A4BD] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E5A94C]"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 07: RESUME */}
          {moduleId === 'resume' && (
            <div className="mt-4 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                <p className="text-sm text-[#93A4BD]">
                  Download Aswin&apos;s engineering resume or print directly.
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="/Aswin_P.pdf"
                    download="Aswin_P.pdf"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#E5A94C] px-4 py-2 text-xs font-semibold text-[#070A0F] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#F0BA65]"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#111722] px-3.5 py-2 text-xs font-medium text-[#F4F7FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#E5A94C]/60 hover:text-[#E5A94C]"
                  >
                    <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              <div className="space-y-5 rounded-xl border border-[#222C3D] bg-[#101622] p-6 print:border-0 print:bg-white print:p-0 print:text-black">
                <div className="border-b border-white/[0.08] pb-4 print:border-black/15">
                  <h3 className="font-display text-2xl font-bold text-[#F4F7FB] print:text-black">
                    Aswin P
                  </h3>
                  <p className="mt-1 text-xs font-mono text-[#E5A94C] print:text-black">
                    Electronics &amp; Communication Engineering · RTL Design · FPGA · Embedded Systems
                  </p>
                  <p className="mt-1 text-xs text-[#93A4BD] print:text-neutral-700">
                    {CONTACT_INFO.email} · github.com/aswinportfolio
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-[#E5A94C] print:text-black">
                    Education
                  </h4>
                  <div className="mt-2 space-y-2 text-sm">
                    {EDUCATION_LIST.map((edu) => (
                      <div key={edu.id} className="flex flex-wrap justify-between gap-2">
                        <span className="font-medium text-[#F4F7FB] print:text-black">
                          {edu.degree}
                        </span>
                        <span className="font-mono text-xs text-[#93A4BD] print:text-neutral-700">
                          {edu.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-[#E5A94C] print:text-black">
                    Selected Projects
                  </h4>
                  <ul className="mt-2 space-y-2 text-xs leading-relaxed text-[#C9D5E6] print:text-neutral-800">
                    {PROJECTS_LIST.map((p) => (
                      <li key={p.id}>
                        <strong className="text-[#F4F7FB] print:text-black">{p.title}:</strong>{' '}
                        {p.summary}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-semibold text-[#E5A94C] print:text-black">
                    Technical Stack
                  </h4>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-[#93A4BD] print:text-neutral-700">
                    Verilog HDL · RTL Design · FSM Design · SPI · APB · FPGA · Vivado · EDA Playground · C · Python · Embedded C · ESP32 · STM32 · Arduino · OpenCV · MQTT · Git
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 08: CONTACT */}
          {moduleId === 'contact' && (
            <div className="mt-4 space-y-6">
              <p className="text-sm leading-relaxed text-[#93A4BD] sm:text-base">
                {CONTACT_INFO.availability}
              </p>

              {/* Direct Email Action Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#222C3D] bg-[#101622] p-5">
                <div>
                  <p className="font-mono text-xs text-[#E5A94C]">Direct Email</p>
                  <p className="mt-1 font-mono text-sm font-medium text-[#F4F7FB]">
                    {CONTACT_INFO.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0B0F17] px-3 py-2 text-xs font-medium text-[#F4F7FB] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#E5A94C]/60"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#E5A94C]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E5A94C] px-3.5 py-2 text-xs font-semibold text-[#070A0F] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#F0BA65]"
                  >
                    <span>Email</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Quick Collaboration Message Form */}
              <form
                onSubmit={handleContactSubmit}
                className="space-y-4 rounded-xl border border-[#222C3D] bg-[#101622] p-5"
              >
                <h3 className="font-display text-base font-semibold text-[#F4F7FB]">
                  Send a Note
                </h3>

                {messageSent ? (
                  <div className="rounded-lg border border-[#E5A94C]/40 bg-[#E5A94C]/10 p-4 text-sm text-[#F4F7FB]">
                    Thank you for reaching out. Your note is ready — for immediate reply, email{' '}
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-mono text-[#E5A94C] underline underline-offset-4"
                    >
                      {CONTACT_INFO.email}
                    </a>
                    .
                  </div>
                ) : null}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#93A4BD]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-[#222C3D] bg-[#0B0F17] px-3.5 py-2 text-sm text-[#F4F7FB] placeholder:text-[#55637A] focus:border-[#E5A94C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#93A4BD]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="mt-1.5 w-full rounded-lg border border-[#222C3D] bg-[#0B0F17] px-3.5 py-2 text-sm text-[#F4F7FB] placeholder:text-[#55637A] focus:border-[#E5A94C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#93A4BD]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Project, RTL role, or hardware collaboration..."
                    className="mt-1.5 w-full rounded-lg border border-[#222C3D] bg-[#0B0F17] px-3.5 py-2 text-sm text-[#F4F7FB] placeholder:text-[#55637A] focus:border-[#E5A94C] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E5A94C] px-4 py-2 text-xs font-semibold text-[#070A0F] transition-colors duration-150 hover:bg-[#F0BA65]"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Drawer Module Stepper */}
        <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-[#090D14] px-6 py-3.5 sm:px-8 print:hidden">
          <button
            type="button"
            onClick={() => onNavigateModule(prevMeta.id)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#93A4BD] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#E5A94C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{prevMeta.title}</span>
          </button>

          <span className="font-mono text-[11px] text-[#93A4BD]">
            {currentIndex + 1} / {SOC_MODULES.length}
          </span>

          <button
            type="button"
            onClick={() => onNavigateModule(nextMeta.id)}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#93A4BD] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#E5A94C]"
          >
            <span>{nextMeta.title}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </aside>
    </div>
  );
}
