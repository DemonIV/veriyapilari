import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

const sortingAlgos = {
  merge: {
    title: 'Merge Sort',
    complexity: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    best: 'Bağlı listeler, dış sıralama, stable sort',
    code: `public static void MergeSort(int[] arr, int left, int right)
{
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    MergeSort(arr, left, mid);
    MergeSort(arr, mid + 1, right);
    Merge(arr, left, mid, right);
}

private static void Merge(int[] arr, int left, int mid, int right)
{
    int n1 = mid - left + 1, n2 = right - mid;
    int[] L = new int[n1], R = new int[n2];

    Array.Copy(arr, left, L, 0, n1);
    Array.Copy(arr, mid + 1, R, 0, n2);

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Kullanım
int[] arr = {64, 34, 25, 12, 22, 11, 90};
MergeSort(arr, 0, arr.Length - 1);
// [11, 12, 22, 25, 34, 64, 90]`
  },
  quick: {
    title: 'Quick Sort',
    complexity: 'O(n log n)',
    space: 'O(log n)',
    stable: false,
    best: 'In-place, cache-friendly, ortalama en hızlı',
    code: `public static void QuickSort(int[] arr, int low, int high)
{
    if (low < high)
    {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high)
{
    // Randomized pivot - worst case O(n²)'yi engeller
    var rand = new Random();
    int pivotIdx = rand.Next(low, high + 1);
    (arr[pivotIdx], arr[high]) = (arr[high], arr[pivotIdx]);

    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++)
    {
        if (arr[j] <= pivot)
        {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
    return i + 1;
}

// 3-Way Quick Sort (tekrarlayan elemanlar için)
public static void QuickSort3Way(int[] arr, int lo, int hi)
{
    if (lo >= hi) return;
    int lt = lo, gt = hi, i = lo + 1;
    int pivot = arr[lo];

    while (i <= gt)
    {
        if (arr[i] < pivot) { (arr[lt], arr[i]) = (arr[i], arr[lt]); lt++; i++; }
        else if (arr[i] > pivot) { (arr[i], arr[gt]) = (arr[gt], arr[i]); gt--; }
        else i++;
    }
    QuickSort3Way(arr, lo, lt - 1);
    QuickSort3Way(arr, gt + 1, hi);
}`
  },
  heap: {
    title: 'Heap Sort',
    complexity: 'O(n log n)',
    space: 'O(1)',
    stable: false,
    best: 'O(1) ek alan, garantili O(n log n)',
    code: `public static void HeapSort(int[] arr)
{
    int n = arr.Length;

    // Max-heap oluştur
    for (int i = n / 2 - 1; i >= 0; i--)
        Heapify(arr, n, i);

    // Kökleri sona al
    for (int i = n - 1; i > 0; i--)
    {
        (arr[0], arr[i]) = (arr[i], arr[0]); // Max'ı sona taşı
        Heapify(arr, i, 0);
    }
}

private static void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i)
    {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}

int[] arr = {12, 11, 13, 5, 6, 7};
HeapSort(arr); // [5, 6, 7, 11, 12, 13]`
  },
  bubble: {
    title: 'Bubble Sort',
    complexity: 'O(n²)',
    space: 'O(1)',
    stable: true,
    best: 'Sadece öğrenme amaçlı / neredeyse sıralı diziler',
    code: `// Optimize edilmiş Bubble Sort
public static void BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break; // Zaten sıralı - erken çıkış
    }
}

// Selection Sort - minimum seçme
public static void SelectionSort(int[] arr)
{
    for (int i = 0; i < arr.Length - 1; i++)
    {
        int minIdx = i;
        for (int j = i + 1; j < arr.Length; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]);
    }
}

// Insertion Sort - neredeyse sıralı dizilerde O(n)
public static void InsertionSort(int[] arr)
{
    for (int i = 1; i < arr.Length; i++)
    {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
  }
};

export default function Sorting() {
  const [activeAlgo, setActiveAlgo] = useState('merge');

  const current = sortingAlgos[activeAlgo];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Algoritmalar › Sıralama</div>
          <h1>📊 Sıralama Algoritmaları</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Bubble Sort'tan Merge Sort'a, Quick Sort'tan Heap Sort'a.
            Her algoritmanın ne zaman, neden kullanıldığını öğren.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~4 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Karşılaştırma Tablosu */}
        <h2 style={{ marginBottom: 20 }}>📊 Algoritma Karşılaştırması</h2>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table>
            <thead>
              <tr><th>Algoritma</th><th>En İyi</th><th>Ortalama</th><th>En Kötü</th><th>Alan</th><th>Stable</th><th>Ne Zaman?</th></tr>
            </thead>
            <tbody>
              {[
                ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', '✅', 'Asla production\'da'],
                ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', '❌', 'Swap sayısı önemliyse'],
                ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', '✅', 'Küçük/neredeyse sıralı'],
                ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', '✅', 'Bağlı liste, dış sıralama'],
                ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', '❌', 'Genel amaç (en yaygın)'],
                ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', '❌', 'Alan kritik, garantili'],
                ['Counting Sort', 'O(n+k)', 'O(n+k)', 'O(n+k)', 'O(k)', '✅', 'Küçük aralık tamsayılar'],
                ['Radix Sort', 'O(nk)', 'O(nk)', 'O(nk)', 'O(n+k)', '✅', 'Sabit uzunluk sayılar/string'],
              ].map(r => (
                <tr key={r[0]}>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{r[0]}</td>
                  <td className="complexity-ologn">{r[1]}</td>
                  <td className="complexity-onlogn">{r[2]}</td>
                  <td className="complexity-on">{r[3]}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r[4]}</td>
                  <td style={{ color: r[5] === '✅' ? 'var(--green)' : 'var(--red)' }}>{r[5]}</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{r[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-box info" style={{ marginBottom: 40 }}>
          <div className="info-title">💡 C# Array.Sort() Nasıl Çalışır?</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            .NET'in <code>Array.Sort()</code> metodu <strong>Introsort</strong> kullanır:
            Quick Sort + Heap Sort + Insertion Sort birleşimi. n&lt;16 için Insertion Sort,
            derinlik aşılırsa Heap Sort, geri kalanı Quick Sort. Her durumda O(n log n) garantisi.
          </p>
        </div>

        {/* Algoritma Seçici */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          {Object.entries(sortingAlgos).map(([key, algo]) => (
            <button key={key} onClick={() => setActiveAlgo(key)}
              className={`btn ${activeAlgo === key ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.85rem' }}>
              {algo.title}
            </button>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <h3 style={{ color: 'var(--primary)' }}>{current.title}</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge-medium">⏱ {current.complexity}</span>
              <span className="badge badge-basic">💾 {current.space}</span>
              <span className={`badge ${current.stable ? 'badge-easy' : 'badge-hard'}`}>
                {current.stable ? '✅ Stable' : '❌ Unstable'}
              </span>
            </div>
          </div>
          <div className="info-box tip" style={{ marginBottom: 16 }}>
            <div className="info-title">🎯 Ne Zaman Kullan?</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{current.best}</p>
          </div>
          <CodeBlock code={current.code} language="csharp" filename={`${current.title}.cs`} />
        </div>

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        {/* Custom Sort */}
        <h2 style={{ marginBottom: 20 }}>🔧 C# Özel Sıralama</h2>
        <CodeBlock filename="OzelSiralama.cs" code={`// Lambda ile sıralama
int[] nums = {5, 2, 8, 1, 9};
Array.Sort(nums);                    // Artan
Array.Sort(nums, (a, b) => b - a);  // Azalan

// Nesne sıralama
var kisiler = new List<(string Ad, int Yas)>
{
    ("Ali", 25), ("Veli", 20), ("Ayşe", 30)
};

// Yaşa göre sırala
kisiler.Sort((a, b) => a.Yas.CompareTo(b.Yas));

// LINQ ile
var sirali = kisiler.OrderBy(k => k.Yas)
                    .ThenBy(k => k.Ad)
                    .ToList();

// IComparer implementasyonu
public class YasComparer : IComparer<(string Ad, int Yas)>
{
    public int Compare((string Ad, int Yas) x, (string Ad, int Yas) y)
        => x.Yas.CompareTo(y.Yas);
}

// Counting Sort - O(n+k) - tamsayılar için
public static int[] CountingSort(int[] arr, int maxVal)
{
    int[] count = new int[maxVal + 1];
    foreach (int n in arr) count[n]++;

    var result = new List<int>();
    for (int i = 0; i <= maxVal; i++)
        for (int j = 0; j < count[i]; j++)
            result.Add(i);

    return result.ToArray();
}`} />

        <div className="card" style={{ marginTop: 32, borderColor: 'rgba(108,99,255,0.3)' }}>
          <h2 style={{ marginBottom: 16 }}>🎓 Sıralama Tavsiyeleri</h2>
          <div className="grid-2" style={{ gap: 16 }}>
            {[
              { t: 'Production\'da Array.Sort() Kullan', d: '.NET\'in Introsort\'u her zaman en iyi seçim. Kendi yazma.' },
              { t: 'Stable Sort Gerekiyorsa', d: 'OrderBy() (LINQ) stable\'dır. Array.Sort() değil!' },
              { t: 'Karmaşıklığı Ezberle', d: 'Mülakatta en sık sorulan: "Bu algoritmayı n log n\'den hızlı yapabilir misin?"' },
              { t: 'Comparison Sorting Alt Sınırı', d: 'Karşılaştırma tabanlı sort O(n log n)\'den hızlı olamaz. (Counting/Radix hariç)' },
            ].map(item => (
              <div key={item.t} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--primary)' }}>→</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.92rem' }}>{item.t}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 16 }}>
          <a href="/veri-yapilari/hash-tablosu" className="btn btn-outline">← Hash Tablosu</a>
          <a href="/algoritmalar/arama" className="btn btn-primary">Sonraki: Arama →</a>
        </div>
      </div>
    </div>
  );
}
