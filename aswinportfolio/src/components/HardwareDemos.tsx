import { useState } from 'react';

type SpiMode = 0 | 1 | 2 | 3;

const SPI_MODE_INFO: Record<
  SpiMode,
  { cpol: 0 | 1; cpha: 0 | 1; sampleEdge: string; shiftEdge: string }
> = {
  0: { cpol: 0, cpha: 0, sampleEdge: 'Rising', shiftEdge: 'Falling' },
  1: { cpol: 0, cpha: 1, sampleEdge: 'Falling', shiftEdge: 'Rising' },
  2: { cpol: 1, cpha: 0, sampleEdge: 'Falling', shiftEdge: 'Rising' },
  3: { cpol: 1, cpha: 1, sampleEdge: 'Rising', shiftEdge: 'Falling' },
};

export function SpiTimingDemo() {
  const [mode, setMode] = useState<SpiMode>(0);
  const spec = SPI_MODE_INFO[mode];

  // Build clean 4-cycle SCLK SVG path based on CPOL and CPHA
  const idleY = spec.cpol === 0 ? 30 : 8;
  const activeY = spec.cpol === 0 ? 8 : 30;

  const sclkPoints = [
    `0,${idleY}`,
    `24,${idleY}`,
    `24,${activeY}`,
    `52,${activeY}`,
    `52,${idleY}`,
    `80,${idleY}`,
    `80,${activeY}`,
    `108,${activeY}`,
    `108,${idleY}`,
    `136,${idleY}`,
    `136,${activeY}`,
    `164,${activeY}`,
    `164,${idleY}`,
    `192,${idleY}`,
    `192,${activeY}`,
    `220,${activeY}`,
    `220,${idleY}`,
    `248,${idleY}`,
  ].join(' ');

  const mosiOffset = spec.cpha === 1 ? 14 : 0;

  return (
    <div className="mt-4 rounded-xl border border-[#222C3D] bg-[#090D14] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium text-[#E5A94C]">
          Interactive SPI Mode Timing Preview
        </span>
        <div className="flex items-center gap-1 rounded-lg bg-[#111722] p-1">
          {([0, 1, 2, 3] as SpiMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                mode === m
                  ? 'bg-[#E5A94C] text-[#070A0F]'
                  : 'text-[#93A4BD] hover:text-[#F4F7FB]'
              }`}
            >
              Mode {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[#93A4BD]">
        <span>CPOL = {spec.cpol}</span>
        <span aria-hidden="true">·</span>
        <span>CPHA = {spec.cpha}</span>
        <span aria-hidden="true">·</span>
        <span>Sample on {spec.sampleEdge} Edge</span>
        <span aria-hidden="true">·</span>
        <span>Shift on {spec.shiftEdge} Edge</span>
      </div>

      <div className="mt-3 space-y-2 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-[300px]">
          <span className="w-12 font-mono text-[11px] text-[#93A4BD]">CS_N</span>
          <svg viewBox="0 0 260 22" className="h-5 flex-1">
            <polyline
              fill="none"
              stroke="#6E82A0"
              strokeWidth="1.75"
              points="0,4 16,4 16,18 232,18 232,4 260,4"
            />
          </svg>
        </div>

        <div className="flex items-center gap-3 min-w-[300px]">
          <span className="w-12 font-mono text-[11px] text-[#E5A94C]">SCLK</span>
          <svg viewBox="0 0 260 36" className="h-8 flex-1">
            <polyline
              fill="none"
              stroke="#E5A94C"
              strokeWidth="2"
              points={sclkPoints}
            />
          </svg>
        </div>

        <div className="flex items-center gap-3 min-w-[300px]">
          <span className="w-12 font-mono text-[11px] text-[#F4F7FB]">MOSI</span>
          <svg viewBox="0 0 260 26" className="h-6 flex-1">
            <polyline
              fill="none"
              stroke="#F4F7FB"
              strokeWidth="1.75"
              points={`0,20 ${16 + mosiOffset},20 ${16 + mosiOffset},6 ${72 + mosiOffset},6 ${72 + mosiOffset},20 ${128 + mosiOffset},20 ${128 + mosiOffset},6 ${184 + mosiOffset},6 ${184 + mosiOffset},20 260,20`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

type ElevatorState = 'IDLE' | 'MOVING_UP' | 'MOVING_DOWN' | 'DOOR_OPEN' | 'EMERGENCY';

export function ElevatorFsmDemo() {
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [targetFloor, setTargetFloor] = useState<number>(1);
  const [fsmState, setFsmState] = useState<ElevatorState>('IDLE');

  const requestFloor = (floor: number) => {
    if (fsmState === 'EMERGENCY') return;
    setTargetFloor(floor);
    if (floor === currentFloor) {
      setFsmState('DOOR_OPEN');
      return;
    }
    const nextDirection: ElevatorState =
      floor > currentFloor ? 'MOVING_UP' : 'MOVING_DOWN';
    setFsmState(nextDirection);
    setTimeout(() => {
      setCurrentFloor(floor);
      setFsmState('DOOR_OPEN');
    }, 320);
  };

  const triggerEmergency = () => {
    setFsmState('EMERGENCY');
  };

  const resetFsm = () => {
    setFsmState('IDLE');
    setTargetFloor(currentFloor);
  };

  return (
    <div className="mt-4 rounded-xl border border-[#222C3D] bg-[#090D14] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium text-[#E5A94C]">
          Interactive FSM State Simulator
        </span>
        <span className="font-mono text-xs text-[#F4F7FB] tabular-nums">
          State: {fsmState} · Floor {currentFloor} → {targetFloor}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4].map((floor) => (
          <button
            key={floor}
            type="button"
            onClick={() => requestFloor(floor)}
            disabled={fsmState === 'EMERGENCY'}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 disabled:opacity-40 ${
              currentFloor === floor
                ? 'border-[#E5A94C] bg-[#E5A94C] text-[#070A0F]'
                : 'border-[#222C3D] bg-[#111722] text-[#F4F7FB] hover:border-[#E5A94C]/60'
            }`}
          >
            Floor {floor}
          </button>
        ))}

        <button
          type="button"
          onClick={triggerEmergency}
          className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3 py-1.5 font-mono text-xs font-medium text-rose-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-rose-400"
        >
          Emergency
        </button>

        <button
          type="button"
          onClick={resetFsm}
          className="rounded-lg border border-white/10 bg-[#111722] px-3 py-1.5 font-mono text-xs text-[#93A4BD] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4F7FB]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
