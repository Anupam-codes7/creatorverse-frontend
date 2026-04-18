import { useState, useEffect } from 'react';
import API from '../api';

const NICHES = ['Tech', 'Gaming', 'Finance', 'Fitness', 'Education'];

export default function Trending() {
  const [niche, setNiche] = useState('Tech');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    API.get(`/youtube/trending?niche=${niche}`)
      .then(res => setVideos(res.data || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [niche]);

  return (
    <div className="page">
      {/* Heading */}
      <h1
        className="syne"
        style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}
      >
        Trending Topics
      </h1>

      <p
        style={{
          color: 'var(--muted)',
          fontSize: 14,
          marginBottom: 24
        }}
      >
        Top trending YouTube videos in your niche this week.
      </p>

      {/* Niche Filters */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 28
        }}
      >
        {NICHES.map(n => (
          <button
            key={n}
            className={`chip${niche === n ? ' active' : ''}`}
            onClick={() => setNiche(n)}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ color: 'var(--muted)' }}>
          Loading trending videos...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          {/* Empty State */}
          {videos.length === 0 && (
            <div style={{ color: 'var(--muted)' }}>
              No trending videos found.
            </div>
          )}

          {/* Video List */}
          {videos.map((v, i) => (
            <a
              key={v.id?.videoId || i}
              href={`https://www.youtube.com/watch?v=${v.id?.videoId}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="glass"
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  transition: 'border-color 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.borderColor = 'var(--border)')
                }
              >
                {/* Rank */}
                <div
                  className="syne"
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: i === 0 ? '#7C3AED' : 'var(--muted)',
                    minWidth: 36
                  }}
                >
                  #{i + 1}
                </div>

                {/* Thumbnail */}
                {v.snippet?.thumbnails?.medium?.url && (
                  <img
                    src={v.snippet.thumbnails.medium.url}
                    alt="thumbnail"
                    style={{
                      width: 100,
                      height: 60,
                      borderRadius: 8,
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* Title + Channel */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--text)'
                    }}
                  >
                    {v.snippet?.title || 'Untitled Video'}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 4
                    }}
                  >
                    by {v.snippet?.channelTitle || 'Unknown Channel'}
                  </div>
                </div>

                {/* Views */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#a78bfa'
                    }}
                  >
                    {v.statistics?.viewCount
                      ? `${parseInt(v.statistics.viewCount).toLocaleString()} views`
                      : 'Trending ▲'}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}