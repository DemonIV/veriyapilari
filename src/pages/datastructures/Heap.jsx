import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function Heap() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Veri Yapıları › Heap</div>
          <h1>⛰️ Heap (Yığın Ağacı)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            En küçük/en büyük elemana O(1)'de ulaşmanı sağlayan tam ikili ağaç.
            PriorityQueue'nun motoru, Dijkstra'nın kalbi, "Top-K" sorularının anahtarı.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <h2 style={{ marginBottom: 20 }}>📖 Temel Kavramlar</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { t: 'Min-Heap', d: 'Her düğüm çocuklarından küçük veya eşit. Kök = en küçük eleman.' },
            { t: 'Max-Heap', d: 'Her düğüm çocuklarından büyük veya eşit. Kök = en büyük eleman.' },
            { t: 'Tam İkili Ağaç', d: 'Son seviye hariç tüm seviyeler dolu; son seviye soldan dolar. Bu yüzden dizi ile temsil edilir.' },
            { t: 'Heapify', d: 'Bozulan heap özelliğini yukarı (sift-up) veya aşağı (sift-down) düzeltme işlemi. O(log n).' },
            { t: 'Dizi Temsili', d: 'i. düğümün çocukları 2i+1 ve 2i+2, ebeveyni (i-1)/2. Pointer yok, cache dostu.' },
            { t: 'Heap ≠ Stack', d: 'Buradaki heap, bellekteki heap bölgesiyle alakasız — isim benzerliği kafa karıştırmasın.' },
          ].map(item => (
            <div key={item.t} className="card">
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--primary)' }}>{item.t}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 16 }}>⏱ Karmaşıklık Tablosu</h2>
        <table style={{ marginBottom: 40 }}>
          <thead>
            <tr><th>İşlem</th><th>Karmaşıklık</th><th>Açıklama</th></tr>
          </thead>
          <tbody>
            <tr><td>Peek (min/max görme)</td><td><span className="complexity-o1">O(1)</span></td><td>Kök her zaman dizinin 0. elemanı</td></tr>
            <tr><td>Insert (ekleme)</td><td><span className="complexity-ologn">O(log n)</span></td><td>Sona ekle, yukarı doğru sift-up</td></tr>
            <tr><td>Extract (kökü çıkarma)</td><td><span className="complexity-ologn">O(log n)</span></td><td>Son elemanı köke taşı, sift-down</td></tr>
            <tr><td>Build-Heap (diziden kurma)</td><td><span className="complexity-on">O(n)</span></td><td>Sondan başa heapify — O(n log n) değil!</td></tr>
            <tr><td>Arama</td><td><span className="complexity-on2">O(n)</span></td><td>Heap sıralı değildir, arama için uygun değil</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginBottom: 20 }}>💻 Min-Heap Implementasyonu (C#)</h2>
        <CodeBlock filename="MinHeap.cs" code={`public class MinHeap
{
    private readonly List<int> heap = new();

    public int Count => heap.Count;
    public int Peek() => heap[0]; // En küçük eleman her zaman kökte

    public void Insert(int value)
    {
        heap.Add(value);
        SiftUp(heap.Count - 1);
    }

    public int ExtractMin()
    {
        int min = heap[0];
        heap[0] = heap[^1];          // Son elemanı köke taşı
        heap.RemoveAt(heap.Count - 1);
        if (heap.Count > 0) SiftDown(0);
        return min;
    }

    private void SiftUp(int i)
    {
        while (i > 0)
        {
            int parent = (i - 1) / 2;
            if (heap[i] >= heap[parent]) break;
            (heap[i], heap[parent]) = (heap[parent], heap[i]);
            i = parent;
        }
    }

    private void SiftDown(int i)
    {
        while (true)
        {
            int smallest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < heap.Count && heap[left] < heap[smallest]) smallest = left;
            if (right < heap.Count && heap[right] < heap[smallest]) smallest = right;
            if (smallest == i) break;
            (heap[i], heap[smallest]) = (heap[smallest], heap[i]);
            i = smallest;
        }
    }
}

// Kullanım
var heap = new MinHeap();
foreach (int x in new[] { 7, 3, 9, 1, 5 }) heap.Insert(x);

Console.WriteLine(heap.ExtractMin()); // 1
Console.WriteLine(heap.ExtractMin()); // 3
Console.WriteLine(heap.Peek());       // 5`} />

        <div className="info-box info" style={{ margin: '24px 0' }}>
          <div className="info-title">💡 .NET'te Hazır Çözüm</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            .NET 6+ ile gelen <code>PriorityQueue&lt;TElement, TPriority&gt;</code> dahili olarak
            quaternary (4-ary) min-heap kullanır. Mülakatta implementasyon sorulmadıkça bunu kullan.
          </p>
        </div>

        <h2 style={{ marginBottom: 20 }}>💻 PriorityQueue ile Top-K Problemi</h2>
        <CodeBlock filename="TopK.cs" code={`// Klasik mülakat sorusu: dizideki en büyük k elemanı bul
// Püf nokta: en BÜYÜK k eleman için MIN-heap kullanılır!
public int[] TopKLargest(int[] nums, int k)
{
    // Heap'te her zaman "şu ana kadarki en büyük k aday" tutulur
    var pq = new PriorityQueue<int, int>(); // varsayılan: min-heap

    foreach (int num in nums)
    {
        pq.Enqueue(num, num);
        if (pq.Count > k)
            pq.Dequeue(); // En küçüğü at → kalanlar en büyük k eleman
    }

    var result = new int[k];
    for (int i = k - 1; i >= 0; i--)
        result[i] = pq.Dequeue();
    return result;
}

// O(n log k) — tüm diziyi sıralamaktan (O(n log n)) daha hızlı
Console.WriteLine(string.Join(",", TopKLargest(new[] { 3, 1, 8, 2, 9, 5 }, 3)));
// 5,8,9`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <h2 style={{ marginBottom: 20 }}>💻 Heapify ile O(n) Heap Kurma</h2>
        <CodeBlock filename="BuildHeap.cs" code={`// Diziden heap kurmanın iki yolu var:
// 1) n kez Insert → O(n log n)
// 2) Sondan başa SiftDown (Floyd's build-heap) → O(n)  ✅
public static void BuildMaxHeap(int[] arr)
{
    // Yaprakların heapify'a ihtiyacı yok; son iç düğümden başla
    for (int i = arr.Length / 2 - 1; i >= 0; i--)
        SiftDown(arr, i, arr.Length);
}

static void SiftDown(int[] arr, int i, int n)
{
    while (true)
    {
        int largest = i, left = 2 * i + 1, right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest == i) break;
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        i = largest;
    }
}`} />

        <div className="info-box tip" style={{ margin: '24px 0' }}>
          <div className="info-title">🎯 Nerede Kullanılır?</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <strong>Dijkstra</strong> en kısa yol, <strong>Heap Sort</strong>, işletim sistemi görev
            zamanlayıcıları, medyan bulma (iki heap tekniği), Huffman kodlama ve tüm "en büyük/küçük K"
            soruları. Heap Sort için{' '}
            <Link to="/algoritmalar/siralama">Sıralama Algoritmaları</Link> sayfasına bak.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/veri-yapilari/graf" className="btn btn-outline">← Graf</Link>
          <Link to="/algoritmalar/siralama" className="btn btn-primary">Sıralama Algoritmaları →</Link>
        </div>
      </div>
    </div>
  );
}
