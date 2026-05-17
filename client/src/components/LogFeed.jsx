import { useState, useEffect } from "react";

export default function LogFeed() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Automatically fetch data when the component loads
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dsaLogs");
      const data = await response.json();
      setLogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setLoading(false);
    }
  };

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
        <span className="log-count">{logs.length} Records Found</span>
      </div>

      <div className="log-grid">
        {logs.length === 0 ? (
          <div className="empty-state">
            <p>Vault is empty. Awaiting first execution log.</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="log-card">
              <div className="log-card-header">
                <h3>{log.title}</h3>
                <span
                  className={`difficulty-badge ${log.difficulty.toLowerCase()}`}
                >
                  {log.difficulty}
                </span>
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
    </div>
  );
}
