import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function Graph() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Veri Yapıları › Graf</div>
          <h1>🕸️ Graf (Graph)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Düğümler (vertex) ve kenarlardan (edge) oluşan, ilişkileri modelleyen veri yapısı.
            Sosyal ağlar, haritalar, internet — hepsi graf.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~4 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <h2 style={{ marginBottom: 20 }}>📖 Temel Kavramlar</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { t: 'Vertex (Düğüm)', d: 'Grafın temel birimi. Sosyal ağda kullanıcı, haritada şehir.' },
            { t: 'Edge (Kenar)', d: 'İki düğüm arasındaki bağlantı. Yönlü veya yönsüz olabilir.' },
            { t: 'Degree (Derece)', d: 'Bir düğüme bağlı kenar sayısı. Yönlü grafta in/out-degree.' },
            { t: 'Path (Yol)', d: 'Bir düğümden diğerine kenarlar üzerinden geçiş dizisi.' },
            { t: 'Cycle (Döngü)', d: 'Başladığı düğüme dönen yol. DAG = döngüsüz yönlü graf.' },
            { t: 'Connected (Bağlı)', d: 'Her düğüm çiftinin arasında en az bir yol varsa.' },
          ].map(item => (
            <div key={item.t} className="card">
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--primary)' }}>{item.t}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 20 }}>💻 Genel Graf Sınıfı (C#)</h2>
        <CodeBlock filename="Graph.cs" code={`public class Graph<T>
{
    private Dictionary<T, List<T>> adj = new();
    public bool IsDirected { get; }

    public Graph(bool isDirected = false) => IsDirected = isDirected;

    public void AddVertex(T v)
    {
        if (!adj.ContainsKey(v)) adj[v] = new List<T>();
    }

    public void AddEdge(T u, T v)
    {
        AddVertex(u); AddVertex(v);
        adj[u].Add(v);
        if (!IsDirected) adj[v].Add(u);
    }

    public List<T> GetNeighbors(T v) => adj.GetValueOrDefault(v, new());

    public int VertexCount => adj.Count;
    public IEnumerable<T> Vertices => adj.Keys;

    // Bağlı bileşen sayısı
    public int CountComponents()
    {
        var visited = new HashSet<T>();
        int components = 0;

        foreach (T v in adj.Keys)
        {
            if (!visited.Contains(v))
            {
                components++;
                DFS(v, visited);
            }
        }
        return components;
    }

    private void DFS(T v, HashSet<T> visited)
    {
        visited.Add(v);
        foreach (T nb in adj[v])
            if (!visited.Contains(nb))
                DFS(nb, visited);
    }

    // Döngü tespiti (yönsüz graf)
    public bool HasCycle()
    {
        var visited = new HashSet<T>();
        foreach (T v in adj.Keys)
            if (!visited.Contains(v) && HasCycleDFS(v, default, visited, true))
                return true;
        return false;
    }

    private bool HasCycleDFS(T v, T parent, HashSet<T> visited, bool isRoot)
    {
        visited.Add(v);
        foreach (T nb in adj[v])
        {
            if (!visited.Contains(nb))
            {
                if (HasCycleDFS(nb, v, visited, false)) return true;
            }
            else if (isRoot || !nb.Equals(parent))
                return true;
        }
        return false;
    }
}

// Kullanım - Sosyal ağ örneği
var network = new Graph<string>();
network.AddEdge("Ali", "Veli");
network.AddEdge("Veli", "Ayşe");
network.AddEdge("Mehmet", "Fatma"); // Ayrı grup

Console.WriteLine(network.CountComponents()); // 2 arkadaş grubu`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <div className="info-box tip" style={{ marginBottom: 24 }}>
          <div className="info-title">🎯 Sonraki Adım</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Graf veri yapısını öğrendin. Şimdi asıl güç graf <strong>algoritmalarında</strong>:
            BFS, DFS, Dijkstra ve Union-Find için{' '}
            <a href="/algoritmalar/graf-algoritmalari">Graf Algoritmaları</a> sayfasına geç.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <a href="/veri-yapilari/hash-tablosu" className="btn btn-outline">← Hash Tablosu</a>
          <a href="/algoritmalar/graf-algoritmalari" className="btn btn-primary">Graf Algoritmaları →</a>
        </div>
      </div>
    </div>
  );
}
