import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';
import { Link } from 'react-router-dom';

export default function LinkedList() {
  const [open, setOpen] = useState(null);

  const problems = [
    {
      id: 1, difficulty: 'easy', title: 'Bağlı Listeyi Ters Çevir',
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
}
// 1->2->3->4->5 → 5->4->3->2->1`
    },
    {
      id: 2, difficulty: 'easy', title: 'Döngü (Cycle) Tespiti - Floyd',
      code: `// Floyd'un "tortoise and hare" algoritması
public bool HasCycle(ListNode head)
{
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null)
    {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Döngü başlangıcını bul
public ListNode DetectCycle(ListNode head)
{
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null)
    {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if (fast == null || fast.next == null) return null;

    slow = head;
    while (slow != fast) { slow = slow.next; fast = fast.next; }
    return slow; // Döngü başlangıcı
}`
    },
    {
      id: 3, difficulty: 'medium', title: 'Ortadaki Düğümü Bul',
      code: `// Tek geçişle ortayı bul
public ListNode MiddleNode(ListNode head)
{
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null)
    {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow; // Tek sayılı: ortadaki, çift sayılı: ikinci orta
}`
    },
    {
      id: 4, difficulty: 'medium', title: 'K Gruplar Halinde Ters Çevir',
      code: `public ListNode ReverseKGroup(ListNode head, int k)
{
    ListNode curr = head;
    int count = 0;

    // k düğüm var mı kontrol et
    while (curr != null && count < k) { curr = curr.next; count++; }
    if (count < k) return head; // Yeterli düğüm yok

    // k düğümü ters çevir
    ListNode prev = null; curr = head;
    for (int i = 0; i < k; i++)
    {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    head.next = ReverseKGroup(curr, k);
    return prev;
}`
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Ana Sayfa</Link> › Veri Yapıları › Bağlı Liste
          </div>
          <h1>🔗 Bağlı Listeler (Linked Lists)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Dinamik boyutlu, işaretçi tabanlı doğrusal veri yapısı. Dizilerin aksine
            bellekte ardışık olmayan düğümleri birbirine bağlar.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-easy">Başlangıç</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* Türler */}
        <h2 style={{ marginBottom: 20 }}>📊 Bağlı Liste Türleri</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { title: 'Tekli Bağlı Liste', icon: '→', desc: 'Her düğüm sadece bir sonrakini gösterir. En basit form.' },
            { title: 'Çift Bağlı Liste', icon: '↔', desc: 'Her düğüm hem öncekini hem sonrakini gösterir. Çift yönlü gezinme.' },
            { title: 'Dairesel Bağlı Liste', icon: '↺', desc: 'Son düğüm ilk düğümü gösterir. Döngüsel yapılar için.' },
          ].map(t => (
            <div key={t.title} className="card">
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{t.icon}</div>
              <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{t.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Görsel */}
        <div style={{
          background: 'var(--code-bg)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '20px 24px', marginBottom: 40, fontFamily: 'Fira Code, monospace', fontSize: '0.85rem'
        }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>// Tekli Bağlı Liste Görünümü:</div>
          <div style={{ color: 'var(--secondary)' }}>
            HEAD → [10|•] → [20|•] → [30|•] → [40|•] → NULL
          </div>
          <div style={{ color: 'var(--text-muted)', marginTop: 8 }}>
            {'       '}[data|next]  [data|next]  [data|next]  [data|next]
          </div>
        </div>

        {/* Karmaşıklık */}
        <h2 style={{ marginBottom: 16 }}>⏱ Zaman Karmaşıklığı</h2>
        <table style={{ marginBottom: 40 }}>
          <thead><tr><th>İşlem</th><th>Tekli BL</th><th>Çift BL</th><th>Dizi Karşılaştırması</th></tr></thead>
          <tbody>
            {[
              ['Başa Ekleme', 'O(1)', 'O(1)', 'O(n) - kaydırma gerekir'],
              ['Sona Ekleme (tail ref)', 'O(1)', 'O(1)', 'O(1) - amortized'],
              ['Ortaya Ekleme', 'O(n)', 'O(n)', 'O(n)'],
              ['Arama', 'O(n)', 'O(n)', 'O(n) - sırasız'],
              ['Index\'e Erişim', 'O(n)', 'O(n)', 'O(1) ← DİZİ KAZANIR'],
              ['Baştan Silme', 'O(1)', 'O(1)', 'O(n) - kaydırma'],
            ].map(row => (
              <tr key={row[0]}>
                <td style={{ color: 'var(--text)' }}>{row[0]}</td>
                <td className="complexity-on">{row[1]}</td>
                <td className="complexity-on">{row[2]}</td>
                <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Implementasyon */}
        <h2 style={{ marginBottom: 20 }}>💻 C# Implementasyon</h2>

        <h3 style={{ marginBottom: 12, color: 'var(--primary)' }}>Tekli Bağlı Liste</h3>
        <CodeBlock filename="SinglyLinkedList.cs" code={`public class ListNode<T>
{
    public T Data;
    public ListNode<T> Next;
    public ListNode(T data) { Data = data; }
}

public class LinkedList<T>
{
    private ListNode<T> head;
    private int count;

    public int Count => count;

    public void AddFirst(T data)
    {
        var node = new ListNode<T>(data);
        node.Next = head;
        head = node;
        count++;
    }

    public void AddLast(T data)
    {
        var node = new ListNode<T>(data);
        if (head == null) { head = node; count++; return; }

        var curr = head;
        while (curr.Next != null) curr = curr.Next;
        curr.Next = node;
        count++;
    }

    public bool Remove(T data)
    {
        if (head == null) return false;

        if (head.Data.Equals(data)) { head = head.Next; count--; return true; }

        var curr = head;
        while (curr.Next != null)
        {
            if (curr.Next.Data.Equals(data))
            {
                curr.Next = curr.Next.Next;
                count--;
                return true;
            }
            curr = curr.Next;
        }
        return false;
    }

    public void Print()
    {
        var curr = head;
        while (curr != null)
        {
            Console.Write($"{curr.Data}");
            if (curr.Next != null) Console.Write(" → ");
            curr = curr.Next;
        }
        Console.WriteLine(" → NULL");
    }
}

// C# built-in LinkedList<T>
var liste = new System.Collections.Generic.LinkedList<int>();
liste.AddFirst(10);
liste.AddLast(20);
liste.AddLast(30);
// 10 ↔ 20 ↔ 30 (çift bağlı!)`} />

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

        {/* Dizi vs Bağlı Liste */}
        <div className="card" style={{ marginTop: 8 }}>
          <h2 style={{ marginBottom: 20 }}>⚖️ Dizi mi, Bağlı Liste mi?</h2>
          <div className="grid-2">
            <div>
              <h3 style={{ color: 'var(--green)', marginBottom: 12 }}>✅ Bağlı Liste Kullan</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Sık başa/sona ekleme/silme', 'Boyut önceden bilinmiyorsa', 'Bellek parçalı olabilirse', 'LRU Cache implementasyonu'].map(t => (
                  <li key={t} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--green)' }}>✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ color: 'var(--red)', marginBottom: 12 }}>❌ Dizi Kullan</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Random access gerekiyorsa', 'Cache locality önemliyse', 'İkili arama yapılacaksa', 'Bellek sınırlıysa (pointer overhead)'].map(t => (
                  <li key={t} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--red)' }}>✗</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, flexWrap: 'wrap', gap: 16 }}>
          <Link to="/veri-yapilari/diziler" className="btn btn-outline">← Diziler</Link>
          <Link to="/veri-yapilari/yigin" className="btn btn-primary">Sonraki: Yığın →</Link>
        </div>
      </div>
    </div>
  );
}
