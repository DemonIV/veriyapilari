import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';
import { Link } from 'react-router-dom';

export default function Queue() {
  const [open, setOpen] = useState(null);

  const problems = [
    {
      id: 1, difficulty: 'easy', title: 'İki Stack ile Queue',
      code: `public class MyQueue
{
    private Stack<int> inbox = new Stack<int>();
    private Stack<int> outbox = new Stack<int>();

    public void Push(int x) => inbox.Push(x);

    public int Pop()
    {
        Transfer();
        return outbox.Pop();
    }

    public int Peek()
    {
        Transfer();
        return outbox.Peek();
    }

    public bool Empty => inbox.Count == 0 && outbox.Count == 0;

    private void Transfer()
    {
        if (outbox.Count == 0)
            while (inbox.Count > 0)
                outbox.Push(inbox.Pop());
    }
}`
    },
    {
      id: 2, difficulty: 'medium', title: 'Kayan Pencere Maksimumu',
      code: `// Monotonic Deque ile O(n) çözüm
public int[] MaxSlidingWindow(int[] nums, int k)
{
    var result = new List<int>();
    var deque = new LinkedList<int>(); // indexleri tutar (azalan max deque)

    for (int i = 0; i < nums.Length; i++)
    {
        // Pencere dışına çıkan indexleri at
        if (deque.Count > 0 && deque.First.Value <= i - k)
            deque.RemoveFirst();

        // Küçük elemanları deque'den çıkar
        while (deque.Count > 0 && nums[deque.Last.Value] < nums[i])
            deque.RemoveLast();

        deque.AddLast(i);

        if (i >= k - 1)
            result.Add(nums[deque.First.Value]);
    }
    return result.ToArray();
}
// [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]`
    },
    {
      id: 3, difficulty: 'medium', title: 'İkili Ağacı Seviye Seviye Dolaş (BFS)',
      code: `public IList<IList<int>> LevelOrder(TreeNode root)
{
    var result = new List<IList<int>>();
    if (root == null) return result;

    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0)
    {
        int levelSize = queue.Count;
        var level = new List<int>();

        for (int i = 0; i < levelSize; i++)
        {
            var node = queue.Dequeue();
            level.Add(node.val);
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
        result.Add(level);
    }
    return result;
}`
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Veri Yapıları › Kuyruk</div>
          <h1>🚶 Kuyruk (Queue)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            FIFO (First In, First Out) prensibiyle çalışan veri yapısı.
            BFS, görev kuyruğu ve gerçek zamanlı sistemlerde temel yapı taşı.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-easy">Başlangıç</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~2 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>🧠 FIFO Prensibi</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              İlk giren ilk çıkar. Bir banka kuyruğu gibi düşün — ilk gelen kişi ilk hizmet alır.
              C#'ta <code>Queue&lt;T&gt;</code>, <code>PriorityQueue&lt;T,P&gt;</code> ve
              çift yönlü <code>LinkedList&lt;T&gt;</code> (deque) mevcuttur.
            </p>
            <div className="info-box tip">
              <div className="info-title">🌍 Kullanım Alanları</div>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: 16, lineHeight: 1.9 }}>
                <li>BFS (Graf/Ağaç seviye gezinme)</li>
                <li>İşlemci görev kuyruğu (task scheduling)</li>
                <li>Yazıcı print kuyruğu</li>
                <li>Kayan pencere (sliding window)</li>
                <li>Async mesaj kuyruğu (RabbitMQ vs.)</li>
              </ul>
            </div>
          </div>

          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ marginBottom: 12 }}>// FIFO Görünümü:</div>
              <div style={{ color: 'var(--secondary)', marginBottom: 8 }}>
                Enqueue → [10][20][30][40] → Dequeue
              </div>
              <div style={{ marginBottom: 4 }}>{'           '}ÖNCE  ...   SON</div>
              <div style={{ marginTop: 16, color: 'var(--yellow)' }}>
                // PriorityQueue - öncelik sırasına göre
              </div>
              <div style={{ color: 'var(--primary)', marginTop: 4 }}>
                pq.Enqueue("Acil", 1);  // öncelik 1
              </div>
              <div style={{ color: 'var(--primary)' }}>
                pq.Enqueue("Normal", 5); // öncelik 5
              </div>
              <div style={{ color: 'var(--green)', marginTop: 4 }}>
                pq.Dequeue() → "Acil" // önce düşük öncelik
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ marginBottom: 20 }}>💻 C# Implementasyon</h2>

        <CodeBlock filename="QueueKullanim.cs" code={`// Standart Queue<T>
var queue = new Queue<int>();

queue.Enqueue(10);   // Kuyruğa ekle (sona)
queue.Enqueue(20);
queue.Enqueue(30);

int ilk = queue.Peek();    // Bakar ama çıkarmaz → 10
int cikti = queue.Dequeue(); // Çıkarır → 10
int sayi = queue.Count;      // 2

// PriorityQueue<TElement, TPriority> (.NET 6+)
var pq = new PriorityQueue<string, int>();
pq.Enqueue("Görev C", 3);
pq.Enqueue("Görev A", 1);  // En yüksek öncelik (en küçük sayı)
pq.Enqueue("Görev B", 2);

while (pq.Count > 0)
    Console.WriteLine(pq.Dequeue()); // A, B, C sırasıyla

// Circular Queue (Ring Buffer) - sabit bellek
public class CircularQueue<T>
{
    private T[] data;
    private int head, tail, size;

    public CircularQueue(int capacity)
    {
        data = new T[capacity];
    }

    public bool Enqueue(T item)
    {
        if (size == data.Length) return false; // Dolu
        data[tail] = item;
        tail = (tail + 1) % data.Length;
        size++;
        return true;
    }

    public T Dequeue()
    {
        if (size == 0) throw new InvalidOperationException();
        T item = data[head];
        head = (head + 1) % data.Length;
        size--;
        return item;
    }
}`} />

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

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 16 }}>
          <Link to="/veri-yapilari/yigin" className="btn btn-outline">← Yığın</Link>
          <Link to="/veri-yapilari/agac" className="btn btn-primary">Sonraki: Ağaç →</Link>
        </div>
      </div>
    </div>
  );
}
