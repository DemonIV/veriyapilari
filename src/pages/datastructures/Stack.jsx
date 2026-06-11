import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

const problems = [
  {
    id: 1, difficulty: 'easy', title: 'Parantez Geçerliliği',
    desc: 'Bir string\'in parantezlerinin geçerli olup olmadığını kontrol edin.',
    code: `public bool IsValid(string s)
{
    var stack = new Stack<char>();
    foreach (char c in s)
    {
        if (c == '(' || c == '[' || c == '{') { stack.Push(c); continue; }
        if (stack.Count == 0) return false;
        char top = stack.Pop();
        if (c == ')' && top != '(') return false;
        if (c == ']' && top != '[') return false;
        if (c == '}' && top != '{') return false;
    }
    return stack.Count == 0;
}
// "()[]{}" → true, "([)]" → false`
  },
  {
    id: 2, difficulty: 'medium', title: 'Günlük Sıcaklıklar',
    desc: 'Her gün için sıcaklığın artacağı ilk güne kadar kaç gün bekleneceğini bulun.',
    code: `public int[] DailyTemperatures(int[] temperatures)
{
    int n = temperatures.Length;
    int[] result = new int[n];
    var stack = new Stack<int>(); // indexleri sakla

    for (int i = 0; i < n; i++)
    {
        while (stack.Count > 0 && temperatures[i] > temperatures[stack.Peek()])
        {
            int idx = stack.Pop();
            result[idx] = i - idx;
        }
        stack.Push(i);
    }
    return result;
}
// [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]`
  },
  {
    id: 3, difficulty: 'medium', title: 'Minimum Stack',
    desc: 'O(1) zaman karmaşıklığıyla minimum elemanı döndüren stack tasarlayın.',
    code: `public class MinStack
{
    private Stack<int> stack = new Stack<int>();
    private Stack<int> minStack = new Stack<int>();

    public void Push(int val)
    {
        stack.Push(val);
        int min = minStack.Count == 0 ? val : Math.Min(val, minStack.Peek());
        minStack.Push(min);
    }

    public void Pop()
    {
        stack.Pop();
        minStack.Pop();
    }

    public int Top() => stack.Peek();
    public int GetMin() => minStack.Peek(); // O(1)!
}

var ms = new MinStack();
ms.Push(-2); ms.Push(0); ms.Push(-3);
Console.WriteLine(ms.GetMin()); // -3
ms.Pop();
Console.WriteLine(ms.GetMin()); // -2`
  },
  {
    id: 4, difficulty: 'hard', title: 'Histogramda En Büyük Dikdörtgen',
    desc: 'Bir histogram\'ın çubuklarında oluşturulabilecek en büyük dikdörtgenin alanını bulun.',
    code: `public int LargestRectangleInHistogram(int[] heights)
{
    var stack = new Stack<int>(); // monotonic increasing stack
    int maxArea = 0;
    int n = heights.Length;

    for (int i = 0; i <= n; i++)
    {
        int h = i == n ? 0 : heights[i];
        while (stack.Count > 0 && heights[stack.Peek()] > h)
        {
            int height = heights[stack.Pop()];
            int width = stack.Count == 0 ? i : i - stack.Peek() - 1;
            maxArea = Math.Max(maxArea, height * width);
        }
        stack.Push(i);
    }
    return maxArea;
}
// [2,1,5,6,2,3] → 10`
  },
];

