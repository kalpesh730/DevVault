import LogForm from "../components/LogForm";
import LogFeed from "../components/LogFeed";

export default function Dashboard() {
  return (
    <div className="page-content">
      <header className="page-header">
        <h2 className="page-title">Command Center</h2>
        <p className="page-subtitle">
          Log executions and monitor recent vault activity.
        </p>
      </header>

      <LogForm />
      <div className="divider"></div>
      <LogFeed />
    </div>
  );
}
