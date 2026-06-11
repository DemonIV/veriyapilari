import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('csharp', csharp);

export default function CodeBlock({ code, language = 'csharp', filename = 'Program.cs', showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const langLabel = language === 'csharp' ? 'C#' : language.toUpperCase();

  return (
    <div className="code-wrapper">
      <div className="code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="code-dots">
            <span /><span /><span />
          </div>
          <span style={{ fontSize: '0.85rem' }}>{filename}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: 'rgba(108,99,255,0.2)', color: 'var(--primary)',
            padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600
          }}>{langLabel}</span>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Kopyalandı' : '📋 Kopyala'}
          </button>
          <a
            href="https://dotnetfiddle.net"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text-muted)', padding: '4px 12px', borderRadius: 4,
              fontSize: '0.75rem', textDecoration: 'none', transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.color = 'var(--secondary)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-muted)'; }}
          >
            ▶ Çalıştır
          </a>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.88rem',
          background: '#0d1117',
          padding: '20px',
        }}
        lineNumberStyle={{ color: '#3a4a6b', userSelect: 'none' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
