import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';

export default function AICoach() {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    setLoading(true);
    setError('');
    try {
      const stats = await API.get('/youtube/stats');
      const { data } = await API.post('/ai/coach', {
        channelName: stats.data.channelName,
        niche: stats.data.niche || 'Tech',
        videos: stats.data.topVideos?.slice(0, 5),
      });
      setResult(data);
    } catch (err) {
      setError('Could not analyze. Make sure your channel is connected and Gemini API key is set.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>AI Performance Coach</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>Analyzes your channel and gives personalized growth tips.</p>

      {!result ? (
        <div className="glass" style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>◉</div>
          <div className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Ready to analyze your channel?</div>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>We'll look at your videos and generate 3 actionable tips using Gemini AI.</p>
          {error && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <button className="btn-grad" onClick={analyze} disabled={loading} style={{ padding: '13px 36px', fontSize: 15 }}>
            {loading ? 'Analyzing with Gemini...' : 'Analyze My Channel'}
          </button>
        </div>
      ) : (
        <div>
          <div className="section-title">3 Personalised Tips</div>
          {result.tips?.map((t, i) => (
            <div key={i} className="glass" style={{ padding: '20px 22px', marginBottom: 12, borderLeft: '3px solid #7C3AED', borderRadius: '0 16px 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <span className="syne" style={{ fontWeight: 700, fontSize: 15 }}>{t.title}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{t.body}</p>
            </div>
          ))}
          <div className="glass-sm" style={{ padding: '14px 18px', marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Posting Frequency</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{result.postingFrequency}</div>
            </div>
          </div>
          <div className="glass-sm" style={{ padding: '14px 18px', marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>⏰</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Best Time to Post</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{result.bestTimeToPost}</div>
            </div>
          </div>
          <button className="btn-outline" onClick={() => setResult(null)} style={{ marginTop: 20 }}>Analyze Again</button>
        </div>
      )}
    </div>
  );
}