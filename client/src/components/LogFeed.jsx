import { useState, useEffect } from 'react';

export default function LogFeed() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // DEV-014: Search and Filter State Engines
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [analyzingId, setAnalyzingId] = useState(null);
  const [aiFeedback, setAiFeedback] = useState({});

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dsaLogs');
      const data = await response.json();
      setLogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dsaLogs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLogs(logs.filter((log) => log._id !== id));
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    }
  };
  const handleAnalyze = async (id, title, code) => {
    setAnalyzingId(id);
    try {
      const response = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, code }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the feedback attached to this specific log ID
        setAiFeedback((prev) => ({ ...prev, [id]: data.analysis }));
      }
    } catch (error) {
      console.error("AI connection failed:", error);
    }
    setAnalyzingId(null);
  };
  // DEV-014: The Filter Logic (Runs instantly on every keystroke)
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'All' || log.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  if (loading) {
    return (
      <div className="feed-container">
        <div className="status-indicator">
          <span className="pulse-dot active"></span>
          <span className="status-text">Decrypting Vault Records...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h2>Execution History</h2>
        <span className="log-count">{filteredLogs.length} Records Found</span>
      </div>

      {/* DEV-014: The Control Panel */}
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search algorithms or topics (e.g., Arrays, Sort)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
          spellCheck="false"
        />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="difficulty-dropdown"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="log-grid">
        {filteredLogs.length === 0 ? (
          <div className="empty-state">
            <p>No records match your exact search parameters.</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log._id} className="log-card">
              <div className="log-card-header">
                <div className="title-group">
                  <h3>{log.title}</h3>
                  <span
                    className={`difficulty-badge ${log.difficulty.toLowerCase()}`}
                  >
                    {log.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="destructive-btn"
                  title="Purge Record"
                >
                  Purge
                </button>
              </div>
              <div className="log-meta">
                <span className="topic-tag">{log.topic}</span>
                <span className="date-tag">
                  {new Date(log.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="code-preview">
                <pre>
                  <code>{log.solutionCode}</code>
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
      <div key={log._id} className="log-card">
        <div className="log-card-header">
          <div className="title-group">
            <h3>{log.title}</h3>
            <span
              className={`difficulty-badge ${log.difficulty.toLowerCase()}`}
            >
              {log.difficulty}
            </span>
          </div>
          <div
            className="action-group"
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <button
              onClick={() =>
                handleAnalyze(log._id, log.title, log.solutionCode)
              }
              className="primary-btn"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
              disabled={analyzingId === log._id}
            >
              {analyzingId === log._id ? "Analyzing..." : "AI Review"}
            </button>
            <button
              onClick={() => handleDelete(log._id)}
              className="destructive-btn"
              title="Purge Record"
            >
              Purge
            </button>
          </div>
        </div>
        <div className="log-meta">
          <span className="topic-tag">{log.topic}</span>
          <span className="date-tag">
            {new Date(log.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="code-preview">
          <pre>
            <code>{log.solutionCode}</code>
          </pre>
        </div>

        {/* DEV-015: AI Feedback Window */}
        {aiFeedback[log._id] && (
          <div
            className="ai-feedback-window"
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(100, 108, 255, 0.05)",
              border: "1px solid rgba(100, 108, 255, 0.2)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              whiteSpace: "pre-wrap",
            }}
          >
            <div
              style={{
                color: "var(--accent-primary)",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              ✦ AI Architecture Review
            </div>
            {aiFeedback[log._id]}
          </div>
        )}
      </div>
    </div>
  );
}