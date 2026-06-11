import { useMemo, useState } from 'react';

function makeSortedArray() {
  const set = new Set();
  while (set.size < 15) set.add(2 + Math.floor(Math.random() * 97));
  return [...set].sort((x, y) => x - y);
}

function recordSearch(arr, target) {
  const steps = [];
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const note =
      arr[mid] === target
        ? `arr[${mid}] = ${arr[mid]} → hedefi bulduk! 🎉`
        : arr[mid] < target
          ? `arr[${mid}] = ${arr[mid]} < ${target} → sol yarıyı ele, lo = ${mid + 1}`
          : `arr[${mid}] = ${arr[mid]} > ${target} → sağ yarıyı ele, hi = ${mid - 1}`;
    steps.push({ lo, hi, mid, found: arr[mid] === target, note });
    if (arr[mid] === target) return steps;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  steps.push({ lo, hi, mid: -1, found: false, note: `lo > hi → ${target} dizide yok ❌` });
  return steps;
}

export default function BinarySearchVisualizer() {
  const [arr, setArr] = useState(makeSortedArray);
  const [target, setTarget] = useState(() => arr[7]);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => recordSearch(arr, target), [arr, target]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const atEnd = stepIndex >= steps.length - 1;

  const restart = (newArr = arr, newTarget = target) => {
    setArr(newArr);
    setTarget(newTarget);
    setStepIndex(0);
  };

  return (
    <div className="visualizer">
      <div className="visualizer-controls">
        <label className="viz-slider">
          Hedef
          <select className="viz-select" value={target} onChange={e => restart(arr, +e.target.value)}>
            {arr.map(v => <option key={v} value={v}>{v}</option>)}
            <option value={-1}>yok (-1)</option>
          </select>
        </label>
        <button className="btn btn-outline" onClick={() => setStepIndex(i => Math.max(0, i - 1))} disabled={stepIndex === 0}>
          ← Geri
        </button>
        <button className="btn btn-primary" onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))} disabled={atEnd}>
          İleri →
        </button>
        <button
          className="btn btn-outline"
          onClick={() => { const a = makeSortedArray(); restart(a, a[Math.floor(Math.random() * a.length)]); }}
        >
          🎲 Yeni Dizi
        </button>
      </div>

      <div className="bs-row">
        {arr.map((value, i) => {
          const inRange = i >= step.lo && i <= step.hi;
          const isMid = i === step.mid;
          const cls = isMid
            ? step.found ? 'bs-cell bs-found' : 'bs-cell bs-mid'
            : inRange ? 'bs-cell bs-active' : 'bs-cell bs-eliminated';
          return (
            <div key={i} className={cls}>
              <span className="bs-value">{value}</span>
              <span className="bs-index">
                {i === step.lo && 'lo'}{i === step.lo && i === step.mid && '·'}{isMid && 'mid'}
                {i === step.hi && (i === step.mid || i === step.lo ? '·hi' : 'hi')}
              </span>
            </div>
          );
        })}
      </div>

      <div className="visualizer-footer" style={{ alignItems: 'center' }}>
        <span>Adım <strong>{stepIndex + 1}/{steps.length}</strong></span>
        <span style={{ color: 'var(--text)' }}>{step.note}</span>
      </div>
    </div>
  );
}
