import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dsaLogs")
      .then((res) => res.json())
      .then((logs) => {
        // Calculate counts
        const counts = logs.reduce((acc, log) => {
          acc[log.difficulty] = (acc[log.difficulty] || 0) + 1;
          return acc;
        }, {});

        // Format for Recharts
        const formattedData = [
          { name: "Easy", value: counts["Easy"] || 0, color: "#10b981" },
          { name: "Medium", value: counts["Medium"] || 0, color: "#f59e0b" },
          { name: "Hard", value: counts["Hard"] || 0, color: "#ef4444" },
        ];
        setData(formattedData);
      });
  }, []);

  return (
    <div className="page-content">
      <header className="page-header">
        <h2 className="page-title">Mastery Metrics</h2>
        <p className="page-subtitle">
          Visual breakdown of your algorithm proficiency.
        </p>
      </header>

      <div
        className="glass-card"
        style={{ height: "400px", display: "flex", alignItems: "center" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
