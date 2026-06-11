import { useMemo, useState } from 'react';
import { SAMPLE_GRAPH, recordTraversal } from '../lib/graphTraversal';

export default function GraphTraversalVisualizer() {
  const [kind, setKind] = useState('bfs');
  const [start, setStart] = useState('A');
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(() => recordTraversal(kind, SAMPLE_GRAPH.edges, start), [kind, start]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const atEnd = stepIndex >= steps.length - 1;

  const visitedSet = new Set(step.visited);
  const frontierSet = new Set(step.frontier);
  const nodeNames = Object.keys(SAMPLE_GRAPH.nodes);

  const nodeClass = (name) => {
    if (name === step.current) return 'gv-node gv-current';
    if (visitedSet.has(name)) return 'gv-node gv-visited';
    if (frontierSet.has(name)) return 'gv-node gv-frontier';
    return 'gv-node';
  };

  return (
    <div className="visualizer">
      <div className="visualizer-controls">
        <select className="viz-select" value={kind} onChange={e => { setKind(e.target.value); setStepIndex(0); }}>
          <option value="bfs">BFS (Genişlik Öncelikli)</option>
          <option value="dfs">DFS (Derinlik Öncelikli)</option>
        </select>
        <label className="viz-slider">
          Başlangıç
          <select className="viz-select" value={start} onChange={e => { setStart(e.target.value); setStepIndex(0); }}>
            {nodeNames.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <button className="btn btn-outline" onClick={() => setStepIndex(i => Math.max(0, i - 1))} disabled={stepIndex === 0}>
          ← Geri
        </button>
        <button className="btn btn-primary" onClick={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))} disabled={atEnd}>
          İleri →
        </button>
        <button className="btn btn-outline" onClick={() => setStepIndex(0)} disabled={stepIndex === 0}>
          ↺ Başa Sar
        </button>
      </div>

      <div className="gv-stage">
        <svg viewBox="0 0 480 300" style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
          {SAMPLE_GRAPH.edges.map(([u, v]) => {
            const a = SAMPLE_GRAPH.nodes[u];
            const b = SAMPLE_GRAPH.nodes[v];
            const active = visitedSet.has(u) && visitedSet.has(v);
            return (
              <line
                key={`${u}-${v}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={active ? 'var(--secondary)' : 'var(--border)'}
                strokeWidth={active ? 2.5 : 1.5}
              />
            );
          })}
          {nodeNames.map(name => {
            const { x, y } = SAMPLE_GRAPH.nodes[name];
            return (
              <g key={name} className={nodeClass(name)}>
                <circle cx={x} cy={y} r="20" />
                <text x={x} y={y + 5} textAnchor="middle">{name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="visualizer-footer" style={{ alignItems: 'center' }}>
        <span>Adım <strong>{stepIndex + 1}/{steps.length}</strong></span>
        <span>
          {kind === 'bfs' ? 'Kuyruk' : 'Yığın'}:{' '}
          <strong style={{ fontFamily: "'Fira Code', monospace" }}>
            [{step.frontier.join(', ')}]
          </strong>
        </span>
        <span style={{ color: 'var(--text)' }}>{step.note}</span>
      </div>
    </div>
  );
}
