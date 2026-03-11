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

  const cards = [
    {
      title: "Total Employees",
      value: summary.total_employees,
      gradient: "linear-gradient(135deg,#3B82F6,#1E40AF)",
      icon: "👨‍💼",
    },
    {
      title: "Total Attendance",
      value: summary.total_attendance,
      gradient: "linear-gradient(135deg,#10B981,#047857)",
      icon: "📅",
    },
    {
      title: "Present Today",
      value: summary.present_today,
      gradient: "linear-gradient(135deg,#F59E0B,#B45309)",
      icon: "✅",
    },
    {
      title: "Absent Today",
      value: summary.absent_today,
      gradient: "linear-gradient(135deg,#EF4444,#991B1B)",
      icon: "❌",
    },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>HRMS Dashboard</h1>

      <div style={styles.cardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={{ ...styles.card, background: card.gradient }}
          >
            <div style={styles.cardTop}>
              <span style={styles.icon}>{card.icon}</span>
              <p style={styles.label}>{card.title}</p>
            </div>

            <h2 style={styles.number}>
              {loading ? "Loading..." : card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#F8FAFC",
    minHeight: "100vh",
    flex: 1,
  },

  heading: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "35px",
    color: "#0F172A",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
  },

  card: {
    padding: "28px",
    borderRadius: "14px",
    color: "white",
    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },

  icon: {
    fontSize: "22px",
  },

  label: {
    fontSize: "15px",
    opacity: 0.9,
    margin: 0,
  },

  number: {
    fontSize: "36px",
    fontWeight: "700",
    margin: 0,
  },
};

export default Dashboard;