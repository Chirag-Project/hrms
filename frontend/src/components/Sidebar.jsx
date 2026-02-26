import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaClipboardCheck } from "react-icons/fa";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>HRMS Lite</h2>

      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link} end>
          Dashboard
        </NavLink>

        <NavLink to="/employees" style={styles.link}>
          Employees
        </NavLink>

        <NavLink to="/attendance" style={styles.link}>
          Attendance
        </NavLink>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#1E293B",
    color: "white",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "40px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column"
  },
  link: ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "8px",
    color: isActive ? "#FFFFFF" : "#CBD5E1",
    background: isActive ? "#2563EB" : "transparent",
    textDecoration: "none",
    fontSize: "15px",
    transition: "0.3s",
  }),
  icon: {
    fontSize: "18px",
  },
};

export default Sidebar;