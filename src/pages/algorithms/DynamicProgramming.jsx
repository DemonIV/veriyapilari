import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

const dpProblems = [
  {
    id: 1,
    title: "Fibonacci Sayısı",
    difficulty: "easy",
    description: "n'inci Fibonacci sayısını dinamik programlama ile hesaplayın.",
    explanation: "Memoization veya tabulation kullanarak üstel zaman karmaşıklığını O(n)'e indirin.",
    code: `// Memoization (Top-Down)
public class FibonacciDP
{
    private Dictionary<int, long> memo = new Dictionary<int, long>();

    public long Fib(int n)
    {
        if (n <= 1) return n;
        if (memo.ContainsKey(n)) return memo[n];

        memo[n] = Fib(n - 1) + Fib(n - 2);
        return memo[n];
    }

    // Tabulation (Bottom-Up) - Daha Verimli
    public long FibTabulation(int n)
    {
        if (n <= 1) return n;

        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++)
            dp[i] = dp[i - 1] + dp[i - 2];

        return dp[n];
    }

    // Space Optimized - O(1) alan
    public long FibOptimized(int n)
    {
        if (n <= 1) return n;
        long prev2 = 0, prev1 = 1;

        for (int i = 2; i <= n; i++)
        {
            long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
  },
  {
    id: 2,
    title: "0/1 Sırt Çantası Problemi",
    difficulty: "medium",
    description: "Kapasite sınırı olan bir sırt çantasına maksimum değeri sığdırın.",
    explanation: "Klasik DP problemi. dp[i][w] = i. eşyaya kadar, w kapasitede maksimum değer",
    code: `public class Knapsack
{
    // 0/1 Knapsack - O(n*W) zaman, O(n*W) alan
    public int Solve(int[] weights, int[] values, int capacity)
    {
        int n = weights.Length;
        int[,] dp = new int[n + 1, capacity + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int w = 0; w <= capacity; w++)
            {
                // i. eşyayı alma
                dp[i, w] = dp[i - 1, w];

                // i. eşyayı al (sığıyorsa)
                if (weights[i - 1] <= w)
                {
                    int withItem = dp[i - 1, w - weights[i - 1]] + values[i - 1];
                    dp[i, w] = Math.Max(dp[i, w], withItem);
                }
            }
        }

        // Seçilen eşyaları geri izle
        int res = dp[n, capacity];
        int remainingCap = capacity;
        Console.Write("Seçilen eşyalar: ");
        for (int i = n; i > 0 && res > 0; i--)
        {
            if (res != dp[i - 1, remainingCap])
            {
                Console.Write($"Eşya {i} (ağırlık: {weights[i-1]}, değer: {values[i-1]}) ");
                res -= values[i - 1];
                remainingCap -= weights[i - 1];
            }
        }
        return dp[n, capacity];
    }

    // Space optimized - O(W) alan
    public int SolveOptimized(int[] weights, int[] values, int capacity)
    {
        int n = weights.Length;
        int[] dp = new int[capacity + 1];

        for (int i = 0; i < n; i++)
            for (int w = capacity; w >= weights[i]; w--)
                dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);

        return dp[capacity];
    }
}

