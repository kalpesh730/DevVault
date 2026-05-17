import "./index.css";
import LogForm from "./components/LogForm";
import LogFeed from "./components/LogFeed";

function App() {
  return (
    <div className="app-wrapper">
      <div className="ambient-glow"></div>

      <div className="dashboard-container">
        <header className="brand-header">
          <h1 className="brand-title">
            DevVault<span className="brand-accent">.</span>
          </h1>
          <p className="brand-tagline">Centralized Developer Intelligence</p>
        </header>

        <main className="main-content">
          <LogForm />

          {/* THE NEW FEED COMPONENT */}
          <div className="divider"></div>
          <LogFeed />
        </main>
      </div>
    </div>
  );
}

export default App;
