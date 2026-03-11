import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaClipboardCheck } from "react-icons/fa";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <div>
        <h2 style={styles.title}>HRMS</h2>

        <nav style={styles.nav}>
          <NavLink to="/" style={styles.link} end>
            <FaTachometerAlt style={styles.icon} />
            Dashboard
          </NavLink>

          <NavLink to="/employees" style={styles.link}>
            <FaUsers style={styles.icon} />
            Employees
          </NavLink>

          <NavLink to="/attendance" style={styles.link}>
            <FaClipboardCheck style={styles.icon} />
            Attendance
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    height: "100vh",
    background: "linear-gradient(180deg,#1E293B,#020617)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "40px",
    letterSpacing: "1px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  link: ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "15px",
    color: isActive ? "#0F172A" : "#CBD5F5",
    background: isActive ? "#E2E8F0" : "transparent",
    borderLeft: isActive ? "4px solid #6366F1" : "4px solid transparent",
    transition: "all 0.25s ease",
  }),

  icon: {
    fontSize: "18px",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "20px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#6366F1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },

  name: {
    fontSize: "14px",
    margin: 0,
  },

  role: {
    fontSize: "12px",
    opacity: 0.7,
    margin: 0,
  },
};

export default Sidebar;