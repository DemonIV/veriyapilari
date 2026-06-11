import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import useStoredSet, { SOLVED_PROBLEMS_KEY } from '../hooks/useStoredSet';

const allProblems = [
  {
    id: 1, title: 'İki Sayı Toplamı', difficulty: 'easy', topic: 'Dizi',
    desc: 'Hedef toplamı veren iki sayının indekslerini bulun. Her giriş için tam olarak bir çözüm vardır.',
    code: `public int[] TwoSum(int[] nums, int target)
{
    var map = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++)
    {
        int comp = target - nums[i];
        if (map.ContainsKey(comp)) return new[] { map[comp], i };
        map[nums[i]] = i;
    }
    return Array.Empty<int>();
} // O(n) zaman, O(n) alan`,
    hint: 'Hash Map kullan. Her eleman için tamamlayıcıyı ara.'
  },
  {
    id: 2, title: 'Parantez Geçerliliği', difficulty: 'easy', topic: 'Stack',
    desc: '"()", "()[]{}", "{[]}" geçerli; "(]", "([)]" geçersiz.',
    code: `public bool IsValid(string s)
{
    var stack = new Stack<char>();
    foreach (char c in s)
    {
        if ("([{".Contains(c)) { stack.Push(c); continue; }
        if (stack.Count == 0) return false;
        char top = stack.Pop();
        if (c == ')' && top != '(') return false;
        if (c == ']' && top != '[') return false;
        if (c == '}' && top != '{') return false;
    }
    return stack.Count == 0;
}`,
    hint: 'Stack kullan. Açan parantez push, kapatan parantez pop-check.'
  },
  {
    id: 3, title: 'Bağlı Listeyi Ters Çevir', difficulty: 'easy', topic: 'Bağlı Liste',
    desc: '1→2→3→4→5 dizisini 5→4→3→2→1 haline getirin.',
    code: `public ListNode ReverseList(ListNode head)
{
    ListNode prev = null, curr = head;
    while (curr != null)
    {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    hint: 'İki pointer: prev ve curr. Her adımda bağlantıyı ters çevir.'
  },
  {
    id: 4, title: 'İkili Ağaç Derinliği', difficulty: 'easy', topic: 'Ağaç',
    desc: 'Bir ikili ağacın maksimum derinliğini bulun.',
    code: `public int MaxDepth(TreeNode root)
    => root == null ? 0 : 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));`,
    hint: 'Recursion. Her düğüm için max(sol derinlik, sağ derinlik) + 1.'
  },
  {
    id: 5, title: 'Max Alt Dizi Toplamı (Kadane)', difficulty: 'medium', topic: 'Dizi',
    desc: '[-2,1,-3,4,-1,2,1,-5,4] → 6 ([4,-1,2,1])',
    code: `public int MaxSubArray(int[] nums)
{
    int maxSum = nums[0], curr = nums[0];
    for (int i = 1; i < nums.Length; i++)
    {
        curr = Math.Max(nums[i], curr + nums[i]);
        maxSum = Math.Max(maxSum, curr);
    }
    return maxSum;
}`,
    hint: 'Kadane: currSum = max(nums[i], currSum + nums[i])'
  },
  {
    id: 6, title: 'Anagram Grupları', difficulty: 'medium', topic: 'Hash Tablosu',
    desc: '["eat","tea","tan","ate","nat","bat"] → [["eat","tea","ate"],["tan","nat"],["bat"]]',
    code: `public IList<IList<string>> GroupAnagrams(string[] strs)
{
    var map = new Dictionary<string, List<string>>();
    foreach (string s in strs)
    {
        char[] key = s.ToCharArray();
        Array.Sort(key);
        string sortedKey = new string(key);
        if (!map.ContainsKey(sortedKey)) map[sortedKey] = new();
        map[sortedKey].Add(s);
    }
    return new List<IList<string>>(map.Values);
}`,
    hint: 'Her string\'i sırala → aynı anagramlar aynı key\'e düşer.'
  },
  {
    id: 7, title: 'Coin Change (Para Bozma)', difficulty: 'medium', topic: 'DP',
    desc: 'coins=[1,5,6,9], amount=11 → minimum 2 para (5+6)',
    code: `public int CoinChange(int[] coins, int amount)
{
    int[] dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        foreach (int coin in coins)
            if (coin <= i)
                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    hint: 'Bottom-up DP. dp[i] = i miktarı için minimum para sayısı.'
  },
  {
    id: 8, title: 'BFS ile En Kısa Yol', difficulty: 'medium', topic: 'Graf',
    desc: 'Ağırlıksız bir grafta iki düğüm arasındaki en kısa yolu bulun.',
    code: `public int ShortestPath(Dictionary<int, List<int>> adj, int src, int dest)
{
    var dist = new Dictionary<int, int> { [src] = 0 };
    var queue = new Queue<int>();
    queue.Enqueue(src);

    while (queue.Count > 0)
    {
        int node = queue.Dequeue();
        if (node == dest) return dist[node];

        foreach (int nb in adj.GetValueOrDefault(node, new()))
            if (!dist.ContainsKey(nb))
            {
                dist[nb] = dist[node] + 1;
                queue.Enqueue(nb);
            }
    }
    return -1; // Erişilemiyor
}`,
    hint: 'BFS her zaman ağırlıksız grafta en kısa yolu bulur.'
  },
  {
    id: 9, title: 'Kayan Pencere Maksimum (Sliding Window)', difficulty: 'hard', topic: 'Kuyruk',
    desc: '[1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]',
    code: `public int[] MaxSlidingWindow(int[] nums, int k)
{
    var result = new List<int>();
    var deque = new LinkedList<int>(); // monotonic decreasing

    for (int i = 0; i < nums.Length; i++)
    {
        if (deque.Count > 0 && deque.First.Value <= i - k)
            deque.RemoveFirst();

        while (deque.Count > 0 && nums[deque.Last.Value] < nums[i])
            deque.RemoveLast();

        deque.AddLast(i);
        if (i >= k - 1) result.Add(nums[deque.First.Value]);
    }
    return result.ToArray();
}`,
    hint: 'Monotonic deque (azalan) kullan. O(n) ile çözülebilir.'
  },
  {
    id: 10, title: 'Trapping Rain Water', difficulty: 'hard', topic: 'Dizi',
    desc: '[0,1,0,2,1,0,1,3,2,1,2,1] → 6 birim su tutulur',
    code: `// Two Pointer - O(n) zaman, O(1) alan
public int Trap(int[] height)
{
    int left = 0, right = height.Length - 1;
    int leftMax = 0, rightMax = 0, water = 0;

    while (left < right)
    {
        if (height[left] < height[right])
        {
            leftMax = Math.Max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        }
        else
        {
            rightMax = Math.Max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
    hint: 'Two pointer. Her konumda tutulacak su = min(leftMax, rightMax) - height[i].'
  },
  {
    id: 11, title: 'LCS (En Uzun Ortak Alt Dizi)', difficulty: 'hard', topic: 'DP',
    desc: '"ABCBDAB" ve "BDCAB" için LCS uzunluğu 4\'tür.',
    code: `public int LCS(string s1, string s2)
{
    int m = s1.Length, n = s2.Length;
    int[,] dp = new int[m + 1, n + 1];

    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i, j] = s1[i-1] == s2[j-1]
                ? dp[i-1, j-1] + 1
                : Math.Max(dp[i-1, j], dp[i, j-1]);

    return dp[m, n];
}`,
    hint: 'dp[i][j] = s1[0..i] ve s2[0..j]\'nin LCS uzunluğu.'
  },
  {
    id: 12, title: 'Döngü Tespiti (Floyd)', difficulty: 'medium', topic: 'Bağlı Liste',
    desc: 'Bağlı listede döngü (cycle) var mı? Varsa başlangıcını bul.',
    code: `public ListNode DetectCycle(ListNode head)
{
    var slow = head; var fast = head;
    while (fast?.next != null)
    {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if (fast?.next == null) return null; // Döngü yok

    slow = head;
    while (slow != fast) { slow = slow.next; fast = fast.next; }
    return slow; // Döngü başlangıcı
}`,
    hint: 'Floyd\'un tortoise-hare algoritması. Buluşma noktasından başa dön.'
  },
];

const difficultyMap = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };
const topics = ['Tümü', 'Dizi', 'Stack', 'Bağlı Liste', 'Ağaç', 'Hash Tablosu', 'DP', 'Graf', 'Kuyruk'];

export default function Problems() {
  const [open, setOpen] = useState(null);
  const [filterDiff, setFilterDiff] = useState('Tümü');
  const [filterTopic, setFilterTopic] = useState('Tümü');
  const [solved, toggleSolved] = useStoredSet(SOLVED_PROBLEMS_KEY);

  const filtered = allProblems.filter(p => {
    const diffOk = filterDiff === 'Tümü' || difficultyMap[p.difficulty] === filterDiff;
    const topicOk = filterTopic === 'Tümü' || p.topic === filterTopic;
    return diffOk && topicOk;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Sorular</div>
          <h1>💡 Alıştırma Soruları</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Kolay'dan Zor'a kadar C# ile çözümlü sorular. Her soruyu önce kendin çöz,
            sonra çözümü incele. Mülakat hazırlığı için kritik.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <AdBanner size="banner" style={{ marginBottom: 32 }} />

        {/* İstatistikler */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'Toplam', count: allProblems.length, color: 'var(--primary)' },
            { label: 'Kolay', count: allProblems.filter(p => p.difficulty === 'easy').length, color: 'var(--green)' },
            { label: 'Orta', count: allProblems.filter(p => p.difficulty === 'medium').length, color: 'var(--yellow)' },
            { label: 'Zor', count: allProblems.filter(p => p.difficulty === 'hard').length, color: 'var(--red)' },
            { label: 'Çözüldü', count: solved.size, color: 'var(--secondary)' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: `1px solid ${s.color}44`,
              borderRadius: 10, padding: '12px 20px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtreler */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>Zorluk</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Tümü', 'Kolay', 'Orta', 'Zor'].map(d => (
                <button key={d} onClick={() => setFilterDiff(d)}
                  className={`btn ${filterDiff === d ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '6px 14px' }}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>Konu</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {topics.map(t => (
                <button key={t} onClick={() => setFilterTopic(t)}
                  className={`btn ${filterTopic === t ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem', padding: '5px 12px' }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Listesi */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((p, idx) => (
            <div key={p.id}>
              <div className="accordion">
                <div className="accordion-header" onClick={() => setOpen(open === p.id ? null : p.id)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <button
                      onClick={e => { e.stopPropagation(); toggleSolved(p.id); }}
                      title={solved.has(p.id) ? 'Çözüldü işaretini kaldır' : 'Çözdüm olarak işaretle'}
                      style={{
                        width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', flexShrink: 0,
                        border: `2px solid ${solved.has(p.id) ? 'var(--secondary)' : 'var(--border)'}`,
                        background: solved.has(p.id) ? 'var(--secondary)' : 'transparent',
                        color: '#06281f', fontSize: '0.7rem', fontWeight: 800, lineHeight: 1
                      }}
                    >{solved.has(p.id) ? '✓' : ''}</button>
                    <span style={{ color: 'var(--text-dim)', fontWeight: 700, minWidth: 28 }}>#{p.id}</span>
                    <span style={{ fontWeight: 600, color: solved.has(p.id) ? 'var(--secondary)' : 'inherit' }}>{p.title}</span>
                    <span className={`badge badge-${p.difficulty}`}>{difficultyMap[p.difficulty]}</span>
                    <span style={{
                      background: 'rgba(108,99,255,0.1)', color: 'var(--primary)',
                      padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem'
                    }}>{p.topic}</span>
                  </div>
                  <span style={{ color: 'var(--primary)', fontSize: '1.2rem', flexShrink: 0 }}>
                    {open === p.id ? '▲' : '▼'}
                  </span>
                </div>
                {open === p.id && (
                  <div className="accordion-body">
                    <p style={{ color: 'var(--text-muted)', marginBottom: 12, fontSize: '0.95rem' }}>{p.desc}</p>
                    {p.hint && (
                      <div className="info-box tip" style={{ marginBottom: 16 }}>
                        <div className="info-title">💡 İpucu</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.hint}</p>
                      </div>
                    )}
                    <CodeBlock code={p.code} language="csharp" filename={`${p.title}.cs`} />
                  </div>
                )}
              </div>
              {(idx + 1) % 4 === 0 && <AdBanner size="banner" style={{ margin: '16px 0' }} />}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <p>Bu filtreyle soru bulunamadı.</p>
          </div>
        )}

        <AdBanner size="leaderboard" style={{ marginTop: 40 }} />
      </div>
    </div>
  );
}
