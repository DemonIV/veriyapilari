import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';
import BinarySearchVisualizer from '../../components/BinarySearchVisualizer';
import { Link } from 'react-router-dom';

export default function Searching() {
  const [open, setOpen] = useState(null);

  const problems = [
    {
      id: 1, difficulty: 'easy', title: 'Rotated Array\'da Arama',
      code: `// [4,5,6,7,0,1,2] gibi döndürülmüş sıralı dizide ara
public int Search(int[] nums, int target)
{
    int left = 0, right = nums.Length - 1;
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        // Sol yarı sıralı mı?
        if (nums[left] <= nums[mid])
        {
            if (nums[left] <= target && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        else // Sağ yarı sıralı
        {
            if (nums[mid] < target && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}`
    },
    {
      id: 2, difficulty: 'medium', title: 'Karekök Bulma (Binary Search)',
      code: `public int MySqrt(int x)
{
    if (x < 2) return x;
    long left = 1, right = x / 2;
    while (left <= right)
    {
        long mid = left + (right - left) / 2;
        if (mid * mid == x) return (int)mid;
        if (mid * mid < x) left = mid + 1;
        else right = mid - 1;
    }
    return (int)right; // Tam olmayan kısmı at
}
// 8 → 2, 4 → 2, 9 → 3`
    },
    {
      id: 3, difficulty: 'hard', title: 'Median of Two Sorted Arrays',
      code: `// O(log(min(m,n))) - Binary Search on smaller array
public double FindMedianSortedArrays(int[] nums1, int[] nums2)
{
    if (nums1.Length > nums2.Length)
        return FindMedianSortedArrays(nums2, nums1);

    int m = nums1.Length, n = nums2.Length;
    int left = 0, right = m;

    while (left <= right)
    {
        int i = (left + right) / 2;       // nums1 partition
        int j = (m + n + 1) / 2 - i;     // nums2 partition

        int maxLeft1 = i == 0 ? int.MinValue : nums1[i - 1];
        int minRight1 = i == m ? int.MaxValue : nums1[i];
        int maxLeft2 = j == 0 ? int.MinValue : nums2[j - 1];
        int minRight2 = j == n ? int.MaxValue : nums2[j];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1)
        {
            if ((m + n) % 2 == 1)
                return Math.Max(maxLeft1, maxLeft2);
            return (Math.Max(maxLeft1, maxLeft2) +
                    Math.Min(minRight1, minRight2)) / 2.0;
        }
        else if (maxLeft1 > minRight2) right = i - 1;
        else left = i + 1;
    }
    return 0;
}`
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Algoritmalar › Arama</div>
          <h1>🔍 Arama Algoritmaları</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Linear Search'ten Binary Search'e. Binary Search'i derinlemesine anla —
            sadece sıralı dizide değil, monotonic fonksiyonlarda da kullan.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-easy">Başlangıç - Orta</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <h2 style={{ marginBottom: 8 }}>🎬 Binary Search'ü Adım Adım İzle</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>
          Hedefi seç, "İleri" ile ilerle: <span style={{ color: 'var(--yellow)' }}>sarı</span> kutu mid,
          soluk kutular elenen yarılar. Her adımda arama alanı yarıya iner.
        </p>
        <BinarySearchVisualizer />

        <h2 style={{ marginBottom: 20 }}>🔍 Arama Algoritmaları Karşılaştırması</h2>
        <table style={{ marginBottom: 40 }}>
          <thead><tr><th>Algoritma</th><th>Zaman</th><th>Ön Koşul</th><th>Kullanım</th></tr></thead>
          <tbody>
            {[
              ['Linear Search', 'O(n)', 'Yok', 'Küçük/sırasız diziler'],
              ['Binary Search', 'O(log n)', 'Sıralı dizi', 'Sıralı diziler, %90 arama'],
              ['Jump Search', 'O(√n)', 'Sıralı dizi', 'Büyük diziler, backward pahalıysa'],
              ['Interpolation', 'O(log log n)', 'Sıralı, uniform', 'Uniform dağılımlı sayılar'],
              ['Ternary Search', 'O(log₃n)', 'Unimodal', 'Min/max bulma'],
            ].map(r => (
              <tr key={r[0]}>
                <td style={{ color: 'var(--text)', fontWeight: 600 }}>{r[0]}</td>
                <td className={r[1].includes('log') ? 'complexity-ologn' : 'complexity-on'}>{r[1]}</td>
                <td style={{ color: 'var(--text-muted)' }}>{r[2]}</td>
                <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginBottom: 20 }}>💻 Implementasyonlar</h2>

        <CodeBlock filename="SearchAlgorithms.cs" code={`// 1. Linear Search - O(n)
public static int LinearSearch(int[] arr, int target)
{
    for (int i = 0; i < arr.Length; i++)
        if (arr[i] == target) return i;
    return -1;
}

// 2. Binary Search - O(log n) - İteratif
public static int BinarySearch(int[] arr, int target)
{
    int left = 0, right = arr.Length - 1;
    while (left <= right)
    {
        int mid = left + (right - left) / 2; // Overflow güvenli!
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// 3. Binary Search - Sol sınır (ilk oluşum)
public static int LeftBound(int[] arr, int target)
{
    int left = 0, right = arr.Length;
    while (left < right)
    {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left < arr.Length && arr[left] == target ? left : -1;
}

// 4. Binary Search - Sağ sınır (son oluşum)
public static int RightBound(int[] arr, int target)
{
    int left = 0, right = arr.Length;
    while (left < right)
    {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left > 0 && arr[left - 1] == target ? left - 1 : -1;
}

// 5. "Answer Binary Search" - Cevap üzerinde binary search
// "En az k'dan büyük olan minimum değer nedir?"
public static int SearchOnAnswer(int[] arr, int k)
{
    int left = 0, right = arr.Max();
    while (left < right)
    {
        int mid = (left + right) / 2;
        if (IsValid(arr, mid, k)) right = mid; // Koşulu sağlayan en küçük
        else left = mid + 1;
    }
    return left;
}

// 6. C# built-in
int[] sorted = {1, 3, 5, 7, 9, 11};
int idx = Array.BinarySearch(sorted, 7);  // Sadece sıralıda!
// idx >= 0 ise bulundu, < 0 ise bulunamadı (~idx = insertion point)`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <div className="info-box tip" style={{ marginBottom: 32 }}>
          <div className="info-title">🔑 Binary Search Şablonu</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            <strong>left &lt; right</strong> vs <strong>left &lt;= right</strong> karmaşası için şu kuralı uygula:
            <br/>• Kesin cevap arıyorsan: <code>left &lt;= right</code>, bulamayınca -1 dön.
            <br/>• Sınır (bound) arıyorsan: <code>left &lt; right</code>, cevap <code>left</code>'te.
          </p>
        </div>

        <h2 style={{ marginBottom: 20 }}>🏋️ Pratik Sorular</h2>
        {problems.map(p => (
          <div key={p.id} className="accordion" style={{ marginBottom: 10 }}>
            <div className="accordion-header" onClick={() => setOpen(open === p.id ? null : p.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>#{p.id}</span>
                <span style={{ fontWeight: 600 }}>{p.title}</span>
                <span className={`badge badge-${p.difficulty}`}>{p.difficulty === 'easy' ? 'Kolay' : p.difficulty === 'medium' ? 'Orta' : 'Zor'}</span>
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

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 16 }}>
          <Link to="/algoritmalar/siralama" className="btn btn-outline">← Sıralama</Link>
          <Link to="/algoritmalar/dinamik-programlama" className="btn btn-primary">Sonraki: Dinamik Programlama →</Link>
        </div>
      </div>
    </div>
  );
}
