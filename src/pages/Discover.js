import { useState, useEffect } from 'react';
import API from '../api';

const SKILLS = ["All","Video Editor","Thumbnail Designer","YouTube Channel Manager","Scriptwriter","Voice Over Artist","SEO Optimizer","Motion Graphics Designer","Research & Ideation"];

export default function Discover() {
  const [filter, setFilter] = useState('All');
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = filter === 'All' ? '/freelancers' : `/freelancers?skill=${filter}`;
    API.get(url).then(r => setFreelancers(r.data)).catch(() => setFreelancers([])).finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="page">
      <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Find Freelancers</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Browse verified creators who can power your channel.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {SKILLS.map(s => <button key={s} className={`chip${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}
      </div>

      {loading ? <div style={{ color: 'var(--muted)' }}>Loading freelancers...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {freelancers.length === 0 && <div style={{ color: 'var(--muted)', gridColumn: '1/-1' }}>No freelancers found yet. Be the first to sign up as a freelancer!</div>}
          {freelancers.map((f, i) => {
            const name = f.userId?.name || 'Freelancer';
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
            return (
              <div key={i} className="glass" style={{ padding: 24, transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer', borderRadius: 16 }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                  <div className="avatar">{initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
                    {f.startingPrice && <div style={{ color: '#a78bfa', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{f.startingPrice}</div>}
                  </div>
                </div>
                {f.bio && <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14 }}>{f.bio}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {f.skills?.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
                {f.contactEmail && (
                  <a href={`mailto:${f.contactEmail}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-grad" style={{ width: '100%', padding: '9px' }}>Contact via Email</button>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}