import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const SKILLS = ["Video Editor","Thumbnail Designer","YouTube Channel Manager","Scriptwriter","Voice Over Artist","SEO Optimizer","Brand Integration Specialist","Social Media Manager","Motion Graphics Designer","Research & Ideation"];

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ skills: [], bio: '', portfolioLink: '', startingPrice: '', contactEmail: '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.accountType === 'freelancer') {
      API.get('/freelancers').then(r => {
        const mine = r.data.find(f => f.userId?._id === user.id || f.userId === user.id);
        if (mine) setForm({ skills: mine.skills || [], bio: mine.bio || '', portfolioLink: mine.portfolioLink || '', startingPrice: mine.startingPrice || '', contactEmail: mine.contactEmail || '' });
      }).catch(() => {});
    }
  }, [user]);

  const toggleSkill = (s) => setForm(f => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s] }));

  const saveProfile = async () => {
    setLoading(true);
    try {
      await API.put('/freelancers/profile', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="page">
      <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>My Profile</h1>

      <div className="glass" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div className="avatar-lg">{initials}</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              {user?.accountType === 'creator' ? 'YouTube Creator' : 'Freelancer'} · {user?.email}
            </div>
          </div>
        </div>

        {user?.accountType === 'freelancer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Bio</label>
              <textarea className="input-field" placeholder="What you offer, your experience..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Portfolio Link</label>
              <input className="input-field" placeholder="https://your-portfolio.com" value={form.portfolioLink} onChange={e => setForm({ ...form, portfolioLink: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Starting Price</label>
              <input className="input-field" placeholder="e.g. ₹500/video" value={form.startingPrice} onChange={e => setForm({ ...form, startingPrice: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Contact Email</label>
              <input className="input-field" placeholder="your@email.com" value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 12 }}>Your Skills</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.map(s => (
                  <button key={s} className={`chip${form.skills.includes(s) ? ' active' : ''}`} onClick={() => toggleSkill(s)}>{s}</button>
                ))}
              </div>
            </div>
            <button className="btn-grad" onClick={saveProfile} disabled={loading} style={{ padding: '13px 36px', fontSize: 15, marginTop: 8 }}>
              {saved ? '✓ Saved!' : loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        )}

        {user?.accountType === 'creator' && (
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>
            <p>Name: <strong style={{ color: 'var(--text)' }}>{user?.name}</strong></p>
            <p style={{ marginTop: 8 }}>Email: <strong style={{ color: 'var(--text)' }}>{user?.email}</strong></p>
            <p style={{ marginTop: 8 }}>Account Type: <strong style={{ color: 'var(--text)' }}>YouTube Creator</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}