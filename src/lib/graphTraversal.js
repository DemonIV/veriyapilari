// BFS/DFS görselleştiricisi için örnek graf ve adım üretici.
// Düğüm koordinatları SVG (480×300) yerleşimi içindir.
export const SAMPLE_GRAPH = {
  nodes: {
    A: { x: 70, y: 60 },
    B: { x: 200, y: 40 },
    C: { x: 330, y: 70 },
    D: { x: 70, y: 180 },
    E: { x: 200, y: 150 },
    F: { x: 330, y: 190 },
    G: { x: 140, y: 260 },
    H: { x: 420, y: 130 },
  },
  edges: [
    ['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'],
    ['C', 'H'], ['D', 'E'], ['D', 'G'], ['E', 'F'],
    ['F', 'H'], ['G', 'E'],
  ],
};

export function buildAdjacency(edges) {
  const adj = {};
  for (const [u, v] of edges) {
    (adj[u] ??= []).push(v);
    (adj[v] ??= []).push(u);
  }
  for (const key of Object.keys(adj)) adj[key].sort();
  return adj;
}

// Her adım bir anlık görüntü: o anki düğüm, sıradaki düğümler (frontier),
// ziyaret edilmişler ve Türkçe açıklama. kind: 'bfs' | 'dfs'
export function recordTraversal(kind, edges, start) {
  const adj = buildAdjacency(edges);
  const structureName = kind === 'bfs' ? 'kuyruk' : 'yığın';
  const steps = [];
  const visited = new Set([start]);
  const order = [];
  const frontier = [start];

  steps.push({
    current: null,
    frontier: [...frontier],
    visited: [],
    order: [],
    note: `Başlangıç: ${start} düğümü ${structureName}a eklendi.`,
  });

  while (frontier.length > 0) {
    const current = kind === 'bfs' ? frontier.shift() : frontier.pop();
    order.push(current);

    const added = [];
    for (const neighbor of adj[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        frontier.push(neighbor);
        added.push(neighbor);
      }
    }

    steps.push({
      current,
      frontier: [...frontier],
      visited: [...order],
      order: [...order],
      note: added.length > 0
        ? `${current} ziyaret edildi; komşuları ${added.join(', ')} ${structureName}a eklendi.`
        : `${current} ziyaret edildi; eklenecek yeni komşu yok.`,
    });
  }

  steps.push({
    current: null,
    frontier: [],
    visited: [...order],
    order: [...order],
    note: `Bitti! Ziyaret sırası: ${order.join(' → ')}`,
  });

  return steps;
}
