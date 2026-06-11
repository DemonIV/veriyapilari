import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import AdBanner from '../../components/AdBanner';

export default function Tree() {
  const [open, setOpen] = useState(null);
  const [activeTab, setActiveTab] = useState('bst');

  const tabs = {
    bst: {
      title: 'İkili Arama Ağacı (BST)',
      code: `public class TreeNode
{
    public int Val;
    public TreeNode Left, Right;
    public TreeNode(int val) { Val = val; }
}

public class BST
{
    public TreeNode Root;

    public void Insert(int val)
    {
        Root = InsertRec(Root, val);
    }

    private TreeNode InsertRec(TreeNode node, int val)
    {
        if (node == null) return new TreeNode(val);
        if (val < node.Val) node.Left = InsertRec(node.Left, val);
        else if (val > node.Val) node.Right = InsertRec(node.Right, val);
        return node;
    }

    public bool Search(int val)
    {
        var curr = Root;
        while (curr != null)
        {
            if (val == curr.Val) return true;
            curr = val < curr.Val ? curr.Left : curr.Right;
        }
        return false;
    }

    public void Delete(int val) => Root = DeleteRec(Root, val);

    private TreeNode DeleteRec(TreeNode node, int val)
    {
        if (node == null) return null;
        if (val < node.Val) { node.Left = DeleteRec(node.Left, val); return node; }
        if (val > node.Val) { node.Right = DeleteRec(node.Right, val); return node; }

        // Düğüm bulundu
        if (node.Left == null) return node.Right;
        if (node.Right == null) return node.Left;

        // İki çocuk var: sağ alt ağacın en küçük değerini bul
        var minRight = node.Right;
        while (minRight.Left != null) minRight = minRight.Left;
        node.Val = minRight.Val;
        node.Right = DeleteRec(node.Right, minRight.Val);
        return node;
    }
}

// Test
var bst = new BST();
int[] values = {5, 3, 7, 1, 4, 6, 8};
foreach (int v in values) bst.Insert(v);
//       5
//      / \\
//     3   7
//    / \\ / \\
//   1  4 6  8`
    },
    traversals: {
      title: 'Ağaç Gezinme (Tree Traversal)',
      code: `public class TreeTraversal
{
    // Inorder: Sol → Kök → Sağ (BST'de sıralı çıktı verir)
    public List<int> Inorder(TreeNode root)
    {
        var result = new List<int>();
        void DFS(TreeNode node)
        {
            if (node == null) return;
            DFS(node.Left);
            result.Add(node.Val);
            DFS(node.Right);
        }
        DFS(root);
        return result; // [1,3,4,5,6,7,8]
    }

    // Preorder: Kök → Sol → Sağ (ağacı serialize etmek için)
    public List<int> Preorder(TreeNode root)
    {
        var result = new List<int>();
        void DFS(TreeNode node)
        {
            if (node == null) return;
            result.Add(node.Val); // önce kök
            DFS(node.Left);
            DFS(node.Right);
        }
        DFS(root);
        return result; // [5,3,1,4,7,6,8]
    }

    // Postorder: Sol → Sağ → Kök (dosya sistemleri, ifade ağaçları)
    public List<int> Postorder(TreeNode root)
    {
        var result = new List<int>();
        void DFS(TreeNode node)
        {
            if (node == null) return;
            DFS(node.Left);
            DFS(node.Right);
            result.Add(node.Val); // en son kök
        }
        DFS(root);
        return result; // [1,4,3,6,8,7,5]
    }

    // Level Order (BFS) - Seviye seviye
    public List<List<int>> LevelOrder(TreeNode root)
    {
        var result = new List<List<int>>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int size = queue.Count;
            var level = new List<int>();
            for (int i = 0; i < size; i++)
            {
                var node = queue.Dequeue();
                level.Add(node.Val);
                if (node.Left != null) queue.Enqueue(node.Left);
                if (node.Right != null) queue.Enqueue(node.Right);
            }
            result.Add(level);
        }
        return result; // [[5],[3,7],[1,4,6,8]]
    }
}`
    },
  };

  const problems = [
    {
      id: 1, difficulty: 'easy', title: 'Ağacın Maksimum Derinliği',
      code: `public int MaxDepth(TreeNode root)
{
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}
// İteratif (BFS):
public int MaxDepthBFS(TreeNode root)
{
    if (root == null) return 0;
    var q = new Queue<TreeNode>();
    q.Enqueue(root);
    int depth = 0;
    while (q.Count > 0)
    {
        depth++;
        int size = q.Count;
        for (int i = 0; i < size; i++)
        {
            var node = q.Dequeue();
            if (node.left != null) q.Enqueue(node.left);
            if (node.right != null) q.Enqueue(node.right);
        }
    }
    return depth;
}`
    },
    {
      id: 2, difficulty: 'medium', title: 'İkili Ağaç Simetrik mi?',
      code: `public bool IsSymmetric(TreeNode root)
{
    return IsMirror(root, root);
}

private bool IsMirror(TreeNode left, TreeNode right)
{
    if (left == null && right == null) return true;
    if (left == null || right == null) return false;
    return left.val == right.val
        && IsMirror(left.left, right.right)
        && IsMirror(left.right, right.left);
}`
    },
    {
      id: 3, difficulty: 'medium', title: 'LCA (En Yakın Ortak Ata)',
      code: `// BST'de LCA
public TreeNode LCAinBST(TreeNode root, TreeNode p, TreeNode q)
{
    while (root != null)
    {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}

// Genel ikili ağaçta LCA
public TreeNode LCA(TreeNode root, TreeNode p, TreeNode q)
{
    if (root == null || root == p || root == q) return root;
    var left = LCA(root.left, p, q);
    var right = LCA(root.right, p, q);
    return left == null ? right : right == null ? left : root;
}`
    },
    {
      id: 4, difficulty: 'hard', title: 'Ağaçta Maksimum Yol Toplamı',
      code: `private int maxSum = int.MinValue;

public int MaxPathSum(TreeNode root)
{
    MaxGain(root);
    return maxSum;
}

private int MaxGain(TreeNode node)
{
    if (node == null) return 0;

    // Negatifse kullanma (0 al)
    int leftGain = Math.Max(MaxGain(node.left), 0);
    int rightGain = Math.Max(MaxGain(node.right), 0);

    // Bu düğümden geçen yol toplamı
    int pathThruNode = node.val + leftGain + rightGain;
    maxSum = Math.Max(maxSum, pathThruNode);

    // Üst düğüme sadece bir yönü dönebilirsin
    return node.val + Math.Max(leftGain, rightGain);
}`
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Ana Sayfa</a> › Veri Yapıları › Ağaç</div>
          <h1>🌳 Ağaç (Tree)</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, maxWidth: 700, lineHeight: 1.7 }}>
            Hiyerarşik veri yapısı. BST, AVL, Red-Black Tree. Veritabanı indeksleri,
            dosya sistemleri ve arama motorları bu yapıyı kullanır.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <span className="badge badge-medium">Orta Seviye</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', alignSelf: 'center' }}>⏱ ~5 saat</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdBanner size="banner" />

        {/* BST Özellikleri */}
        <h2 style={{ marginBottom: 20 }}>🌳 BST Özellikleri</h2>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { title: 'Sol Alt Ağaç', desc: 'Kökten küçük tüm değerleri içerir', icon: '◄' },
            { title: 'Sağ Alt Ağaç', desc: 'Kökten büyük tüm değerleri içerir', icon: '►' },
            { title: 'Inorder = Sıralı', desc: 'BST\'yi inorder gezerken sıralı liste elde edilir', icon: '↕' },
          ].map(t => (
            <div key={t.title} className="card">
              <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: 8 }}>{t.icon}</div>
              <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{t.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Karmaşıklık */}
        <h2 style={{ marginBottom: 16 }}>⏱ BST Karmaşıklığı</h2>
        <table style={{ marginBottom: 40 }}>
          <thead><tr><th>İşlem</th><th>Ortalama</th><th>En Kötü (Skewed)</th></tr></thead>
          <tbody>
            {[
              ['Arama', 'O(log n)', 'O(n)'],
              ['Ekleme', 'O(log n)', 'O(n)'],
              ['Silme', 'O(log n)', 'O(n)'],
              ['Min/Max', 'O(log n)', 'O(n)'],
              ['Inorder', 'O(n)', 'O(n)'],
            ].map(r => (
              <tr key={r[0]}>
                <td style={{ color: 'var(--text)' }}>{r[0]}</td>
                <td className="complexity-ologn">{r[1]}</td>
                <td className="complexity-on">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="info-box warning" style={{ marginBottom: 32 }}>
          <div className="info-title">⚠️ BST'nin Zayıflığı</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Sıralı veri eklenirse BST düz bir listeye döner (skewed tree) → O(n).
            Çözüm: Self-balancing ağaçlar kullan (AVL Tree, Red-Black Tree, C# SortedSet/SortedDictionary).
          </p>
        </div>

        {/* Tab seçici */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {Object.entries(tabs).map(([key, val]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`btn ${activeTab === key ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.85rem' }}>
              {val.title}
            </button>
          ))}
        </div>
        <CodeBlock code={tabs[activeTab].code} language="csharp" filename={`${tabs[activeTab].title}.cs`} />

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
                <CodeBlock code={p.code} language="csharp" filename={`Soru${p.id}.cs`} />
              </div>
            )}
          </div>
        ))}

        <AdBanner size="banner" style={{ margin: '32px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 16 }}>
          <a href="/veri-yapilari/kuyruk" className="btn btn-outline">← Kuyruk</a>
          <a href="/veri-yapilari/hash-tablosu" className="btn btn-primary">Sonraki: Hash Tablosu →</a>
        </div>
      </div>
    </div>
  );
}
