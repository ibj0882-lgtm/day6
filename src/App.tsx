import { useEffect, useState } from 'react';

export default function App() {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    fetch('/standalone.html')
      .then((res) => res.text())
      .then((text) => setHtmlContent(text))
      .catch((err) => console.error('Error fetching standalone.html:', err));
  }, []);

  const handleDownload = () => {
    try {
      const blob = new Blob([htmlContent || ''], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download standalone.html', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{
        background: '#ffffff',
        color: '#0f172a',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>📄</span>
          <span><strong style={{ fontWeight: 600 }}>나의 일정 관리:</strong> <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>standalone.html</code> (index.html과 동일한 최상위 폴더 위치)</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '9999px',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.15s ease'
            }}
          >
            ⬇️ HTML 파일 직접 다운로드
          </button>
          <a
            href="/standalone.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              padding: '7px 16px',
              borderRadius: '9999px',
              fontWeight: 500,
              fontSize: '13px'
            }}
          >
            ↗️ 브라우저 새 탭에서 열기
          </a>
        </div>
      </div>
      <iframe
        src="/standalone.html"
        srcDoc={htmlContent || undefined}
        title="Standalone App Preview"
        style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
      />
    </div>
  );
}
