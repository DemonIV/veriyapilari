import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function HashTable() {
  const [open, setOpen] = useState(null);

  const problems = [
    {
      id: 1, difficulty: 'easy', title: 'İki Sayının Toplamı (Hash ile)',
      code: `public int[] TwoSum(int[] nums, int target)
{
    var map = new Dictionary<int, int>(); // değer → index
    for (int i = 0; i < nums.Length; i++)
    {
        int complement = target - nums[i];
        if (map.ContainsKey(complement))
            return new[] { map[complement], i };
        map[nums[i]] = i;
    }
    return Array.Empty<int>();
} // O(n) zaman, O(n) alan`
    },
    {
      id: 2, difficulty: 'easy', title: 'En Sık Tekrar Eden Eleman',
      code: `public int MostFrequent(int[] nums)
{
    var freq = new Dictionary<int, int>();
    foreach (int n in nums)
        freq[n] = freq.GetValueOrDefault(n, 0) + 1;

    return freq.MaxBy(kv => kv.Value).Key;

    // Alternatif: bucket sort O(n)
}`
    },
    {
      id: 3, difficulty: 'medium', title: 'Anagram Grupları',
      code: `public IList<IList<string>> GroupAnagrams(string[] strs)
{
    var map = new Dictionary<string, List<string>>();

    foreach (string s in strs)
    {
        // Karakterleri sırala → key
        char[] chars = s.ToCharArray();
        Array.Sort(chars);
        string key = new string(chars);

        if (!map.ContainsKey(key)) map[key] = new List<string>();
        map[key].Add(s);
    }
    return new List<IList<string>>(map.Values);
}
// ["eat","tea","tan","ate","nat","bat"]
// → [["eat","tea","ate"],["tan","nat"],["bat"]]`
    },
    {
      id: 4, difficulty: 'medium', title: 'LRU Cache Implementasyonu',
      code: `public class LRUCache
{
    private int capacity;
    private Dictionary<int, LinkedListNode<(int key, int val)>> map = new();
    private LinkedList<(int key, int val)> list = new();

    public LRUCache(int capacity) { this.capacity = capacity; }

    public int Get(int key)
    {
        if (!map.ContainsKey(key)) return -1;
        var node = map[key];
        list.Remove(node);
        list.AddFirst(node);
        return node.Value.val;
    }

    public void Put(int key, int value)
    {
        if (map.ContainsKey(key)) list.Remove(map[key]);
        var node = list.AddFirst((key, value));
        map[key] = node;

        if (map.Count > capacity)
        {
            map.Remove(list.Last.Value.key);
            list.RemoveLast();
        }
    }
}`
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Veri Yapıları › Hash Tablosu</div>
          <h1>🗂️ Hash Tablosu (Hash Table)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Ortalama O(1) arama, ekleme ve silme işlemi sunan güçlü veri yapısı.
            C#'ta Dictionary&lt;K,V&gt; ile kullanılır. Algoritma sorularının vazgeçilmezi.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Nasıl Çalışır */}
        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>🧠 Nasıl Çalışır?</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              Hash fonksiyonu anahtarı bir tam sayıya (hash code) dönüştürür.
              Bu sayı mod işlemiyle dizi indeksine çevrilir. Çakışmalar (collision)
              chaining veya open addressing ile çözülür.
            </p>
            <div className="info-box info">
              <div className="info-title">C# GetHashCode()</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Her nesne <code>GetHashCode()</code> metoduna sahiptir.
                Dictionary bu değeri kullanır. Value type'lar için otomatik, reference type için override edilmeli.
              </p>
            </div>
          </div>
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, fontFamily: 'Fira Code, monospace', fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>// Hash Tablosu Görünümü (Chaining):</div>
            {[
              { idx: '[0]', items: '→ NULL' },
              { idx: '[1]', items: '→ ("ali", 25) → NULL' },
              { idx: '[2]', items: '→ ("veli", 30) → ("zeli", 22) → NULL' },
              { idx: '[3]', items: '→ NULL' },
              { idx: '[4]', items: '→ ("meli", 28) → NULL' },
            ].map(row => (
              <div key={row.idx} style={{ marginBottom: 4 }}>
                <span style={{ color: 'var(--primary)' }}>{row.idx}</span>
                <span style={{ color: 'var(--text-muted)' }}> {row.items}</span>
              </div>
            ))}
            <div style={{ color: 'var(--yellow)', marginTop: 12 }}>
              // "zeli": hash%5 = 2 → collision → chain
            </div>
          </div>
        </div>

        {/* Karmaşıklık */}
        <h2 style={{ marginBottom: 16 }}>⏱ Karmaşıklık</h2>
        <table style={{ marginBottom: 40 }}>
          <thead><tr><th>İşlem</th><th>Ortalama</th><th>En Kötü</th></tr></thead>
          <tbody>
            {[
              ['Arama', 'O(1)', 'O(n)'],
              ['Ekleme', 'O(1)', 'O(n)'],
              ['Silme', 'O(1)', 'O(n)'],
              ['Yer', 'O(n)', 'O(n)'],
            ].map(r => (
              <tr key={r[0]}>
                <td style={{ color: 'var(--text)' }}>{r[0]}</td>
                <td className="complexity-o1">{r[1]}</td>
                <td className="complexity-on">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginBottom: 20 }}>💻 C# Dictionary Kullanımı</h2>
        <CodeBlock filename="DictionaryKullanim.cs" code={`// Temel kullanım
var dict = new Dictionary<string, int>();

dict["ali"] = 25;                    // Ekle/güncelle
dict.Add("veli", 30);               // Sadece ekle (var ise exception)

// Güvenli okuma
if (dict.TryGetValue("ali", out int yas))
    Console.WriteLine($"Ali: {yas}");

int deger = dict.GetValueOrDefault("yok", 0); // default 0

// Kontrol
bool varMi = dict.ContainsKey("ali");   // true
bool degVarMi = dict.ContainsValue(30); // true

// Silme
dict.Remove("veli");

// Dolaşma
foreach (var (key, value) in dict)
    Console.WriteLine($"{key}: {value}");

// HashSet - sadece anahtar, değer yok
var set = new HashSet<int> { 1, 2, 3, 4 };
set.Add(5);
set.Remove(1);
bool containsFive = set.Contains(5);       // O(1)

// Küme operasyonları
var a = new HashSet<int> { 1, 2, 3, 4 };
var b = new HashSet<int> { 3, 4, 5, 6 };
a.IntersectWith(b);   // Kesişim: {3, 4}
a.UnionWith(b);       // Birleşim
a.ExceptWith(b);      // Fark

// SortedDictionary - sıralı, O(log n)
var sorted = new SortedDictionary<string, int>();
sorted["banana"] = 2;
sorted["apple"] = 5;
// Otomatik sıralı: apple, banana`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <h2 style={{ marginBottom: 20 }}>🏋️ Pratik Sorular</h2>
        {problems.map(p => (
          <div key={p.id} className="accordion" style={{ marginBottom: 10 }}>
            <div className="accordion-header" onClick={() => setOpen(open === p.id ? null : p.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>#{p.id}</span>
                <span style={{ fontWeight: 600 }}>{p.title}</span>
                <span className={`badge badge-${p.difficulty}`}>{p.difficulty === 'easy' ? 'Kolay' : 'Orta'}</span>
              </div>
              <span style={{ color: 'var(--primary)' }}>{open === p.id ? '▲' : '▼'}</span>
            </div>
            {open === p.id && (
              <div className="accordion-body">
                <CodeBlock code={p.code} language="csharp" filename={`Soru${p.id}.cs`} />
              </div>
            )}
          </div>
        ))}

        <div className="card" style={{ marginTop: 32, borderColor: 'rgba(0,212,170,0.3)' }}>
          <h2 style={{ marginBottom: 16 }}>🎓 Hash Table İpuçları</h2>
          <div className="info-box warning">
            <div className="info-title">💡 Altın Kural</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Bir problemde O(n²) brute force görüyorsan, hemen Hash Map/Set ile
              O(n)'e indirebilir misin diye düşün. Çoğu dizi/string problemi bu şekilde çözülür.
            </p>
          </div>
        </div>

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 16 }}>
          <a href="/veri-yapilari/agac" className="btn btn-outline">← Ağaç</a>
          <a href="/algoritmalar/siralama" className="btn btn-primary">Sonraki: Sıralama →</a>
        </div>
      </div>
    </div>
  );
}
