export type ModuleId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'social'
  | 'resume'
  | 'contact';

export type ProjectDomain = 'All' | 'Verilog & RTL' | 'Embedded & IoT';
export type SkillDomain = 'All' | 'Hardware & RTL' | 'Embedded & Firmware' | 'Software & Tools';

export interface SocModuleMeta {
  id: ModuleId;
  code: string;
  title: string;
  subtitle: string;
  tier: 'upper' | 'lower';
  span: 'wide' | 'standard';
  busLane: string;
  summaryTag: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  domain: Exclude<ProjectDomain, 'All'>;
  year: string;
  architecture: string;
  summary: string;
  highlights: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  interactiveDemo?: 'spi-timing' | 'elevator-fsm';
}

export interface SkillGroup {
  domain: Exclude<SkillDomain, 'All'>;
  description: string;
  items: { name: string; focus: string }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  context: string;
  description: string;
  outcomes: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  field: string;
  status: string;
  description: string;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  handle: string;
  url: string;
  description: string;
}

export const CHIP_ASSETS = {
  packageHero: '/src/assets/images/soc_chip_package_1795040666151.jpg',
  packageHeroAlt:
    'Matte black ceramic System-on-a-Chip processor package with gold-plated peripheral pins and etched silicon circuit lid.',
  siliconDie: '/src/assets/images/silicon_wafer_die_1795040666909.jpg',
  siliconDieAlt:
    'Macro view of an exposed semiconductor silicon die with microscopic gold bond wires and circuit blocks.',
  fpgaBench: '/src/assets/images/fpga_workbench_1795040666199.jpg',
  fpgaBenchAlt:
    'Matte black FPGA development board wired with logic analyzer probes on a dark electronics workbench.',
  embeddedPcb: '/src/assets/images/embedded_pcb_module_1795040667674.jpg',
  embeddedPcbAlt:
    'Custom black STM32 embedded controller PCB with copper traces and digital telemetry OLED module.',
};

export const PACKAGE_SPECS = [
  { label: 'Architecture', value: 'BC-01' },
  { label: 'Functional Blocks', value: '8 Modules' },
  { label: 'Core Discipline', value: 'RTL & Embedded' },
  { label: 'Graduation', value: 'B.Tech ECE 2026' },
];

export const SOC_MODULES: SocModuleMeta[] = [
  {
    id: 'about',
    code: 'MOD-01',
    title: 'About',
    subtitle: 'Who I am & engineering focus',
    tier: 'upper',
    span: 'wide',
    busLane: 'CORE_ID',
    summaryTag: 'ECE Graduate',
  },
  {
    id: 'projects',
    code: 'MOD-02',
    title: 'Projects',
    subtitle: 'What I build in silicon & firmware',
    tier: 'upper',
    span: 'wide',
    busLane: 'RTL_SYS',
    summaryTag: '5 Systems',
  },
  {
    id: 'skills',
    code: 'MOD-03',
    title: 'Skills',
    subtitle: 'HDL, FPGA & embedded toolkit',
    tier: 'upper',
    span: 'standard',
    busLane: 'ALU_LIB',
    summaryTag: '17 Tools',
  },
  {
    id: 'experience',
    code: 'MOD-04',
    title: 'Experience',
    subtitle: 'My hands-on journey',
    tier: 'upper',
    span: 'standard',
    busLane: 'LOG_MEM',
    summaryTag: 'Workshops & Labs',
  },
  {
    id: 'education',
    code: 'MOD-05',
    title: 'Education',
    subtitle: 'Academic foundation',
    tier: 'upper',
    span: 'standard',
    busLane: 'BOOT_ROM',
    summaryTag: 'B.Tech · Diploma',
  },
  {
    id: 'social',
    code: 'MOD-06',
    title: 'Social',
    subtitle: 'Connect with me',
    tier: 'lower',
    span: 'standard',
    busLane: 'IO_EXT',
    summaryTag: '3 Profiles',
  },
  {
    id: 'resume',
    code: 'MOD-07',
    title: 'Resume',
    subtitle: 'Structured profile & CV',
    tier: 'lower',
    span: 'standard',
    busLane: 'DOC_DMA',
    summaryTag: 'Print Ready',
  },
  {
    id: 'contact',
    code: 'MOD-08',
    title: 'Contact',
    subtitle: 'Say hello & collaborate',
    tier: 'lower',
    span: 'standard',
    busLane: 'UART_TX',
    summaryTag: 'Direct Line',
  },
];

