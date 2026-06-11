import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import { Link } from 'react-router-dom';

const basicProjects = [
  {
    id: 1,
    title: 'Hesap Makinesi (Stack Tabanlı)',
    desc: 'Postfix/infix ifadeleri değerlendiren, parantezli işlemleri destekleyen hesap makinesi.',
    learns: ['Stack veri yapısı', 'Shunting-yard algoritması', 'Operatör önceliği'],
    tags: ['Stack', 'Başlangıç'],
    difficulty: 'basic',
    code: `using System;
using System.Collections.Generic;

class Calculator
{
    private static int Precedence(char op)
    {
        return op switch { '+' or '-' => 1, '*' or '/' => 2, '^' => 3, _ => 0 };
    }

    private static double ApplyOp(double a, double b, char op) => op switch
    {
        '+' => a + b, '-' => a - b,
        '*' => a * b, '/' => b == 0 ? throw new DivideByZeroException() : a / b,
        '^' => Math.Pow(a, b),
        _ => throw new InvalidOperationException()
    };

    public static double Evaluate(string expression)
    {
        var nums = new Stack<double>();
        var ops = new Stack<char>();

        for (int i = 0; i < expression.Length; i++)
        {
            if (char.IsWhiteSpace(expression[i])) continue;

            if (char.IsDigit(expression[i]) || expression[i] == '.')
            {
                int j = i;
                while (j < expression.Length && (char.IsDigit(expression[j]) || expression[j] == '.'))
                    j++;
                nums.Push(double.Parse(expression[i..j]));
                i = j - 1;
            }
            else if (expression[i] == '(')
                ops.Push('(');
            else if (expression[i] == ')')
            {
                while (ops.Peek() != '(')
                {
                    double b = nums.Pop(), a = nums.Pop();
                    nums.Push(ApplyOp(a, b, ops.Pop()));
                }
                ops.Pop();
            }
            else if ("+-*/^".Contains(expression[i]))
            {
                while (ops.Count > 0 && ops.Peek() != '(' &&
                       Precedence(ops.Peek()) >= Precedence(expression[i]))
                {
                    double b = nums.Pop(), a = nums.Pop();
                    nums.Push(ApplyOp(a, b, ops.Pop()));
                }
                ops.Push(expression[i]);
            }
        }

        while (ops.Count > 0)
        {
            double b = nums.Pop(), a = nums.Pop();
            nums.Push(ApplyOp(a, b, ops.Pop()));
        }

        return nums.Pop();
    }

    static void Main()
    {
        Console.WriteLine("Hesap Makinesi - 'q' ile çık");
        while (true)
        {
            Console.Write("İfade: ");
            string input = Console.ReadLine();
            if (input == "q") break;
            try { Console.WriteLine($"= {Evaluate(input)}"); }
            catch (Exception ex) { Console.WriteLine($"Hata: {ex.Message}"); }
        }
    }
}`
  },
  {
    id: 2,
    title: 'Telefon Rehberi (Hash Tablosu)',
    desc: 'O(1) arama, ekleme ve silme destekli tam özellikli telefon rehberi.',
    learns: ['Dictionary<K,V>', 'Hash fonksiyonları', 'Collision handling'],
    tags: ['Hash Table', 'Başlangıç'],
    difficulty: 'basic',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

class PhoneBook
{
    private Dictionary<string, List<string>> contacts = new(StringComparer.OrdinalIgnoreCase);

    public void Add(string name, string phone)
    {
        if (!contacts.ContainsKey(name)) contacts[name] = new List<string>();
        if (!contacts[name].Contains(phone))
        {
            contacts[name].Add(phone);
            Console.WriteLine($"✓ {name} eklendi: {phone}");
        }
        else Console.WriteLine("Bu numara zaten kayıtlı.");
    }

    public void Search(string name)
    {
        if (contacts.TryGetValue(name, out var phones))
        {
            Console.WriteLine($"📞 {name}:");
            phones.ForEach(p => Console.WriteLine($"   {p}"));
        }
        else Console.WriteLine($"'{name}' bulunamadı.");
    }

    public void Delete(string name)
    {
        if (contacts.Remove(name)) Console.WriteLine($"✓ {name} silindi.");
        else Console.WriteLine("Kişi bulunamadı.");
    }

    public void SearchByPrefix(string prefix)
    {
        var results = contacts.Where(kv => kv.Key.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)).ToList();
        if (results.Count == 0) Console.WriteLine("Sonuç yok.");
        else results.ForEach(kv => Console.WriteLine($"{kv.Key}: {string.Join(", ", kv.Value)}"));
    }

    public void ListAll()
    {
        if (contacts.Count == 0) { Console.WriteLine("Rehber boş."); return; }
        foreach (var (name, phones) in contacts.OrderBy(kv => kv.Key))
            Console.WriteLine($"{name,-20} {string.Join(" | ", phones)}");
    }

    static void Main()
    {
        var book = new PhoneBook();
        book.Add("Ali Yılmaz", "0532-111-2233");
        book.Add("Veli Kaya", "0541-222-3344");
        book.Add("Ayşe Demir", "0551-333-4455");
        book.Search("ali yılmaz");
        book.SearchByPrefix("A");
        book.ListAll();
    }
}`
  },
  {
    id: 3,
    title: 'Sıralama Karşılaştırıcı',
    desc: 'Farklı sıralama algoritmalarını çalışma süresi ve adım sayısı açısından karşılaştır.',
    learns: ['Bubble/Merge/Quick/Heap Sort', 'Performans ölçümü', 'Stopwatch kullanımı'],
    tags: ['Sıralama', 'Başlangıç'],
    difficulty: 'basic',
    code: `using System;
using System.Diagnostics;
using System.Linq;

class SortBenchmark
{
    static int steps;

    static void BubbleSort(int[] arr)
    {
        steps = 0;
        for (int i = 0; i < arr.Length - 1; i++)
            for (int j = 0; j < arr.Length - i - 1; j++)
            {
                steps++;
                if (arr[j] > arr[j + 1]) (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
            }
    }

    static void MergeSort(int[] arr, int l, int r)
    {
        if (l >= r) return;
        int m = (l + r) / 2;
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        // Merge...
        steps += r - l + 1;
    }

    static (long ms, int stepCount) Benchmark(Action<int[]> sort, int[] original)
    {
        int[] arr = (int[])original.Clone();
        steps = 0;
        var sw = Stopwatch.StartNew();
        sort(arr);
        sw.Stop();
        return (sw.ElapsedMilliseconds, steps);
    }

    static void Main()
    {
        var rand = new Random(42);
        int n = 10000;
        int[] data = Enumerable.Range(0, n).Select(_ => rand.Next(100000)).ToArray();

        Console.WriteLine($"{"Algoritma",-20} {"Süre (ms)",-12} {"Adım Sayısı"}");
        Console.WriteLine(new string('-', 50));

        var tests = new (string name, Action<int[]> sort)[]
        {
            ("Bubble Sort", arr => BubbleSort(arr)),
            ("Merge Sort", arr => MergeSort(arr, 0, arr.Length - 1)),
            ("Array.Sort", arr => Array.Sort(arr)),
        };

        foreach (var (name, sort) in tests)
        {
            var (ms, s) = Benchmark(sort, data);
            Console.WriteLine($"{name,-20} {ms,-12} {s:N0}");
        }
    }
}`
  },
];

const advancedProjects = [
  {
    id: 4,
    title: 'Graf Rota Bulucu (Dijkstra)',
    desc: 'Şehirler arası en kısa rota bulan, görsel harita çıktısı veren uygulama.',
    learns: ['Dijkstra Algoritması', 'PriorityQueue<T>', 'Graf modelleme'],
    tags: ['Graf', 'İleri'],
    difficulty: 'advanced',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

class CityRouter
{
    private Dictionary<string, List<(string city, int dist)>> graph = new();

    public void AddRoad(string from, string to, int km)
    {
        if (!graph.ContainsKey(from)) graph[from] = new();
        if (!graph.ContainsKey(to)) graph[to] = new();
        graph[from].Add((to, km));
        graph[to].Add((from, km)); // Çift yönlü yol
    }

    public (int distance, List<string> path) FindShortestRoute(string src, string dest)
    {
        var dist = new Dictionary<string, int> { [src] = 0 };
        var prev = new Dictionary<string, string>();
        var pq = new PriorityQueue<string, int>();
        pq.Enqueue(src, 0);

        while (pq.Count > 0)
        {
            string city = pq.Dequeue();
            if (city == dest) break;

            foreach (var (neighbor, km) in graph.GetValueOrDefault(city, new()))
            {
                int newDist = dist.GetValueOrDefault(city, int.MaxValue) + km;
                if (newDist < dist.GetValueOrDefault(neighbor, int.MaxValue))
                {
                    dist[neighbor] = newDist;
                    prev[neighbor] = city;
                    pq.Enqueue(neighbor, newDist);
                }
            }
        }

        if (!dist.ContainsKey(dest)) return (-1, null);

        // Yolu geri izle
        var path = new List<string>();
        for (string at = dest; at != null; at = prev.GetValueOrDefault(at))
            path.Insert(0, at);

        return (dist[dest], path);
    }

    static void Main()
    {
        var router = new CityRouter();
        router.AddRoad("İstanbul", "Ankara", 450);
        router.AddRoad("İstanbul", "Bursa", 230);
        router.AddRoad("Bursa", "Ankara", 380);
        router.AddRoad("Ankara", "İzmir", 590);
        router.AddRoad("Ankara", "Konya", 260);
        router.AddRoad("Konya", "İzmir", 440);

        var (dist, path) = router.FindShortestRoute("İstanbul", "İzmir");
        Console.WriteLine($"En kısa mesafe: {dist} km");
        Console.WriteLine($"Rota: {string.Join(" → ", path)}");
        // Rota: İstanbul → Ankara → Konya → İzmir (1300 km)
    }
}`
  },
  {
    id: 5,
    title: 'Mini Arama Motoru (Trie)',
    desc: 'Trie veri yapısı ile prefix tabanlı arama motoru. Otomatik tamamlama özelliği.',
    learns: ['Trie veri yapısı', 'Prefix arama O(m)', 'Otomatik tamamlama'],
    tags: ['Trie', 'İleri'],
    difficulty: 'advanced',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

class TrieNode
{
    public Dictionary<char, TrieNode> Children = new();
    public bool IsEnd;
    public int Frequency; // Arama sıklığı
}

class SearchEngine
{
    private TrieNode root = new TrieNode();

    public void Insert(string word, int freq = 1)
    {
        var node = root;
        foreach (char c in word.ToLower())
        {
            if (!node.Children.ContainsKey(c))
                node.Children[c] = new TrieNode();
            node = node.Children[c];
        }
        node.IsEnd = true;
        node.Frequency = freq;
    }

    public bool Search(string word)
    {
        var node = FindNode(word);
        return node != null && node.IsEnd;
    }

    public List<string> Autocomplete(string prefix, int maxResults = 5)
    {
        var node = FindNode(prefix);
        if (node == null) return new List<string>();

        var results = new List<(string word, int freq)>();
        DFS(node, prefix.ToLower(), results);

        return results.OrderByDescending(r => r.freq)
                      .Take(maxResults)
                      .Select(r => r.word)
                      .ToList();
    }

    private TrieNode FindNode(string prefix)
    {
        var node = root;
        foreach (char c in prefix.ToLower())
        {
            if (!node.Children.ContainsKey(c)) return null;
            node = node.Children[c];
        }
        return node;
    }

    private void DFS(TrieNode node, string current, List<(string, int)> results)
    {
        if (node.IsEnd) results.Add((current, node.Frequency));
        foreach (var (c, child) in node.Children)
            DFS(child, current + c, results);
    }

    static void Main()
    {
        var engine = new SearchEngine();
        string[] words = {"algoritma", "ağaç", "dizi", "dinamik", "döngü",
                          "graf", "hash", "heap", "kuyruk", "sıralama"};
        foreach (var (w, i) in words.Select((w, i) => (w, i)))
            engine.Insert(w, (i + 1) * 10);

        Console.Write("Arama: ");
        while (true)
        {
            string prefix = Console.ReadLine();
            if (prefix == "q") break;
            var suggestions = engine.Autocomplete(prefix);
            Console.WriteLine(suggestions.Count > 0
                ? $"Öneriler: {string.Join(", ", suggestions)}"
                : "Sonuç bulunamadı.");
            Console.Write("Arama: ");
        }
    }
}`
  },
];

export default function Projects() {
  const [open, setOpen] = useState(null);

  const ProjectCard = ({ project }) => (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
        <h3 style={{ fontSize: '1.1rem' }}>{project.title}</h3>
        <span className={`badge badge-${project.difficulty === 'basic' ? 'basic' : 'advanced'}`}>
          {project.difficulty === 'basic' ? '🔰 Temel' : '🚀 İleri'}
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 12, lineHeight: 1.6 }}>{project.desc}</p>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: 6 }}>Öğreneceklerin:</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.learns.map(l => (
            <span key={l} style={{
              background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)',
              color: 'var(--secondary)', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem'
            }}>{l}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {project.tags.map(t => (
          <span key={t} style={{
            background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)',
            color: 'var(--primary)', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem'
          }}>{t}</span>
        ))}
      </div>

      <button
        onClick={() => setOpen(open === project.id ? null : project.id)}
        className="btn btn-primary"
        style={{ marginTop: 16, fontSize: '0.85rem' }}
      >
        {open === project.id ? '▲ Kodu Gizle' : '▼ Kodu Gör'}
      </button>

      {open === project.id && (
        <div style={{ marginTop: 16 }}>
          <CodeBlock code={project.code} language="csharp" filename={`${project.title}.cs`} />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Projeler</div>
          <h1>🛠️ Uygulamalı Projeler</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Temel veri yapılarını kullanarak gerçek projeler inşa et.
            Her proje kopyala-yapıştır ile .NET Fiddle veya Visual Studio'da çalıştırılabilir.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <AdBanner size="banner" style={{ marginBottom: 40 }} />

        <div className="info-box tip" style={{ marginBottom: 40 }}>
          <div className="info-title">🎯 Nasıl Kullanmalısın?</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            1. Önce kodun mantığını anla (ne yapıyor, neden bu veri yapısını kullanıyor?)<br/>
            2. .NET Fiddle'da kodu çalıştır ve çıktıyı gözlemle<br/>
            3. Kodu kendi projenize uyarla veya yeni özellikler ekle<br/>
            4. Zorluk olarak: Kodu sıfırdan kendi başına yaz!
          </p>
        </div>

        <h2 style={{ marginBottom: 24 }}>🔰 Temel Projeler</h2>
        {basicProjects.map(p => <ProjectCard key={p.id} project={p} />)}

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <h2 style={{ marginBottom: 24 }}>🚀 İleri Projeler</h2>
        {advancedProjects.map(p => <ProjectCard key={p.id} project={p} />)}

        {/* Ek Proje Fikirleri */}
        <div className="card" style={{ marginTop: 32, borderColor: 'rgba(108,99,255,0.3)' }}>
          <h2 style={{ marginBottom: 20 }}>💡 Daha Fazla Proje Fikri</h2>
          <div className="grid-2" style={{ gap: 16 }}>
            {[
              { title: 'LRU Cache', desc: 'En az kullanılan sayfayı silen cache (LinkedList + HashMap)', level: 'Orta' },
              { title: 'Huffman Sıkıştırma', desc: 'Metin dosyasını Huffman encoding ile sıkıştır', level: 'İleri' },
              { title: 'Maze Solver', desc: 'BFS/DFS ile labirentte yol bul ve görselleştir', level: 'Orta' },
              { title: 'Kelime Oyunu', desc: 'Hash Set ile geçerli kelime kontrolü yapan oyun', level: 'Temel' },
              { title: 'Hisse Senedi Takip', desc: 'Stack ile portfolio takibi ve kar/zarar hesabı', level: 'Temel' },
              { title: 'Sosyal Ağ Analizi', desc: 'Graf ile arkadaşlık ağı, ortak arkadaş bulma', level: 'İleri' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.92rem' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{item.desc}</div>
                </div>
                <span className={`badge ${item.level === 'Temel' ? 'badge-easy' : item.level === 'Orta' ? 'badge-medium' : 'badge-hard'}`}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AdBanner size="banner" style={{ marginTop: 40 }} />
      </div>
    </div>
  );
}
