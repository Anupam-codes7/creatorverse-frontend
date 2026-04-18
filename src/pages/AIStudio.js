import { useState } from 'react';
import API from '../api';

export default function AIStudio() {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/ai/generate', { topic });
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || 'AI generation failed. Try again in a moment.');    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>AI Studio</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>Describe your video and get titles, hashtags, description and thumbnail tips powered by Gemini.</p>

      <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Describe your video in 2-3 lines</label>
          <textarea className="input-field" placeholder="e.g. A beginner's guide to building a full-stack app with React and Node.js..." value={topic} onChange={e => setTopic(e.target.value)} />
        </div>
        {error && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <button className="btn-grad" onClick={generate} disabled={loading} style={{ width: '100%', padding: '13px', fontSize: 15 }}>
          {loading ? 'Generating with Gemini...' : '✦ Generate Content'}
        </button>
      </div>

      {results && (
        <div>
          <div className="section-title">5 Title Options</div>
          {results.titles?.map((t, i) => (
            <div key={i} style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 12, padding: 16, marginBottom: 10, display: 'flex', gap: 12, cursor: 'pointer' }}
              onClick={() => navigator.clipboard.writeText(t)}>
              <span style={{ fontSize: 12, color: '#7C3AED', fontWeight: 700, flexShrink: 0 }}>#{i + 1}</span>
              <span style={{ fontSize: 14 }}>{t}</span>
            </div>
          ))}

          <div className="section-title" style={{ marginTop: 24 }}>Video Description</div>
          <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{results.description}</p>
          </div>

          <div className="section-title">Hashtags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {results.hashtags?.map((h, i) => <span key={i} className="tag">{h}</span>)}
          </div>

          <div className="section-title">Thumbnail Tip</div>
          <div style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.3)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 14, color: '#f9a8d4' }}>💡 {results.thumbnailTip}</span>
          </div>
        </div>
      )}
    </div>
  );
}