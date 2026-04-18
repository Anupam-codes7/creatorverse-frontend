import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const SKILLS = ["Video Editor","Thumbnail Designer","YouTube Channel Manager","Scriptwriter","Voice Over Artist","SEO Optimizer","Brand Integration Specialist","Social Media Manager","Motion Graphics Designer","Research & Ideation"];

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', accountType: '', skills: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleSkill = (s) => setForm(f => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s] }));

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="syne grad-text" style={{ fontSize: 28, fontWeight: 800 }}>CreatorVerse</span>
          </Link>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>Create your account</p>
        </div>

        <div className="glass" style={{ padding: 32 }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#f87171', fontSize: 14 }}>{error}</div>
          )}

          {step === 1 && (
            <div>
              <p className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>I am a...</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                {[
                  { key: 'creator', icon: '▶', label: 'YouTube Creator', sub: 'I make YouTube content' },
                  { key: 'freelancer', icon: '◈', label: 'Freelancer', sub: 'I work with creators' },
                ].map(opt => (
                  <div key={opt.key} onClick={() => setForm({ ...form, accountType: opt.key })}
                    style={{ padding: 24, borderRadius: 12, cursor: 'pointer', textAlign: 'center', border: `1px solid ${form.accountType === opt.key ? '#7C3AED' : 'var(--border)'}`, background: form.accountType === opt.key ? 'rgba(124,58,237,0.1)' : 'var(--surface)', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{opt.icon}</div>
                    <div className="syne" style={{ fontWeight: 700, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{opt.sub}</div>
                  </div>
                ))}
              </div>
              <button className="btn-grad" disabled={!form.accountType} onClick={() => setStep(2)}
                style={{ width: '100%', padding: '13px', fontSize: 15, opacity: form.accountType ? 1 : 0.4 }}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Full Name</label>
                <input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Email</label>
                <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Password</label>
                <input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              {form.accountType === 'freelancer' && (
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 10 }}>Your Skills</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {SKILLS.map(s => (
                      <button key={s} className={`chip${form.skills.includes(s) ? ' active' : ''}`} type="button" onClick={() => toggleSkill(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button className="btn-outline" onClick={() => setStep(1)} style={{ flex: 1, padding: '13px' }}>← Back</button>
                <button className="btn-grad" onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: '13px', fontSize: 15 }}>
                  {loading ? 'Creating...' : 'Create Account →'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 20 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}