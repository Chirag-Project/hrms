import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [summary, setSummary] = useState({
    total_employees: 0,
    total_attendance: 0,
    present_today: 0,
    absent_today: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const response = await API.get("dashboard/");
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>HRMS Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={{ ...styles.card, borderTop: "4px solid #3B82F6" }}>
          <p style={styles.label}>Total Employees</p>
          <h2 style={styles.number}>
            {loading ? "Loading..." : summary.total_employees}
          </h2>
        </div>

        <div style={{ ...styles.card, borderTop: "4px solid #10B981" }}>
          <p style={styles.label}>Total Attendance</p>
          <h2 style={styles.number}>
            {loading ? "Loading..." : summary.total_attendance}
          </h2>
        </div>

        <div style={{ ...styles.card, borderTop: "4px solid #F59E0B" }}>
          <p style={styles.label}>Present Today</p>
          <h2 style={styles.number}>
            {loading ? "Loading..." : summary.present_today}
          </h2>
        </div>

        <div style={{ ...styles.card, borderTop: "4px solid #EF4444" }}>
          <p style={styles.label}>Absent Today</p>
          <h2 style={styles.number}>
            {loading ? "Loading..." : summary.absent_today}
          </h2>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#F1F5F9",
    minHeight: "100vh",
    flex: 1,
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#0F172A",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  label: {
    fontSize: "14px",
    color: "#64748B",
    marginBottom: "12px",
    fontWeight: "500",
  },
  number: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1E293B",
    margin: 0,
  },
};

export default Dashboard;