export default function Stack() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Veri Yapıları › Yığın</div>
          <h1>📚 Yığın (Stack)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            LIFO (Last In, First Out) prensibiyle çalışan temel veri yapısı.
            Geri alma işlemleri, fonksiyon çağrıları ve ifade değerlendirme için vazgeçilmez.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-easy">Başlangıç</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~2 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* LIFO Görseli */}
        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>🧠 LIFO Prensibi</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              Stack'e son eklenen eleman ilk çıkar. Tıpkı bir tabak yığını gibi —
              en üstteki tabağı alırsın. C#'ta <code>Stack&lt;T&gt;</code> sınıfı bunu implemente eder.
            </p>
            <div className="info-box tip">
              <div className="info-title">🌍 Gerçek Hayat Örnekleri</div>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: 16, lineHeight: 1.8 }}>
                <li>Tarayıcı geri düğmesi (browser history)</li>
                <li>Ctrl+Z geri alma (undo/redo)</li>
                <li>Fonksiyon çağrı yığını (call stack)</li>
                <li>Parantez eşleştirme</li>
                <li>Postfix ifade değerlendirme</li>
              </ul>
            </div>
          </div>
          <div style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>// Stack operasyonları:</div>
              {[
                { op: 'Push(10)', stack: ['10'], color: 'var(--green)' },
                { op: 'Push(20)', stack: ['20', '10'], color: 'var(--green)' },
                { op: 'Push(30)', stack: ['30', '20', '10'], color: 'var(--green)' },
                { op: 'Pop() → 30', stack: ['20', '10'], color: 'var(--red)' },
                { op: 'Peek() → 20', stack: ['20', '10'], color: 'var(--yellow)' },
              ].map((step, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <span style={{ color: step.color }}>{step.op}</span>
                  <span style={{ color: 'var(--text-dim)', marginLeft: 12 }}>
                    [{step.stack.join(', ')}] ← TOP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Implementasyon */}
        <h2 style={{ marginBottom: 20 }}>💻 C# Implementasyon</h2>

        <h3 style={{ color: 'var(--primary)', marginBottom: 12 }}>Built-in Stack&lt;T&gt;</h3>
        <CodeBlock filename="StackKullanim.cs" code={`var stack = new Stack<int>();

// Temel operasyonlar
stack.Push(10);   // Ekle
stack.Push(20);
stack.Push(30);

int top = stack.Peek();  // Bakar ama çıkarmaz → 30
int cikti = stack.Pop(); // Çıkarır ve döndürür → 30
int sayi = stack.Count;  // Eleman sayısı → 2

// Kontrol
bool bos = stack.Count == 0;         // false
bool varMi = stack.Contains(10);     // true

// Foreach (LIFO sırasında dolaşır)
foreach (int item in stack)
    Console.Write(item + " "); // 20 10

// Diziye dönüştür
int[] arr = stack.ToArray(); // [20, 10]

// Tümünü temizle
stack.Clear();`} />

        <h3 style={{ color: 'var(--primary)', marginBottom: 12, marginTop: 32 }}>Array Tabanlı Stack (Sıfırdan)</h3>
        <CodeBlock filename="ArrayStack.cs" code={`public class ArrayStack<T>
{
    private T[] data;
    private int top = -1;

    public ArrayStack(int capacity = 16) => data = new T[capacity];

    public bool IsEmpty => top == -1;
    public int Count => top + 1;

    public void Push(T item)
    {
        if (top == data.Length - 1) // Büyüt
        {
            var newData = new T[data.Length * 2];
            Array.Copy(data, newData, data.Length);
            data = newData;
        }
        data[++top] = item;
    }

    public T Pop()
    {
        if (IsEmpty) throw new InvalidOperationException("Stack boş!");
        T item = data[top];
        data[top--] = default; // GC için temizle
        return item;
    }

    public T Peek()
    {
        if (IsEmpty) throw new InvalidOperationException("Stack boş!");
        return data[top];
    }
}

// Test
var s = new ArrayStack<string>();
s.Push("A"); s.Push("B"); s.Push("C");
Console.WriteLine(s.Pop()); // C
Console.WriteLine(s.Peek()); // B`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

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
                {p.desc && <p style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{p.desc}</p>}
                <CodeBlock code={p.code} language="csharp" filename={`Soru${p.id}.cs`} />
              </div>
            )}
          </div>
        ))}

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div className="card" style={{ borderColor: 'rgba(108,99,255,0.3)' }}>
          <h2 style={{ marginBottom: 16 }}>🎓 Öğrenme Tavsiyeleri</h2>
          <div className="grid-2" style={{ gap: 16 }}>
            {[
              { t: 'Monotonic Stack Öğren', d: 'Histogram, sonraki büyük eleman gibi klasik problemler için.' },
              { t: 'Call Stack Anla', d: 'Özyineleme nasıl çalışır? Stack overflow neden olur?' },
              { t: 'İki Stack ile Queue', d: 'Klasik mülakat sorusu: 2 stack kullanarak queue implementasyonu.' },
              { t: 'Expression Evaluation', d: 'Infix → Postfix dönüşümü ve postfix değerlendirme.' },
            ].map(item => (
              <div key={item.t} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>→</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.92rem' }}>{item.t}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, flexWrap: 'wrap', gap: 16 }}>
          <a href="/veri-yapilari/bagli-liste" className="btn btn-outline">← Bağlı Liste</a>
          <a href="/veri-yapilari/kuyruk" className="btn btn-primary">Sonraki: Kuyruk →</a>
        </div>
      </div>
    </div>
  );
}
