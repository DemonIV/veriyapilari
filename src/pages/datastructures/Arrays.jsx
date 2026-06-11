import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

const problems = [
  {
    id: 1, difficulty: 'easy', title: 'İki Sayının Toplamı',
    desc: 'Bir dizide hedef toplamı veren iki sayının indekslerini bulun.',
    code: `// LeetCode 1 - Two Sum
public int[] TwoSum(int[] nums, int target)
{
    var map = new Dictionary<int, int>(); // değer -> index

    for (int i = 0; i < nums.Length; i++)
    {
        int complement = target - nums[i];
        if (map.ContainsKey(complement))
            return new[] { map[complement], i };
        map[nums[i]] = i;
    }
    return Array.Empty<int>();
}
// Test: nums=[2,7,11,15], target=9 → [0,1]`
  },
  {
    id: 2, difficulty: 'easy', title: 'Dizi Maksimumu',
    desc: 'Bir dizinin maksimum ve minimum elemanını bulun.',
    code: `public (int min, int max) MinMax(int[] arr)
{
    if (arr.Length == 0)
        throw new ArgumentException("Dizi boş olamaz");

    int min = arr[0], max = arr[0];
    foreach (int num in arr)
    {
        if (num < min) min = num;
        if (num > max) max = num;
    }
    return (min, max);
}
// C# built-in:
// int max = arr.Max();  // LINQ - O(n)
// int min = arr.Min();`
  },
  {
    id: 3, difficulty: 'medium', title: 'Diziyi Döndür (Rotate)',
    desc: 'Bir diziyi k adım sağa döndürün. O(1) alan ile çözün.',
    code: `// O(n) zaman, O(1) alan - Ters çevirme yöntemi
public void Rotate(int[] nums, int k)
{
    k = k % nums.Length; // k >= nums.Length durumu için
    if (k == 0) return;

    Reverse(nums, 0, nums.Length - 1);
    Reverse(nums, 0, k - 1);
    Reverse(nums, k, nums.Length - 1);
}

private void Reverse(int[] nums, int left, int right)
{
    while (left < right)
    {
        (nums[left], nums[right]) = (nums[right], nums[left]);
        left++; right--;
    }
}
// [1,2,3,4,5,6,7], k=3 → [5,6,7,1,2,3,4]`
  },
  {
    id: 4, difficulty: 'medium', title: 'Kadane Algoritması (Max Subarray)',
    desc: 'Bir dizinin maksimum toplama sahip alt dizisini ve toplamını bulun.',
    code: `public int MaxSubArray(int[] nums)
{
    int maxSum = nums[0];
    int currSum = nums[0];

    for (int i = 1; i < nums.Length; i++)
    {
        // Ya mevcut elemanı ekle, ya da yeniden başla
        currSum = Math.Max(nums[i], currSum + nums[i]);
        maxSum = Math.Max(maxSum, currSum);
    }
    return maxSum;
}

// Hangi alt dizi? - Başlangıç ve bitiş indexlerini izle
public (int sum, int start, int end) MaxSubArrayWithIndex(int[] nums)
{
    int maxSum = nums[0], currSum = nums[0];
    int start = 0, end = 0, tempStart = 0;

    for (int i = 1; i < nums.Length; i++)
    {
        if (currSum + nums[i] < nums[i]) { currSum = nums[i]; tempStart = i; }
        else currSum += nums[i];

        if (currSum > maxSum) { maxSum = currSum; start = tempStart; end = i; }
    }
    return (maxSum, start, end);
}
// [-2,1,-3,4,-1,2,1,-5,4] → 6 (alt dizi: [4,-1,2,1])`
  },
  {
    id: 5, difficulty: 'hard', title: 'En Uzun Artan Alt Dizi (LIS)',
    desc: 'O(n log n) ile en uzun artan alt dizinin uzunluğunu bulun.',
    code: `// O(n log n) Binary Search ile LIS
public int LengthOfLIS(int[] nums)
{
    var tails = new List<int>(); // tails[i] = uzunluğu i+1 olan LIS'in minimum sonu

    foreach (int num in nums)
    {
        int lo = 0, hi = tails.Count;
        while (lo < hi) // Binary search
        {
            int mid = (lo + hi) / 2;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        if (lo == tails.Count) tails.Add(num);
        else tails[lo] = num;
    }
    return tails.Count;
}
// [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101] veya [2,5,7,101])`
  },
];

