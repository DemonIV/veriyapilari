import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function DivideConquer() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Algoritmalar › Böl ve Fethet</div>
          <h1>⚔️ Böl ve Fethet (Divide & Conquer)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Problemi küçük parçalara böl, her parçayı çöz, sonuçları birleştir.
            Merge Sort, Quick Sort ve Binary Search'ün arkasındaki ortak desen.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <h2 style={{ marginBottom: 20 }}>📖 Üç Adım</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { t: '1. Böl (Divide)', d: 'Problemi aynı türden 2+ küçük alt probleme ayır. Genelde ortadan ikiye.' },
            { t: '2. Fethet (Conquer)', d: 'Alt problemleri özyinelemeli çöz. Yeterince küçükse (base case) doğrudan çöz.' },
            { t: '3. Birleştir (Combine)', d: 'Alt çözümleri birleştirerek asıl problemin cevabını üret. İşin püf noktası genelde burası.' },
            { t: 'Master Theorem', d: 'T(n) = aT(n/b) + f(n) formundaki karmaşıklıkları hızla çözer. Merge sort: T(n)=2T(n/2)+O(n) → O(n log n).' },
            { t: 'DP ile Farkı', d: 'Alt problemler ÖRTÜŞMÜYORSA böl-fethet; örtüşüyorsa (Fibonacci gibi) DP/memoization gerekir.' },
            { t: 'Recursion Derinliği', d: 'Her bölme log n derinlik üretir. Stack overflow riski düşüktür ama dengesiz bölmede (kötü pivot) O(n) olabilir.' },
          ].map(item => (
            <div key={item.t} className="card">
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--primary)' }}>{item.t}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 20 }}>💻 Hızlı Üs Alma (Fast Power)</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
          x<sup>n</sup> hesaplamak için n çarpma yapmak yerine problemi ikiye böl: O(log n).
        </p>
        <CodeBlock filename="FastPower.cs" code={`public double MyPow(double x, long n)
{
    if (n < 0) { x = 1 / x; n = -n; }
    return Power(x, n);
}

private double Power(double x, long n)
{
    if (n == 0) return 1;                 // Base case
    double half = Power(x, n / 2);        // Böl: n → n/2
    return n % 2 == 0
        ? half * half                     // Birleştir: x^n = (x^(n/2))^2
        : half * half * x;
}

Console.WriteLine(MyPow(2, 10)); // 1024 — 10 değil, sadece ~4 çarpma`} />

        <h2 style={{ margin: '40px 0 20px' }}>💻 Maksimum Alt Dizi (Böl-Fethet Yaklaşımı)</h2>
        <CodeBlock filename="MaxSubarrayDC.cs" code={`// Kadane O(n) ile çözer ama böl-fethet versiyonu deseni öğretir:
// Cevap ya sol yarıda, ya sağ yarıda, ya da ORTAYI KESEN dizidedir.
public int MaxSubArray(int[] nums) => Solve(nums, 0, nums.Length - 1);

private int Solve(int[] nums, int lo, int hi)
{
    if (lo == hi) return nums[lo];
    int mid = lo + (hi - lo) / 2;

    int leftBest = Solve(nums, lo, mid);        // Fethet (sol)
    int rightBest = Solve(nums, mid + 1, hi);   // Fethet (sağ)
    int crossBest = CrossSum(nums, lo, mid, hi); // Birleştir

    return Math.Max(crossBest, Math.Max(leftBest, rightBest));
}

private int CrossSum(int[] nums, int lo, int mid, int hi)
{
    // Ortadan sola ve sağa doğru en iyi uzantıları bul
    int leftSum = int.MinValue, sum = 0;
    for (int i = mid; i >= lo; i--)
        leftSum = Math.Max(leftSum, sum += nums[i]);

    int rightSum = int.MinValue; sum = 0;
    for (int i = mid + 1; i <= hi; i++)
        rightSum = Math.Max(rightSum, sum += nums[i]);

    return leftSum + rightSum;
}`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <h2 style={{ marginBottom: 20 }}>💻 Sıralı Dizide Ters Çift Sayma (Count Inversions)</h2>
        <CodeBlock filename="CountInversions.cs" code={`// i < j iken arr[i] > arr[j] olan çift sayısı.
// Kaba kuvvet O(n²); merge sort'u değiştirerek O(n log n).
public long CountInversions(int[] arr) => Sort(arr, 0, arr.Length - 1);

private long Sort(int[] arr, int lo, int hi)
{
    if (lo >= hi) return 0;
    int mid = lo + (hi - lo) / 2;
    long count = Sort(arr, lo, mid) + Sort(arr, mid + 1, hi);
    return count + Merge(arr, lo, mid, hi);
}

private long Merge(int[] arr, int lo, int mid, int hi)
{
    var temp = new List<int>();
    int i = lo, j = mid + 1;
    long inversions = 0;

    while (i <= mid && j <= hi)
    {
        if (arr[i] <= arr[j]) temp.Add(arr[i++]);
        else
        {
            // arr[i] > arr[j] → sol yarıda i'den sonraki HERKES de büyük
            inversions += mid - i + 1;
            temp.Add(arr[j++]);
        }
    }
    while (i <= mid) temp.Add(arr[i++]);
    while (j <= hi) temp.Add(arr[j++]);
    temp.CopyTo(arr, lo);
    return inversions;
}

Console.WriteLine(CountInversions(new[] { 2, 4, 1, 3, 5 })); // 3`} />

        <div className="info-box tip" style={{ margin: '24px 0' }}>
          <div className="info-title">🎯 Desen Nerelerde Karşına Çıkar?</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Link to="/algoritmalar/siralama">Merge Sort &amp; Quick Sort</Link>,{' '}
            <Link to="/algoritmalar/arama">Binary Search</Link>, Quickselect (k. en küçük eleman),
            Strassen matris çarpımı, en yakın nokta çifti. "Ortadan böl, yarımları çöz, birleştir"
            diyebildiğin her problem adaydır.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/algoritmalar/acgozlu" className="btn btn-outline">← Açgözlü Algoritmalar</Link>
          <Link to="/sorular" className="btn btn-primary">Çözümlü Sorular →</Link>
        </div>
      </div>
    </div>
  );
}
