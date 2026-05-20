import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-brand">
        <h1>
          DevVault<span className="brand-accent">.</span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-indicator"></span>
          Terminal
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-indicator"></span>
          Analytics
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge">
          <div className="user-avatar"></div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">System Architect</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