// Kullanım
var ks = new Knapsack();
int[] weights = { 1, 3, 4, 5 };
int[] values  = { 1, 4, 5, 7 };
Console.WriteLine(ks.Solve(weights, values, 7)); // 9`,
  },
  {
    id: 3,
    title: "En Uzun Ortak Alt Dizi (LCS)",
    difficulty: "medium",
    description: "İki string'in en uzun ortak alt dizisini bulun.",
    code: `public class LCS
{
    public int Length(string s1, string s2)
    {
        int m = s1.Length, n = s2.Length;
        int[,] dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (s1[i-1] == s2[j-1])
                    dp[i, j] = dp[i-1, j-1] + 1;
                else
                    dp[i, j] = Math.Max(dp[i-1, j], dp[i, j-1]);
            }
        }

        return dp[m, n];
    }

    // LCS string'i geri izle
    public string GetLCS(string s1, string s2)
    {
        int m = s1.Length, n = s2.Length;
        int[,] dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (s1[i-1] == s2[j-1])
                    dp[i, j] = dp[i-1, j-1] + 1;
                else
                    dp[i, j] = Math.Max(dp[i-1, j], dp[i, j-1]);

        // Geri izle
        var result = new System.Text.StringBuilder();
        int x = m, y = n;
        while (x > 0 && y > 0)
        {
            if (s1[x-1] == s2[y-1])
            {
                result.Insert(0, s1[x-1]);
                x--; y--;
            }
            else if (dp[x-1, y] > dp[x, y-1]) x--;
            else y--;
        }
        return result.ToString();
    }
}

// Test
var lcs = new LCS();
Console.WriteLine(lcs.GetLCS("ABCBDAB", "BDCAB")); // BCAB veya BDAB`,
  },
  {
    id: 4,
    title: "Madeni Para Değişimi (Coin Change)",
    difficulty: "medium",
    description: "Belirli bir miktarı oluşturmak için minimum para sayısını bulun.",
    code: `public class CoinChange
{
    // Minimum para sayısı
    public int MinCoins(int[] coins, int amount)
    {
        int[] dp = new int[amount + 1];
        Array.Fill(dp, amount + 1); // "Sonsuz" ile doldur
        dp[0] = 0;

        for (int i = 1; i <= amount; i++)
        {
            foreach (int coin in coins)
            {
                if (coin <= i)
                    dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }

    // Hangi paraları kullandığını da göster
    public List<int> GetCoins(int[] coins, int amount)
    {
        int[] dp = new int[amount + 1];
        int[] from = new int[amount + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++)
        {
            foreach (int coin in coins)
            {
                if (coin <= i && dp[i - coin] != int.MaxValue && dp[i - coin] + 1 < dp[i])
                {
                    dp[i] = dp[i - coin] + 1;
                    from[i] = coin;
                }
            }
        }

        if (dp[amount] == int.MaxValue) return null;

        var result = new List<int>();
        while (amount > 0)
        {
            result.Add(from[amount]);
            amount -= from[amount];
        }
        return result;
    }
}

var cc = new CoinChange();
Console.WriteLine(cc.MinCoins(new[]{1,5,6,9}, 11)); // 2 (5+6)`,
  },
  {
    id: 5,
    title: "En Uzun Artan Alt Dizi (LIS)",
    difficulty: "hard",
    description: "Bir dizide en uzun artan alt diziyi bulun.",
    code: `public class LIS
{
    // O(n²) DP çözüm
    public int LengthDP(int[] nums)
    {
        int n = nums.Length;
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = 1; i < n; i++)
            for (int j = 0; j < i; j++)
                if (nums[j] < nums[i])
                    dp[i] = Math.Max(dp[i], dp[j] + 1);

        return dp.Max();
    }

    // O(n log n) Binary Search çözüm
    public int LengthBinarySearch(int[] nums)
    {
        var tails = new List<int>();

        foreach (int num in nums)
        {
            int lo = 0, hi = tails.Count;
            while (lo < hi)
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
}

var lis = new LIS();
int[] arr = {10, 9, 2, 5, 3, 7, 101, 18};
Console.WriteLine(lis.LengthDP(arr));           // 4
Console.WriteLine(lis.LengthBinarySearch(arr)); // 4`,
  },
];