export const ABOUT_CONTENT = {
  headline: 'Designing digital logic from RTL waveforms up to physical hardware.',
  intro:
    'Hi, I am Aswin P — an Electronics & Communication Engineering graduate focused on digital hardware, RTL design, FPGA development, and embedded systems.',
  pillars: [
    {
      title: 'What drives me',
      body: 'I enjoy turning architectural ideas into deterministic working systems, bridging register-transfer logic and processors with microcontroller-based physical prototypes.',
    },
    {
      title: 'Current focus',
      body: 'Building practical RTL modules in Verilog HDL and FPGA testbenches while sharpening digital design, protocol verification, and embedded firmware craft.',
    },
  ],
  specifications: [
    { key: 'Primary Domain', value: 'Digital Hardware & RTL Design' },
    { key: 'Secondary Domain', value: 'FPGA & Embedded Firmware' },
    { key: 'Hardware Languages', value: 'Verilog HDL · Embedded C · Python' },
    { key: 'Bus & Interfaces', value: 'APB · SPI · CAN Bus · MQTT' },
  ],
};

export const PROJECTS_LIST: ProjectEntry[] = [
  {
    id: 'spi-controller',
    title: 'SPI Controller (Verilog)',
    domain: 'Verilog & RTL',
    year: '2026',
    architecture: 'APB Register Slave + Configurable SPI Master Core',
    summary:
      'Modular Serial Peripheral Interface core featuring a programmable baud-rate generator, shift register datapath, slave-select control logic, AMBA APB register interface, and self-checking testbench.',
    highlights: [
      'Parameterized clock divider supporting all four CPOL/CPHA SPI transfer modes',
      'Clean separation between APB control/status registers and synchronous shift engine',
      'Verified waveform timing and edge alignment across multi-byte transfers in simulation',
    ],
    stack: ['Verilog HDL', 'RTL Design', 'APB', 'SPI', 'EDA Playground'],
    image: CHIP_ASSETS.fpgaBench,
    imageAlt: CHIP_ASSETS.fpgaBenchAlt,
    interactiveDemo: 'spi-timing',
  },
  {
    id: 'elevator-controller',
    title: 'Elevator Controller (Verilog)',
    domain: 'Verilog & RTL',
    year: '2025',
    architecture: 'Deterministic Mealy/Moore Finite State Machine',
    summary:
      'Finite-state-machine-based multi-floor lift controller engineered in Verilog HDL with queued floor request arbitration, directional priority logic, door timing, and emergency override behavior.',
    highlights: [
      'Glitch-free synchronous state encoding covering idle, ascent, descent, door hold, and emergency halt',
      'Request latch prioritization preventing redundant direction reversals mid-travel',
      'Simulated corner-case simultaneous floor requests and fault interrupts',
    ],
    stack: ['Verilog HDL', 'FSM Design', 'Vivado', 'FPGA'],
    image: CHIP_ASSETS.siliconDie,
    imageAlt: CHIP_ASSETS.siliconDieAlt,
    interactiveDemo: 'elevator-fsm',
  },
  {
    id: 'manhole-cleaning-robot',
    title: 'Autonomous Manhole Cleaning Robot',
    domain: 'Embedded & IoT',
    year: '2025',
    architecture: 'ESP32 Vision Node + Actuator Drive Stage',
    summary:
      'Automated waste detection and robotic sanitation system combining ESP32 embedded control, real-time OpenCV computer vision debris recognition, and electromechanical actuator sequencing.',
    highlights: [
      'Automated visual waste classification pipeline triggering mechanical scoop actuation',
      'Eliminates direct human exposure to hazardous confined drainage environments',
      'Coordinated power management between microcontroller logic and high-torque motors',
    ],
    stack: ['ESP32', 'OpenCV', 'Python', 'Embedded C'],
    image: CHIP_ASSETS.embeddedPcb,
    imageAlt: CHIP_ASSETS.embeddedPcbAlt,
  },
  {
    id: 'smart-car-dashboard',
    title: 'Smart Car Dashboard',
    domain: 'Embedded & IoT',
    year: '2025',
    architecture: 'STM32F407 + CAN Bus + DWIN HMI + MQTT',
    summary:
      'Automotive instrument cluster prototype built on the STM32F407 microcontroller integrating real-time CAN bus telemetry parsing, a DWIN graphical display interface, and remote MQTT diagnostics.',
    highlights: [
      'Hardware CAN frame filtering for speed, RPM, thermal, and battery status messages',
      'Low-latency serial UART frame updates driving custom DWIN gauge widgets',
      'Cloud telemetry bridge streaming vehicle health packets over MQTT',
    ],
    stack: ['STM32', 'Embedded C', 'CAN Bus', 'MQTT'],
    image: CHIP_ASSETS.embeddedPcb,
    imageAlt: CHIP_ASSETS.embeddedPcbAlt,
  },
  {
    id: 'authenticated-voting-machine',
    title: 'Authenticated Voting Machine',
    domain: 'Embedded & IoT',
    year: '2024',
    architecture: 'Dual-Factor Biometric + RFID Embedded Terminal',
    summary:
      'Tamper-aware electronic voting prototype enforcing dual-factor voter verification via RFID credentials and biometric fingerprint matching, paired with encrypted vote tallying and IoT status reporting.',
    highlights: [
      'Two-stage identity gate preventing duplicate ballot casting per credential ID',
      'Deterministic embedded state flow from verification to ballot lock confirmation',
      'Live audit tally synchronization over lightweight IoT messaging',
    ],
    stack: ['Arduino', 'Embedded C', 'RFID', 'IoT'],
    image: CHIP_ASSETS.fpgaBench,
    imageAlt: CHIP_ASSETS.fpgaBenchAlt,
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: 'Hardware & RTL',
    description: 'Synchronous digital logic, hardware description, and FPGA synthesis workflows.',
    items: [
      { name: 'Verilog HDL', focus: 'Synthesizable RTL & testbenches' },
      { name: 'RTL Design', focus: 'Datapath & control architecture' },
      { name: 'FSM Design', focus: 'Mealy / Moore state machines' },
      { name: 'SPI', focus: 'Serial master/slave timing' },
      { name: 'APB', focus: 'AMBA peripheral bus interfacing' },
      { name: 'FPGA', focus: 'Logic mapping & timing closure' },
      { name: 'Vivado', focus: 'Synthesis, simulation & bitstream' },
      { name: 'EDA Playground', focus: 'Rapid HDL waveform verification' },
    ],
  },
  {
    domain: 'Embedded & Firmware',
    description: 'Bare-metal microcontroller programming, peripheral buses, and connected telemetry.',
    items: [
      { name: 'Embedded C', focus: 'Register-level firmware & ISR' },
      { name: 'ESP32', focus: 'Wi-Fi / IoT edge control' },
      { name: 'STM32', focus: 'ARM Cortex-M & CAN peripherals' },
      { name: 'Arduino', focus: 'Rapid sensor & actuator prototyping' },
      { name: 'MQTT', focus: 'Lightweight telemetry transport' },
    ],
  },
  {
    domain: 'Software & Tools',
    description: 'Systems programming, computer vision scripting, and version-controlled engineering.',
    items: [
      { name: 'C', focus: 'Low-level memory & algorithms' },
      { name: 'Python', focus: 'Automation & vision pipelines' },
      { name: 'OpenCV', focus: 'Visual waste & object detection' },
      { name: 'Git', focus: 'Source control & release tracking' },
    ],
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: 'practical-projects',
    period: '2024 — 2026',
    title: 'Practical Hardware & Embedded Projects',
    context: 'RTL Design · Microcontroller Prototyping',
    description:
      'Hands-on engineering of synthesizable digital hardware modules, verification testbenches, and embedded sensor-actuator systems from schematic concept through working prototype.',
    outcomes: [
      'Authored modular Verilog cores including an APB-interfaced SPI controller and FSM elevator controller',
      'Built STM32 CAN-bus telemetry and ESP32 computer-vision robotic hardware prototypes',
    ],
  },
  {
    id: 'training-workshops',
    period: '2022 — 2025',
    title: 'Technical Training & Engineering Workshops',
    context: 'Electronics · Embedded Systems · VLSI Foundations',
    description:
      'Completed intensive technical training programs and practical lab workshops across digital electronics, microcontroller interfacing, PCB fundamentals, and engineering instrumentation.',
    outcomes: [
      'Strengthened logic debugging with oscilloscopes, protocol analyzers, and HDL simulation tools',
      'Applied mechanical-to-electrical systems thinking across robotics and enclosure integration',
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'btech-ece',
    period: '2023 — 2026',
    degree: 'B.Tech — Electronics & Communication Engineering',
    field: 'Digital Systems, VLSI, Microcontrollers & Signal Processing',
    status: 'Completed 2026',
    description:
      'Focused academic specialization in digital logic architecture, Verilog HDL, embedded processor interfacing, and communication protocols.',
  },
  {
    id: 'diploma-mech',
    period: 'Earlier Technical Foundation',
    degree: 'Diploma — Mechanical Engineering',
    field: 'Engineering Mechanics, Manufacturing & Physical Systems',
    status: 'Completed',
    description:
      'Built rigorous hands-on engineering fundamentals, CAD spatial reasoning, and electromechanical system awareness prior to specializing in electronics.',
  },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: 'aswinportfolio',
    url: 'https://github.com/aswinportfolio',
    description: 'RTL modules, Verilog testbenches, embedded firmware, and portfolio source.',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'Aswin P',
    url: 'https://www.linkedin.com/',
    description: 'Academic credentials, hardware engineering background, and professional network.',
  },
  {
    id: 'x',
    platform: 'X',
    handle: '@aswin_soc',
    url: 'https://x.com/',
    description: 'Notes on digital design, FPGA experiments, and hardware builds.',
  },
];

export const CONTACT_INFO = {
  email: 'aswinxyz91@gmail.com',
  location: 'India · Available for Hardware, RTL & Embedded Roles',
  availability: 'Open to full-time VLSI / RTL Design, FPGA, and Embedded Engineering opportunities.',
};
