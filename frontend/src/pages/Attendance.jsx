import { useEffect, useState } from "react";
import API from "../api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterDate, setFilterDate] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  const fetchAttendance = async () => {
    try {
      const response = await API.get("attendance/");
      setAttendanceRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    const response = await API.get("employees/");
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = attendanceRecords;

    if (filterDate) {
      filtered = filtered.filter(
        (record) => record.date === filterDate
      );
    }

    if (filterEmployee) {
      filtered = filtered.filter(
        (record) => record.employee == filterEmployee
      );
    }

    setFilteredRecords(filtered);
  }, [filterDate, filterEmployee, attendanceRecords]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Attendance</h1>
        <AttendanceForm refreshAttendance={fetchAttendance} />
      </div>

      <div style={styles.card}>
        <div style={styles.filterContainer}>
          <h3 style={styles.filterTitle}>Filter Attendance</h3>

          <div style={styles.filterInputs}>
            <input
              type="date"
              value={filterDate}
              style={styles.input}
              onChange={(e) => setFilterDate(e.target.value)}
            />

            <select
              value={filterEmployee}
              style={styles.input}
              onChange={(e) => setFilterEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AttendanceList
          attendanceRecords={filteredRecords}
          loading={loading}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  card: {
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    marginBottom: "25px",
    border: "1px solid #E5E7EB",
  },

  title: {
    fontSize: "26px",
    marginBottom: "20px",
    color: "#1F2937",
  },

  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  filterTitle: {
    fontSize: "18px",
    color: "#374151",
  },

  filterInputs: {
    display: "flex",
    gap: "10px",
  },

  input: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
  },
};

export default Attendance;