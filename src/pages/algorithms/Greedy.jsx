import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function Greedy() {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Ana Sayfa</Link> › Algoritmalar › Açgözlü Algoritmalar</div>
          <h1>💰 Açgözlü Algoritmalar (Greedy)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Her adımda o anki en iyi görünen seçimi yap, geriye dönme. Doğru problemde
            DP'den çok daha basit ve hızlı; yanlış problemde ise tuzak.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~3 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        <h2 style={{ marginBottom: 20 }}>📖 Greedy Ne Zaman Çalışır?</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { t: 'Greedy Choice Property', d: 'Yerel en iyi seçim, global en iyi çözümün parçası olabiliyorsa greedy çalışır.' },
            { t: 'Optimal Substructure', d: 'Bir seçim yaptıktan sonra kalan problem, aynı türden daha küçük bir problemse.' },
            { t: 'Geri Dönüş Yok', d: 'Greedy verdiği kararı asla değiştirmez. DP ise tüm alt durumları değerlendirir.' },
            { t: 'Kanıt Şart', d: 'Greedy\'nin doğruluğu sezgisel değildir; exchange argument ile kanıtlanır. Şüphedeysen DP düşün.' },
            { t: 'Sıralama + Greedy', d: 'Çoğu greedy çözümü "önce uygun kritere göre sırala" adımıyla başlar.' },
            { t: 'Klasik Tuzak', d: 'Coin Change keyfi madeni paralarla greedy ÇALIŞMAZ ([1,5,6,9], 11 → greedy 3, doğru 2).' },
          ].map(item => (
            <div key={item.t} className="card">
              <h3 style={{ fontSize: '0.95rem', marginBottom: 8, color: 'var(--primary)' }}>{item.t}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.d}</p>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: 20 }}>💻 Aktivite Seçimi (Activity Selection)</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
          En klasik greedy problemi: çakışmayan maksimum sayıda toplantıyı seç.
          Püf nokta: <strong>en erken bitene</strong> göre sırala.
        </p>
        <CodeBlock filename="ActivitySelection.cs" code={`public int MaxActivities((int start, int end)[] activities)
{
    // En erken biten aktivite, sonraki seçimler için en çok alanı bırakır
    Array.Sort(activities, (a, b) => a.end.CompareTo(b.end));

    int count = 0, lastEnd = int.MinValue;
    foreach (var (start, end) in activities)
    {
        if (start >= lastEnd) // Çakışmıyorsa seç
        {
            count++;
            lastEnd = end;
        }
    }
    return count;
}

// Kullanım
var meetings = new[] { (1, 4), (3, 5), (0, 6), (5, 7), (8, 9), (5, 9) };
Console.WriteLine(MaxActivities(meetings)); // 3 → (1,4), (5,7), (8,9)`} />

        <h2 style={{ margin: '40px 0 20px' }}>💻 Jump Game (Atlama Oyunu)</h2>
        <CodeBlock filename="JumpGame.cs" code={`// nums[i] = i konumundan atlayabileceğin maksimum mesafe
// Son indekse ulaşılabilir mi?
public bool CanJump(int[] nums)
{
    int farthest = 0; // Şu ana kadar ulaşabildiğimiz en uzak nokta
    for (int i = 0; i < nums.Length; i++)
    {
        if (i > farthest) return false; // Bu noktaya hiç ulaşamıyoruz
        farthest = Math.Max(farthest, i + nums[i]);
    }
    return true;
}

Console.WriteLine(CanJump(new[] { 2, 3, 1, 1, 4 })); // True
Console.WriteLine(CanJump(new[] { 3, 2, 1, 0, 4 })); // False (0'da takılır)`} />

        <AdBanner size="rectangle" style={{ margin: '32px 0' }} />

        <h2 style={{ marginBottom: 20 }}>💻 Aralık Birleştirme Yakını: Minimum Ok Sayısı</h2>
        <CodeBlock filename="MinArrows.cs" code={`// Balonlar [start, end] aralıkları; bir ok dikine atılır ve
// kesiştiği tüm balonları patlatır. Minimum ok sayısı?
public int FindMinArrowShots(int[][] points)
{
    if (points.Length == 0) return 0;
    // Bitiş noktasına göre sırala, oku hep mevcut grubun bitişine at
    Array.Sort(points, (a, b) => a[1].CompareTo(b[1]));

    int arrows = 1, arrowPos = points[0][1];
    foreach (var p in points)
    {
        if (p[0] > arrowPos) // Bu balon mevcut okla patlamıyor
        {
            arrows++;
            arrowPos = p[1];
        }
    }
    return arrows;
}

var balloons = new[] { new[] {10,16}, new[] {2,8}, new[] {1,6}, new[] {7,12} };
Console.WriteLine(FindMinArrowShots(balloons)); // 2`} />

        <h2 style={{ margin: '40px 0 20px' }}>💻 Huffman Kodlama (Heap + Greedy)</h2>
        <CodeBlock filename="Huffman.cs" code={`// Sık geçen karaktere kısa kod, nadir geçene uzun kod ata.
// Greedy: her adımda en düşük frekanslı iki düğümü birleştir.
public class HuffmanNode
{
    public char? Symbol;
    public int Freq;
    public HuffmanNode? Left, Right;
}

public HuffmanNode BuildHuffmanTree(Dictionary<char, int> freqs)
{
    var pq = new PriorityQueue<HuffmanNode, int>();
    foreach (var (ch, f) in freqs)
        pq.Enqueue(new HuffmanNode { Symbol = ch, Freq = f }, f);

    while (pq.Count > 1)
    {
        var left = pq.Dequeue();   // En düşük frekanslı iki düğüm
        var right = pq.Dequeue();
        var merged = new HuffmanNode { Freq = left.Freq + right.Freq, Left = left, Right = right };
        pq.Enqueue(merged, merged.Freq);
    }
    return pq.Dequeue(); // Kök — sola git: 0, sağa git: 1
}`} />

        <div className="info-box warning" style={{ margin: '24px 0' }}>
          <div className="info-title">⚠️ Greedy mi DP mi?</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Küçük bir örnekte greedy'nin verdiği cevabı kaba kuvvetle karşılaştır. Tek bir karşıt
            örnek bile bulursan problem DP'liktir. Emin olamadıysan{' '}
            <Link to="/algoritmalar/dinamik-programlama">Dinamik Programlama</Link> her zaman
            güvenli liman.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/algoritmalar/graf-algoritmalari" className="btn btn-outline">← Graf Algoritmaları</Link>
          <Link to="/algoritmalar/bolum-fethet" className="btn btn-primary">Böl ve Fethet →</Link>
        </div>
      </div>
    </div>
  );
}
