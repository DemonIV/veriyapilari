import { useEffect, useMemo, useRef, useState } from 'react';
import { ALGORITHMS, recordSteps, randomArray } from '../lib/sortingSteps';

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState('bubble');
  const [size, setSize] = useState(25);
  const [speed, setSpeed] = useState(60);
  const [bars, setBars] = useState(() => randomArray(25));
  const [initial, setInitial] = useState(bars);
  const [playing, setPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [highlights, setHighlights] = useState({});
  const [sortedSet, setSortedSet] = useState(new Set());
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const stepRef = useRef(0);

  const steps = useMemo(() => recordSteps(algorithm, initial), [algorithm, initial]);
  const done = stepIndex >= steps.length;

  const reset = (arr = randomArray(size)) => {
    setPlaying(false);
    setInitial(arr);
    setBars(arr);
    stepRef.current = 0;
    setStepIndex(0);
    setHighlights({});
    setSortedSet(new Set());
    setStats({ comparisons: 0, swaps: 0 });
  };

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      const idx = stepRef.current;
      if (idx >= steps.length) {
        setPlaying(false);
        return;
      }
      const step = steps[idx];
      if (step.type === 'compare') {
        setHighlights({ [step.i]: 'compare', [step.j]: 'compare' });
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
      } else if (step.type === 'swap') {
        setBars(b => {
          const next = [...b];
          [next[step.i], next[step.j]] = [next[step.j], next[step.i]];
          return next;
        });
        setHighlights({ [step.i]: 'swap', [step.j]: 'swap' });
        setStats(s => ({ ...s, swaps: s.swaps + 1 }));
      } else if (step.type === 'set') {
        setBars(b => {
          const next = [...b];
          next[step.i] = step.value;
          return next;
        });
        setHighlights({ [step.i]: 'swap' });
        setStats(s => ({ ...s, swaps: s.swaps + 1 }));
      } else if (step.type === 'sorted') {
        setSortedSet(prev => new Set([...prev, ...step.indices]));
        setHighlights({});
      }
      stepRef.current = idx + 1;
      setStepIndex(idx + 1);
    }, 310 - speed * 3);
    return () => clearInterval(id);
  }, [playing, speed, steps]);

  const maxVal = Math.max(...bars);

  return (
    <div className="visualizer">
      <div className="visualizer-controls">
        <select
          className="viz-select"
          value={algorithm}
          disabled={playing}
          onChange={e => { setAlgorithm(e.target.value); reset(initial); }}
        >
          {Object.entries(ALGORITHMS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={() => (done ? reset(initial) : setPlaying(p => !p))}>
          {done ? '↺ Başa Sar' : playing ? '⏸ Duraklat' : '▶ Başlat'}
        </button>
        <button className="btn btn-outline" disabled={playing} onClick={() => reset()}>
          🎲 Karıştır
        </button>

        <label className="viz-slider">
          Hız
          <input type="range" min="10" max="100" value={speed} onChange={e => setSpeed(+e.target.value)} />
        </label>
        <label className="viz-slider">
          Eleman: {size}
          <input
            type="range" min="8" max="60" value={size} disabled={playing}
            onChange={e => { const n = +e.target.value; setSize(n); reset(randomArray(n)); }}
          />
        </label>
      </div>

      <div className="visualizer-stage">
        {bars.map((value, i) => (
          <div
            key={i}
            className={`viz-bar ${sortedSet.has(i) ? 'viz-sorted' : ''} ${highlights[i] ? `viz-${highlights[i]}` : ''}`}
            style={{ height: `${(value / maxVal) * 100}%` }}
            title={value}
          />
        ))}
      </div>

      <div className="visualizer-footer">
        <span><span className="viz-dot" style={{ background: 'var(--yellow)' }} /> Karşılaştırma: <strong>{stats.comparisons}</strong></span>
        <span><span className="viz-dot" style={{ background: 'var(--red)' }} /> Takas/Yazma: <strong>{stats.swaps}</strong></span>
        <span><span className="viz-dot" style={{ background: 'var(--green)' }} /> {done ? 'Sıralandı ✓' : `Adım ${stepIndex}/${steps.length}`}</span>
      </div>
    </div>
  );
}
