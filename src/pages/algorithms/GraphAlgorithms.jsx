import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function GraphAlgorithms() {
  const [activeAlgo, setActiveAlgo] = useState('bfs');

  const algorithms = {
    bfs: {
      title: 'BFS - Genişlik Öncelikli Arama',
      complexity: 'O(V + E)',
      space: 'O(V)',
      useCase: 'En kısa yol (ağırlıksız), seviye sıralaması, bağlantılılık kontrolü',
      code: `public class BFS
{
    private Dictionary<int, List<int>> adj = new();

    public void AddEdge(int u, int v)
    {
        if (!adj.ContainsKey(u)) adj[u] = new List<int>();
        if (!adj.ContainsKey(v)) adj[v] = new List<int>();
        adj[u].Add(v);
        adj[v].Add(u); // Yönsüz graf için
    }

    // BFS traversal
    public List<int> Traverse(int start)
    {
        var visited = new HashSet<int>();
        var queue = new Queue<int>();
        var result = new List<int>();

        queue.Enqueue(start);
        visited.Add(start);

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            result.Add(node);

            if (adj.ContainsKey(node))
                foreach (int neighbor in adj[node])
                    if (!visited.Contains(neighbor))
                    {
                        visited.Add(neighbor);
                        queue.Enqueue(neighbor);
                    }
        }
        return result;
    }

    // En kısa yol (ağırlıksız)
    public int[] ShortestPath(int start, int n)
    {
        int[] dist = new int[n];
        Array.Fill(dist, -1);
        dist[start] = 0;

        var queue = new Queue<int>();
        queue.Enqueue(start);

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            foreach (int neighbor in adj.GetValueOrDefault(node, new()))
            {
                if (dist[neighbor] == -1)
                {
                    dist[neighbor] = dist[node] + 1;
                    queue.Enqueue(neighbor);
                }
            }
        }
        return dist;
    }
}`,
    },
    dfs: {
      title: 'DFS - Derinlik Öncelikli Arama',
      complexity: 'O(V + E)',
      space: 'O(V)',
      useCase: 'Döngü tespiti, topolojik sıralama, SCC, maze solving',
      code: `public class DFS
{
    private Dictionary<int, List<int>> adj = new();

    public void AddEdge(int u, int v)
    {
        if (!adj.ContainsKey(u)) adj[u] = new List<int>();
        adj[u].Add(v);
    }

    // Özyinelemeli DFS
    public void DFSRecursive(int node, HashSet<int> visited, List<int> result)
    {
        visited.Add(node);
        result.Add(node);

        foreach (int neighbor in adj.GetValueOrDefault(node, new()))
            if (!visited.Contains(neighbor))
                DFSRecursive(neighbor, visited, result);
    }

    // İteratif DFS (Stack ile)
    public List<int> DFSIterative(int start)
    {
        var visited = new HashSet<int>();
        var stack = new Stack<int>();
        var result = new List<int>();

        stack.Push(start);

        while (stack.Count > 0)
        {
            int node = stack.Pop();
            if (visited.Contains(node)) continue;

            visited.Add(node);
            result.Add(node);

            foreach (int neighbor in adj.GetValueOrDefault(node, new()))
                if (!visited.Contains(neighbor))
                    stack.Push(neighbor);
        }
        return result;
    }

    // Topolojik Sıralama (DAG için)
    public List<int> TopologicalSort(int n)
    {
        var visited = new HashSet<int>();
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
            if (!visited.Contains(i))
                TopoHelper(i, visited, stack);

        return new List<int>(stack);
    }

    private void TopoHelper(int node, HashSet<int> visited, Stack<int> stack)
    {
        visited.Add(node);
        foreach (int nb in adj.GetValueOrDefault(node, new()))
            if (!visited.Contains(nb))
                TopoHelper(nb, visited, stack);
        stack.Push(node);
    }
}`,
    },
    dijkstra: {
      title: "Dijkstra'nın En Kısa Yol Algoritması",
      complexity: 'O((V + E) log V)',
      space: 'O(V)',
      useCase: 'Ağırlıklı graflarda tek kaynaklı en kısa yol (negatif kenar yok)',
      code: `public class Dijkstra
{
    private int V;
    private List<(int to, int weight)>[] adj;

    public Dijkstra(int vertices)
    {
        V = vertices;
        adj = new List<(int, int)>[V];
        for (int i = 0; i < V; i++)
            adj[i] = new List<(int, int)>();
    }

    public void AddEdge(int u, int v, int w)
    {
        adj[u].Add((v, w));
        adj[v].Add((u, w)); // Yönsüz için
    }

    public int[] Solve(int src)
    {
        int[] dist = new int[V];
        Array.Fill(dist, int.MaxValue);
        dist[src] = 0;

        // Min-heap: (mesafe, düğüm)
        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(src, 0);

        while (pq.Count > 0)
        {
            int u = pq.Dequeue();

            foreach (var (v, w) in adj[u])
            {
                if (dist[u] != int.MaxValue && dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    pq.Enqueue(v, dist[v]);
                }
            }
        }
        return dist;
    }

    // Yolu geri izle
    public List<int> GetPath(int src, int dest)
    {
        int[] dist = new int[V];
        int[] prev = new int[V];
        Array.Fill(dist, int.MaxValue);
        Array.Fill(prev, -1);
        dist[src] = 0;

        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(src, 0);

        while (pq.Count > 0)
        {
            int u = pq.Dequeue();
            foreach (var (v, w) in adj[u])
            {
                if (dist[u] + w < dist[v])
                {
                    dist[v] = dist[u] + w;
                    prev[v] = u;
                    pq.Enqueue(v, dist[v]);
                }
            }
        }

        var path = new List<int>();
        for (int at = dest; at != -1; at = prev[at])
            path.Insert(0, at);

        return path[0] == src ? path : new List<int>();
    }
}

// Test
var g = new Dijkstra(5);
g.AddEdge(0, 1, 4);
g.AddEdge(0, 2, 1);
g.AddEdge(2, 1, 2);
g.AddEdge(1, 3, 1);
g.AddEdge(2, 3, 5);

int[] distances = g.Solve(0);
// 0->1: 3, 0->2: 1, 0->3: 4`,
    },
    unionfind: {
      title: 'Union-Find (Disjoint Set Union)',
      complexity: 'O(α(n)) ≈ O(1) amortized',
      space: 'O(n)',
      useCase: "Kruskal'ın MST, döngü tespiti, bağlı bileşenler",
      code: `public class UnionFind
{
    private int[] parent, rank;

    public UnionFind(int n)
    {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    // Path compression ile Find
    public int Find(int x)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x]); // Path compression
        return parent[x];
    }

    // Union by rank
    public bool Union(int x, int y)
    {
        int px = Find(x), py = Find(y);
        if (px == py) return false; // Zaten aynı kümede

        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }

        return true;
    }

    public bool Connected(int x, int y) => Find(x) == Find(y);
}

// Kruskal'ın MST Algoritması
public class Kruskal
{
    public int MST(int n, List<(int u, int v, int w)> edges)
    {
        edges.Sort((a, b) => a.w.CompareTo(b.w));
        var uf = new UnionFind(n);
        int totalWeight = 0, edgeCount = 0;

        foreach (var (u, v, w) in edges)
        {
            if (uf.Union(u, v))
            {
                totalWeight += w;
                edgeCount++;
                Console.WriteLine($"Kenar {u}-{v} (ağırlık: {w}) MST'ye eklendi");
                if (edgeCount == n - 1) break;
            }
        }
        return totalWeight;
    }
}`,
    },
  };

  const current = algorithms[activeAlgo];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Ana Sayfa</a> › <a href="/konular">Algoritmalar</a> › Graf Algoritmaları
          </div>
          <h1>🕸️ Graf Algoritmaları</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700 }}>
            BFS, DFS, Dijkstra, Union-Find ve daha fazlası. Gerçek dünya problemlerini
            çözmek için vazgeçilmez algoritmalar.
          </p>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Graf Türleri */}
        <h2 style={{ marginBottom: 20 }}>📊 Graf Türleri</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { title: 'Yönsüz Graf', desc: 'Kenarlar çift yönlüdür. Arkadaşlık ağları.', icon: '↔️' },
            { title: 'Yönlü Graf (DAG)', desc: 'Kenarlar tek yönlüdür. Bağımlılık grafleri.', icon: '→' },
            { title: 'Ağırlıklı Graf', desc: 'Kenarlarda ağırlık/maliyet vardır. Haritalar.', icon: '⚖️' },
          ].map(item => (
            <div key={item.title} className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{item.icon}</div>
              <h3 style={{ marginBottom: 8, fontSize: '1rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Graf Temsil */}
        <h2 style={{ marginBottom: 20 }}>🗂️ Graf Temsili</h2>
        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div>
            <h3 style={{ marginBottom: 12, color: 'var(--primary)' }}>Komşuluk Listesi (Adjacency List)</h3>
            <CodeBlock code={`// Dictionary tabanlı - sparse graflar için ideal
var graph = new Dictionary<int, List<int>>();
graph[0] = new List<int> { 1, 2 };
graph[1] = new List<int> { 0, 3 };
graph[2] = new List<int> { 0, 3 };
graph[3] = new List<int> { 1, 2 };

// Alan: O(V + E)  ✓ Verimli`} language="csharp" filename="AdjacencyList.cs" />
          </div>
          <div>
            <h3 style={{ marginBottom: 12, color: 'var(--secondary)' }}>Komşuluk Matrisi (Adjacency Matrix)</h3>
            <CodeBlock code={`// 2D dizi - dense graflar için
int[,] matrix = new int[4, 4];
matrix[0, 1] = 1; // 0→1 kenarı var
matrix[0, 2] = 1; // 0→2 kenarı var
matrix[1, 3] = 1; // 1→3 kenarı var

// Alan: O(V²) - büyük graflarda wasteful
// Edge query: O(1) ✓`} language="csharp" filename="AdjacencyMatrix.cs" />
          </div>
        </div>

        <AdBanner size="rectangle" />

        {/* Algoritma Seçici */}
        <h2 style={{ margin: '40px 0 20px' }}>🔧 Algoritma Detayları</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {Object.entries(algorithms).map(([key, algo]) => (
            <button
              key={key}
              onClick={() => setActiveAlgo(key)}
              className={`btn ${activeAlgo === key ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.85rem' }}
            >
              {algo.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <h3 style={{ color: 'var(--primary)' }}>{current.title}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-medium">⏱ {current.complexity}</span>
              <span className="badge badge-basic">💾 {current.space}</span>
            </div>
          </div>
          <div className="info-box tip" style={{ marginBottom: 16 }}>
            <div className="info-title">🎯 Kullanım Alanları</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{current.useCase}</p>
          </div>
          <CodeBlock code={current.code} language="csharp" filename={`${current.title}.cs`} />
        </div>

        <AdBanner size="banner" />

        {/* Öğrenme Yolu */}
        <div className="card" style={{ marginTop: 40, borderColor: 'rgba(0, 212, 170, 0.3)' }}>
          <h2 style={{ marginBottom: 20 }}>🗺️ Graf Algoritmaları Öğrenme Yolu</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { level: '1. Hafta', topics: 'Graf temsilleri, BFS, DFS', color: 'var(--green)' },
              { level: '2. Hafta', topics: "Dijkstra, Bellman-Ford, Floyd-Warshall", color: 'var(--blue)' },
              { level: '3. Hafta', topics: "Union-Find, Kruskal, Prim MST", color: 'var(--primary)' },
              { level: '4. Hafta', topics: 'Topological Sort, SCC (Tarjan/Kosaraju)', color: 'var(--yellow)' },
              { level: '5+ Hafta', topics: 'Max Flow, Bipartite Matching, A*', color: 'var(--orange)' },
            ].map(item => (
              <div key={item.level} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{
                  minWidth: 100, padding: '4px 12px', borderRadius: 6,
                  background: `${item.color}22`, color: item.color,
                  fontSize: '0.8rem', fontWeight: 700, textAlign: 'center'
                }}>{item.level}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.topics}</div>
              </div>
            ))}
          </div>
          <div className="info-box warning" style={{ marginTop: 20 }}>
            <div className="info-title">💡 Pro Tavsiye</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Graf problemlerini anlamak için önce kağıt üzerinde çiz! Görsel düşünmek
              kodu yazmaktan çok daha önemli. Her algoritmayı küçük örneklerle trace et.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