export default function DynamicProgramming() {
  const [openProblem, setOpenProblem] = useState(null);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Ana Sayfa</a> › <a href="/konular">Algoritmalar</a> › Dinamik Programlama
          </div>
          <h1>⚡ Dinamik Programlama</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '1.1rem', maxWidth: 700 }}>
            Büyük problemleri alt problemlere bölerek çözen, güçlü bir optimizasyon tekniği.
            Memoization ve Tabulation yaklaşımlarını C# ile öğrenin.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <span className="badge badge-hard">Zor Teknik</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>
              ⏱ ~6 saat okuma
            </span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Giriş */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>🧠 DP Nedir?</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Dinamik Programlama, örtüşen alt problemler içeren ve optimal alt yapı özelliği gösteren
            problemleri verimli çözmek için kullanılan bir yöntemdir. DP'nin özü, aynı alt problemi
            defalarca çözmek yerine sonuçları saklayıp yeniden kullanmaktır.
          </p>

          <div className="grid-2" style={{ marginTop: 24, gap: 16 }}>
            <div className="info-box tip">
              <div className="info-title">🔑 Memoization (Top-Down)</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Özyinelemeli çözümde, hesaplanan sonuçları bir sözlükte sakla.
                Aynı alt problem tekrar gelince direkt döndür.
              </p>
            </div>
            <div className="info-box info">
              <div className="info-title">📊 Tabulation (Bottom-Up)</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                En küçük alt problemden başlayarak yukarı doğru ilerle.
                Genellikle daha verimli - stack overflow riski yok.
              </p>
            </div>
          </div>
        </div>

        {/* DP Özellikleri */}
        <h2 style={{ marginBottom: 20 }}>🎯 DP Uygulanabilirlik Koşulları</h2>
        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div className="card">
            <h3 style={{ color: 'var(--primary)', marginBottom: 12 }}>1. Örtüşen Alt Problemler</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Aynı alt problem birden fazla kez çözülüyor. Örn: Fibonacci'de fib(3) hem fib(5)'te
              hem fib(4)'te hesaplanır.
            </p>
          </div>
          <div className="card">
            <h3 style={{ color: 'var(--secondary)', marginBottom: 12 }}>2. Optimal Alt Yapı</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Ana problemin optimal çözümü, alt problemlerin optimal çözümlerinden oluşur.
              Örn: En kısa yol problemi bu özelliği taşır.
            </p>
          </div>
        </div>

        <AdBanner size="rectangle" style={{ marginBottom: 40 }} />

        {/* Problemler */}
        <h2 style={{ marginBottom: 24 }}>📚 Klasik DP Problemleri ve Çözümleri</h2>

        {dpProblems.map((problem) => (
          <div key={problem.id} className="accordion" style={{ marginBottom: 16 }}>
            <div
              className="accordion-header"
              onClick={() => setOpenProblem(openProblem === problem.id ? null : problem.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{problem.id}</span>
                <span style={{ fontWeight: 600 }}>{problem.title}</span>
                <span className={`badge badge-${problem.difficulty}`}>
                  {problem.difficulty === 'easy' ? 'Kolay' : problem.difficulty === 'medium' ? 'Orta' : 'Zor'}
                </span>
              </div>
              <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>
                {openProblem === problem.id ? '▲' : '▼'}
              </span>
            </div>
            {openProblem === problem.id && (
              <div className="accordion-body">
                <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{problem.description}</p>
                {problem.explanation && (
                  <div className="info-box tip" style={{ marginBottom: 16 }}>
                    <div className="info-title">💡 Yaklaşım</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{problem.explanation}</p>
                  </div>
                )}
                <CodeBlock code={problem.code} language="csharp" filename={`${problem.title}.cs`} />
              </div>
            )}
          </div>
        ))}

        <AdBanner size="banner" style={{ marginTop: 40 }} />

        {/* Öğrenme Tavsiyeleri */}
        <div className="card" style={{ marginTop: 40, borderColor: 'rgba(108, 99, 255, 0.4)' }}>
          <h2 style={{ marginBottom: 20 }}>🎓 DP Öğrenmek İçin Tavsiyeler</h2>
          <div className="grid-2" style={{ gap: 20 }}>
            {[
              { step: '1', title: 'Önce Özyinelemeyi Kavra', desc: 'DP olmadan özyinelemeli çözümü yaz. Sonra optimize et.', color: 'var(--primary)' },
              { step: '2', title: 'State Tanımla', desc: 'dp[i] ne anlama geliyor? Açık bir tanımla başla.', color: 'var(--secondary)' },
              { step: '3', title: 'Geçiş Fonksiyonu Bul', desc: 'dp[i] nasıl hesaplanır? dp[i-1], dp[i-2]...', color: 'var(--yellow)' },
              { step: '4', title: 'Base Case Belirle', desc: 'dp[0], dp[1] değerleri ne? Bunları manuel hesapla.', color: 'var(--orange)' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: `${item.color}22`,
                  border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 700, color: item.color, flexShrink: 0
                }}>{item.step}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="info-box warning" style={{ marginTop: 24 }}>
            <div className="info-title">⚠️ En Önemli Tavsiye</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              LeetCode'da en az 50 DP problemi çöz. Önce çözmeden çözüme bakma!
              Tipik DP kategorileri: 1D DP, 2D DP, Interval DP, Tree DP, Bitmask DP.
            </p>
          </div>
        </div>

        {/* Zaman Karmaşıklığı Tablosu */}
        <h2 style={{ marginTop: 48, marginBottom: 20 }}>📊 Klasik DP Problemleri Karmaşıklık Tablosu</h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Zaman</th>
                <th>Alan</th>
                <th>Optimized Alan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Fibonacci', 'O(n)', 'O(n)', 'O(1)'],
                ['0/1 Knapsack', 'O(n·W)', 'O(n·W)', 'O(W)'],
                ['LCS', 'O(m·n)', 'O(m·n)', 'O(min(m,n))'],
                ['Coin Change', 'O(n·amount)', 'O(amount)', 'O(amount)'],
                ['LIS (DP)', 'O(n²)', 'O(n)', 'O(n)'],
                ['LIS (Binary Search)', 'O(n log n)', 'O(n)', 'O(n)'],
                ['Matrix Chain', 'O(n³)', 'O(n²)', 'O(n²)'],
                ['Edit Distance', 'O(m·n)', 'O(m·n)', 'O(min(m,n))'],
              ].map(([p, t, s, os]) => (
                <tr key={p}>
                  <td style={{ color: 'var(--text)' }}>{p}</td>
                  <td className="complexity-on">{t}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{s}</td>
                  <td style={{ color: 'var(--secondary)' }}>{os}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
