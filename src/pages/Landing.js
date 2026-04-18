import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Landing() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--border)',
        background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <span className="syne grad-text" style={{ fontSize: 24, fontWeight: 800 }}>CreatorVerse</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
            color: 'var(--text)', fontSize: 16
          }}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <Link to="/login"><button className="btn-outline">Login</button></Link>
          <Link to="/register"><button className="btn-grad">Get Started</button></Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '100px 24px 60px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="tag" style={{ marginBottom: 24, fontSize: 13 }}>✦ The Future of Creator Economy</div>
        <h1 className="syne" style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          Build Your Channel<br />
          <span className="grad-text">With AI Power</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          The all-in-one platform for YouTube creators and the freelancers who power them. AI tools, real analytics, and talent discovery.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register"><button className="btn-grad" style={{ padding: '14px 36px', fontSize: 16 }}>Start for Free →</button></Link>
          <Link to="/login"><button className="btn-outline" style={{ padding: '14px 36px', fontSize: 16 }}>Login</button></Link>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '60px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Everything You Need</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16 }}>Powerful tools for creators and freelancers</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { icon: '◈', title: 'Real Analytics', desc: 'Connect your YouTube channel and get real subscriber counts, views, and video performance data.' },
            { icon: '✦', title: 'AI Content Studio', desc: 'Generate 5 title options, SEO descriptions, 15 hashtags and thumbnail tips powered by Gemini AI.' },
            { icon: '▲', title: 'Trending Topics', desc: 'Discover what\'s trending in your niche this week and never run out of video ideas again.' },
            { icon: '◉', title: 'AI Performance Coach', desc: 'Get personalised growth tips based on your last 5 videos. Know when and how often to post.' },
            { icon: '◎', title: 'Find Freelancers', desc: 'Browse verified video editors, thumbnail designers, scriptwriters and more for your channel.' },
            { icon: '◐', title: 'Creator Profile', desc: 'Build your freelancer profile and get discovered by thousands of YouTube creators.' },
          ].map((f, i) => (
            <div key={i} className="glass" style={{ padding: 28, transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: 32, marginBottom: 16, background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{f.icon}</div>
              <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div className="glass" style={{ maxWidth: 600, margin: '0 auto', padding: '48px 40px' }}>
          <h2 className="syne" style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to grow faster?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 16 }}>Join thousands of creators already using CreatorVerse.</p>
          <Link to="/register"><button className="btn-grad" style={{ padding: '14px 48px', fontSize: 16 }}>Get Started Free →</button></Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: 13 }}>
        © 2025 CreatorVerse. Built with ❤️ for creators.
      </div>
    </div>
  );
}