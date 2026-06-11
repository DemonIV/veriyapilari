import { describe, expect, it } from 'vitest';
import { SAMPLE_GRAPH, buildAdjacency, recordTraversal } from '../lib/graphTraversal';

describe('buildAdjacency', () => {
  it('yönsüz kenarları iki yönlü ve alfabetik kurar', () => {
    const adj = buildAdjacency([['A', 'B'], ['A', 'C']]);
    expect(adj.A).toEqual(['B', 'C']);
    expect(adj.B).toEqual(['A']);
    expect(adj.C).toEqual(['A']);
  });
});

describe('recordTraversal', () => {
  const nodeCount = Object.keys(SAMPLE_GRAPH.nodes).length;

  it('BFS bağlı grafta tüm düğümleri ziyaret eder', () => {
    const steps = recordTraversal('bfs', SAMPLE_GRAPH.edges, 'A');
    expect(steps.at(-1).order).toHaveLength(nodeCount);
  });

  it('DFS bağlı grafta tüm düğümleri ziyaret eder', () => {
    const steps = recordTraversal('dfs', SAMPLE_GRAPH.edges, 'A');
    expect(steps.at(-1).order).toHaveLength(nodeCount);
  });

  it('BFS basit grafta seviye sırasıyla ilerler', () => {
    // A-B, A-C, B-D: BFS(A) → A, B, C, D
    const steps = recordTraversal('bfs', [['A', 'B'], ['A', 'C'], ['B', 'D']], 'A');
    expect(steps.at(-1).order).toEqual(['A', 'B', 'C', 'D']);
  });

  it('DFS basit grafta dala dalar', () => {
    // Yığın: A → C ve B eklenir, C üstte → önce C... (pop son ekleneni alır)
    const steps = recordTraversal('dfs', [['A', 'B'], ['A', 'C'], ['B', 'D']], 'A');
    expect(steps.at(-1).order).toEqual(['A', 'C', 'B', 'D']);
  });

  it('her düğüm yalnızca bir kez ziyaret edilir', () => {
    for (const kind of ['bfs', 'dfs']) {
      const order = recordTraversal(kind, SAMPLE_GRAPH.edges, 'E').at(-1).order;
      expect(new Set(order).size).toBe(order.length);
    }
  });

  it('ilk ve son adımlarda işlenen düğüm yoktur (başlangıç/bitiş anlık görüntüsü)', () => {
    const steps = recordTraversal('bfs', SAMPLE_GRAPH.edges, 'A');
    expect(steps[0].current).toBeNull();
    expect(steps.at(-1).current).toBeNull();
    expect(steps.at(-1).frontier).toEqual([]);
  });
});
