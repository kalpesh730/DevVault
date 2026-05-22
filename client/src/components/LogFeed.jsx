import { useState, useEffect } from "react";

export default function LogFeed() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    // 1. Send the destruct signal to the backend
    try {
      const response = await fetch(`http://localhost:5000/api/dsaLogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // 2. Instantly remove it from the UI without refreshing
        setLogs(logs.filter((log) => log._id !== id));
      } else {
        console.error("Failed to delete from vault");
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
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
    </div>
  );
}