export default function Arrays() {
  const [openProblem, setOpenProblem] = useState(null);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Ana Sayfa</a> › <a href="/#topics">Veri Yapıları</a> › Diziler
          </div>
          <h1>📦 Diziler (Arrays)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.7 }}>
            Programlamadaki en temel veri yapısı. C# ile dizileri derinlemesine öğrenin,
            bellek yapısını anlayın ve klasik dizi problemlerini çözün.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <span className="badge badge-easy">Başlangıç Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Temel Kavramlar */}
        <div className="grid-2" style={{ marginBottom: 40, gap: 24 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>🧠 Dizi Nedir?</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              Dizi, aynı türden elemanları ardışık bellek konumlarında saklayan bir veri yapısıdır.
              Her eleman bir <strong style={{ color: 'var(--primary)' }}>indeks</strong> ile erişilir.
              C#'ta diziler <code>System.Array</code> sınıfından türer.
            </p>
            <div className="info-box tip">
              <div className="info-title">💡 Anahtar Özellik</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Random access O(1) — indeks biliyorsan anında erişirsin.
                Bu dizileri cache-friendly ve hızlı yapan temel özelliktir.
              </p>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 12, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Bellek Gösterimi
            </h3>
            <div style={{
              background: 'var(--code-bg)', border: '1px solid var(--border)',
              borderRadius: 10, padding: 20, fontFamily: 'Fira Code, monospace', fontSize: '0.85rem'
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>int[] arr = {"{"}10, 20, 30, 40, 50{"}"}</div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[10, 20, 30, 40, 50].map((val, i) => (
                  <div key={i} style={{
                    border: '1px solid var(--primary)', borderRadius: 4,
                    padding: '8px 12px', textAlign: 'center', flex: 1
                  }}>
                    <div style={{ color: 'var(--text)', fontWeight: 600 }}>{val}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: 4 }}>[{i}]</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                {['0x100', '0x104', '0x108', '0x10C', '0x110'].map((addr, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.65rem' }}>
                    {addr}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Karmaşıklık Tablosu */}
        <h2 style={{ marginBottom: 16 }}>⏱ Zaman Karmaşıklığı</h2>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table>
            <thead>
              <tr><th>İşlem</th><th>Ortalama</th><th>En Kötü</th><th>Açıklama</th></tr>
            </thead>
            <tbody>
              {[
                ['Erişim (arr[i])', 'O(1)', 'O(1)', 'Direkt bellek adresi hesabı', 'o1'],
                ['Arama (sırasız)', 'O(n)', 'O(n)', 'Her elemanı kontrol et', 'on'],
                ['Arama (sıralı, binary)', 'O(log n)', 'O(log n)', 'İkiye bölerek ara', 'ologn'],
                ['Ekleme (sona)', 'O(1)*', 'O(n)', 'Sabit genişlemeli listeler', 'o1'],
                ['Ekleme (ortaya)', 'O(n)', 'O(n)', 'Elemanları kaydır', 'on'],
                ['Silme (ortadan)', 'O(n)', 'O(n)', 'Elemanları kaydır', 'on'],
              ].map(([op, avg, worst, note, cls]) => (
                <tr key={op}>
                  <td style={{ color: 'var(--text)' }}>{op}</td>
                  <td className={`complexity-${cls}`}>{avg}</td>
                  <td className={`complexity-${cls}`}>{worst}</td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kod Örnekleri */}
        <h2 style={{ marginBottom: 24 }}>💻 C# Kod Örnekleri</h2>

        <h3 style={{ marginBottom: 12, color: 'var(--primary)' }}>1. Dizi Tanımlama ve Başlatma</h3>
        <CodeBlock filename="DiziBaşlatma.cs" code={`// Temel dizi tanımlama
int[] sayilar = new int[5];           // 5 elemanlı, sıfırlarla dolu
int[] doldurulmus = {1, 2, 3, 4, 5}; // Başlatmalı tanımlama
int[] dinamik = new int[] {10, 20, 30}; // Açık tip tanımlama

// Çok boyutlu diziler
int[,] matris = new int[3, 3];        // 3x3 matris
int[,] doluMatris = {{1,2,3},{4,5,6},{7,8,9}};

// Jagged array (karışık boyut)
int[][] jagged = new int[3][];
jagged[0] = new int[] {1, 2};
jagged[1] = new int[] {3, 4, 5};
jagged[2] = new int[] {6};

// var ile
var harfler = new char[] {'a', 'b', 'c'};
var kelimeler = new string[] {"merhaba", "dünya"};`} />

        <h3 style={{ marginBottom: 12, color: 'var(--primary)', marginTop: 32 }}>2. Array Sınıfı Metotları</h3>
        <CodeBlock filename="ArrayMetotları.cs" code={`int[] arr = {5, 2, 8, 1, 9, 3};

// Sıralama
Array.Sort(arr);                    // [1, 2, 3, 5, 8, 9]
Array.Sort(arr, (a, b) => b - a);   // Azalan sıra

// Arama
int idx = Array.BinarySearch(arr, 5); // Sadece sıralı dizide!
int idx2 = Array.IndexOf(arr, 8);     // Linear search

// Kopyalama
int[] kopya = new int[arr.Length];
Array.Copy(arr, kopya, arr.Length);
int[] dilim = arr[1..4];              // C# 8+: [2..4] aralığı

// Doldurma ve temizleme
Array.Fill(arr, 0);                   // Hepsini 0 yap
Array.Clear(arr, 2, 3);              // Index 2'den 3 eleman sil (0 yap)

// Ters çevirme
Array.Reverse(arr);

// LINQ ile
int maks = arr.Max();
int min = arr.Min();
double ortalama = arr.Average();
int toplam = arr.Sum();
bool varMi = arr.Contains(5);        // arr.Any(x => x == 5)
int[] filtrelenmis = arr.Where(x => x > 3).ToArray();`} />

        <h3 style={{ marginBottom: 12, color: 'var(--primary)', marginTop: 32 }}>3. İkili Arama (Binary Search) Implementasyonu</h3>
        <CodeBlock filename="BinarySearch.cs" code={`public class BinarySearch
{
    // İteratif - O(log n) zaman, O(1) alan
    public static int Search(int[] arr, int target)
    {
        int left = 0, right = arr.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2; // Overflow önleme!

            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1; // Bulunamadı
    }

    // İlk oluşumu bul (sol sınır)
    public static int SearchFirst(int[] arr, int target)
    {
        int left = 0, right = arr.Length - 1, result = -1;
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) { result = mid; right = mid - 1; }
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return result;
    }
}

// Test
int[] sirali = {1, 3, 5, 7, 9, 11, 13};
Console.WriteLine(BinarySearch.Search(sirali, 7)); // 3`} />

        <AdBanner size="rectangle" style={{ margin: '40px 0' }} />

        {/* Pratik Sorular */}
        <h2 style={{ marginBottom: 24 }}>🏋️ Pratik Sorular</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          Her soruyu önce kendin çözmeye çalış. Çözüme bakmadan önce en az 20 dakika düşün!
        </p>

        {problems.map(p => (
          <div key={p.id} className="accordion" style={{ marginBottom: 12 }}>
            <div
              className="accordion-header"
              onClick={() => setOpenProblem(openProblem === p.id ? null : p.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 700, minWidth: 24 }}>#{p.id}</span>
                <span style={{ fontWeight: 600 }}>{p.title}</span>
                <span className={`badge badge-${p.difficulty}`}>
                  {p.difficulty === 'easy' ? 'Kolay' : p.difficulty === 'medium' ? 'Orta' : 'Zor'}
                </span>
              </div>
              <span style={{ color: 'var(--primary)' }}>{openProblem === p.id ? '▲' : '▼'}</span>
            </div>
            {openProblem === p.id && (
              <div className="accordion-body">
                <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.95rem' }}>{p.desc}</p>
                <CodeBlock code={p.code} language="csharp" filename={`Soru${p.id}.cs`} />
              </div>
            )}
          </div>
        ))}

        <AdBanner size="banner" style={{ margin: '40px 0' }} />

        {/* Öğrenme Tavsiyeleri */}
        <div className="card" style={{ borderColor: 'rgba(0, 212, 170, 0.3)', marginTop: 8 }}>
          <h2 style={{ marginBottom: 20 }}>🎓 Bu Konuyu Öğrenmek İçin Tavsiyeler</h2>
          <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
            {[
              { title: '1. Temel Operasyonları Ezberle', desc: 'Sort, Search, Copy, Fill metodlarını ve karmaşıklıklarını bilmeden ilerleme.', color: 'var(--green)' },
              { title: '2. Off-by-one Hatalarına Dikkat', desc: '0-indexed yapı, boundary conditions. arr[arr.Length-1] son eleman.', color: 'var(--blue)' },
              { title: '3. Two Pointer Tekniğini Öğren', desc: 'Birçok dizi problemi two-pointer ile O(n²)\'den O(n)\'e düşer.', color: 'var(--primary)' },
              { title: '4. Sliding Window Öğren', desc: 'Alt dizi problemleri için güçlü bir teknik. Kesinlikle öğren.', color: 'var(--orange)' },
            ].map(tip => (
              <div key={tip.title} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 4, borderRadius: 2, background: tip.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.92rem' }}>{tip.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{tip.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="info-box warning">
            <div className="info-title">⚠️ Mülakat İpucu</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              FAANG mülakatlarında en sık sorulan dizi konuları: Two Sum, Sliding Window Maximum,
              Trapping Rain Water, Product of Array Except Self. Bu soruları mutlaka çöz!
            </p>
          </div>
        </div>

        {/* Sonraki Adım */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            ← <a href="/">Ana Sayfaya Dön</a>
          </div>
          <a href="/veri-yapilari/bagli-liste" className="btn btn-primary">
            Sonraki: Bağlı Listeler →
          </a>
        </div>
      </div>
    </div>
  );
}
