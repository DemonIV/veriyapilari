import { useEffect } from 'react';

const adSizes = {
  banner: { width: '100%', height: '90px', label: 'Reklam (728×90)' },
  rectangle: { width: '100%', height: '250px', label: 'Reklam (300×250)' },
  leaderboard: { width: '100%', height: '90px', label: 'Reklam (970×90)' },
  sidebar: { width: '100%', height: '600px', label: 'Reklam (300×600)' },
};

export default function AdBanner({ size = 'banner', style = {} }) {
  const config = adSizes[size] || adSizes.banner;
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!isDev) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }
  }, []);

  if (isDev) {
    return (
      <div
        className={`ad-slot ad-slot-${size}`}
        style={{
          width: config.width,
          height: config.height,
          ...style,
        }}
      >
        <span>📢 {config.label}</span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
