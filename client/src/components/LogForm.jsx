import { useState } from "react";

export default function LogForm() {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
    solutionCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transmission payload:", formData);
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
          <span className="pulse-dot"></span>
          <span className="status-text">System Ready</span>
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
          <button type="submit" className="primary-btn">
            Commit to Vault
          </button>
        </div>
      </form>
    </div>
  );
}
