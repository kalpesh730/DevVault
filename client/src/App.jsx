import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Components & Pages
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="ambient-glow"></div>

        <div className="app-layout">
          <Sidebar />

          <main className="main-viewport">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
