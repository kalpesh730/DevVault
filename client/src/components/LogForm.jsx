import { useState } from "react";

export default function LogForm() {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
    solutionCode: "",
  });

  // New State: Tracks the exact status of the network request
  const [status, setStatus] = useState("System Ready");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Transmitting...");

    try {
      // THE BRIDGE: Sending the POST request to your Express server
      const response = await fetch("http://localhost:5000/api/dsaLogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Log Secured");

        // Clear the form to prepare for the next entry
        setFormData({
          title: "",
          topic: "",
          difficulty: "Easy",
          solutionCode: "",
        });

        // Reset the UI status back to normal after 3 seconds
        setTimeout(() => setStatus("System Ready"), 3000);
      } else {
        setStatus("Transmission Failed");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus("Connection Refused");
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="header-title">
          <h2>Log Execution</h2>
          <p className="subtitle">
            Record algorithm parameters and source code.
          </p>
        </div>
        <div className="status-indicator">
          {/* Dynamic pulse color based on network status */}
          <span
            className={
              status === "Transmitting..." ? "pulse-dot active" : "pulse-dot"
            }
          ></span>
          <span className="status-text">{status}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="premium-form">
        <div className="input-group">
          <label>Algorithm Identity</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Reverse Linked List"
            value={formData.title}
            onChange={handleChange}
            required
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <div className="row-group">
          <div className="input-group">
            <label>Classification</label>
            <input
              type="text"
              name="topic"
              placeholder="e.g. Pointers, Trees"
              value={formData.topic}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label>Complexity</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Execution Block (Java)</label>
          <textarea
            name="solutionCode"
            placeholder="public class Solution { ... }"
            rows="8"
            value={formData.solutionCode}
            onChange={handleChange}
            required
            spellCheck="false"
          ></textarea>
        </div>

        <div className="action-row">
          <button
            type="submit"
            className="primary-btn"
            disabled={status === "Transmitting..."}
          >
            {status === "Transmitting..." ? "Encrypting..." : "Commit to Vault"}
          </button>
        </div>
      </form>
    </div>
  );
}
