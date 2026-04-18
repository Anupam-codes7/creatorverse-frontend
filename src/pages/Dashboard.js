import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const NICHES = ['Tech', 'Gaming', 'Finance', 'Fitness', 'Education', 'Entertainment', 'Food', 'Travel', 'Music', 'Sports'];

export default function Dashboard() {
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('auto');
  const [channelUrl, setChannelUrl] = useState('');
  const [manualForm, setManualForm] = useState({
    channelName: '', subscriberCount: '', totalViews: '', videoCount: '', niche: '',
  });

  useEffect(() => {
    if (user?.accountType === 'creator') {
      API.get('/youtube/stats')
        .then(r => setChannel(r.data))
        .catch(() => {})
        .finally(() => setFetching(false));
    } else setFetching(false);
  }, [user]);

  const connectAuto = async () => {
    if (!channelUrl.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post('/youtube/connect', { channelUrl });
      setChannel(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not fetch channel. Try manual entry.');
    } finally {
      setLoading(false);
    }
  };

  const connectManual = async () => {
    if (!manualForm.channelName || !manualForm.subscriberCount || !manualForm.niche) {
      alert('Please fill Channel Name, Subscribers and Niche.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/youtube/connect', {
        manual: true,
        channelUrl: manualForm.channelName,
        channelName: manualForm.channelName,
        subscriberCount: parseInt(manualForm.subscriberCount.replace(/,/g, '')),
        totalViews: parseInt(manualForm.totalViews.replace(/,/g, '') || '0'),
        videoCount: parseInt(manualForm.videoCount || '0'),
        niche: manualForm.niche,
      });
      setChannel(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving channel.');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase();

  if (fetching) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div className="avatar-lg">{initials}</div>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800 }}>Welcome, {user?.name}!</h1>
          <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            {user?.accountType === 'creator' ? 'YouTube Creator' : 'Freelancer'} Account
          </div>
        </div>
      </div>

      {user?.accountType === 'creator' && !channel && (
        <div className="glass" style={{ padding: 32, marginBottom: 32 }}>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Set Up Your Channel</h2>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <button className={`chip${mode === 'auto' ? ' active' : ''}`} onClick={() => setMode('auto')}>
              🔗 Auto Fetch
            </button>
            <button className={`chip${mode === 'manual' ? ' active' : ''}`} onClick={() => setMode('manual')}>
              ✏️ Manual Entry
            </button>
          </div>

          {mode === 'auto' && (
            <div>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
                Enter your YouTube channel URL to automatically fetch your stats.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <input className="input-field" placeholder="https://youtube.com/@YourChannel"
                  value={channelUrl} onChange={e => setChannelUrl(e.target.value)} />
                <button className="btn-grad" onClick={connectAuto} disabled={loading}
                  style={{ whiteSpace: 'nowrap', padding: '12px 24px' }}>
                  {loading ? '...' : 'Fetch'}
                </button>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>
                Can't fetch? <span style={{ color: '#a78bfa', cursor: 'pointer' }} onClick={() => setMode('manual')}>Switch to manual entry →</span>
              </p>
            </div>
          )}

          {mode === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Channel Name *</label>
                <input className="input-field" placeholder="e.g. TechWithAnupam"
                  value={manualForm.channelName}
                  onChange={e => setManualForm({ ...manualForm, channelName: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Subscribers *</label>
                  <input className="input-field" placeholder="e.g. 48200"
                    value={manualForm.subscriberCount}
                    onChange={e => setManualForm({ ...manualForm, subscriberCount: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Total Views</label>
                  <input className="input-field" placeholder="e.g. 2100000"
                    value={manualForm.totalViews}
                    onChange={e => setManualForm({ ...manualForm, totalViews: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Number of Videos</label>
                  <input className="input-field" placeholder="e.g. 87"
                    value={manualForm.videoCount}
                    onChange={e => setManualForm({ ...manualForm, videoCount: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Niche *</label>
                  <select className="input-field" value={manualForm.niche}
                    onChange={e => setManualForm({ ...manualForm, niche: e.target.value })}>
                    <option value="">Select niche</option>
                    {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn-grad" onClick={connectManual} disabled={loading}
                style={{ padding: '13px', fontSize: 15 }}>
                {loading ? 'Saving...' : 'Save Channel →'}
              </button>
            </div>
          )}
        </div>
      )}

      {channel && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 className="syne" style={{ fontSize: 20, fontWeight: 700 }}>{channel.channelName}</h2>
              {channel.niche && <span className="tag" style={{ marginTop: 6, display: 'inline-block' }}>{channel.niche}</span>}
            </div>
            <button className="btn-outline" onClick={() => setChannel(null)} style={{ fontSize: 13, padding: '8px 16px' }}>
              Edit Details
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              ['Subscribers', channel.subscriberCount?.toLocaleString()],
              ['Total Views', channel.totalViews?.toLocaleString()],
              ['Videos', channel.videoCount],
            ].map(([label, val]) => (
              <div key={label} className="glass" style={{ padding: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{label}</div>
                <div className="syne" style={{ fontSize: 28, fontWeight: 700 }}>{val || '—'}</div>
              </div>
            ))}
          </div>

          {channel.topVideos?.length > 0 && (
            <>
              <div className="section-title">Top Videos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {channel.topVideos.slice(0, 5).map((v, i) => (
                  <div key={i} className="glass-sm" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: 'var(--gradient)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>▶</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{v.snippet?.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{v.snippet?.channelTitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {channel.topVideos?.length === 0 && (
            <div className="glass" style={{ padding: 20, textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>No video data available.</p>
            </div>
          )}
        </div>
      )}

      {user?.accountType === 'freelancer' && (
        <div className="glass" style={{ padding: 28 }}>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your Freelancer Dashboard</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Complete your profile to get discovered by creators. Go to Profile to add your skills and bio.</p>
        </div>
      )}
    </div>
  );
}