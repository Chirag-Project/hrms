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

  // Filtering Logic
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
    <div className="page-container">
      

      <div className="card">
        <h1>ATTENDANCE</h1>
        <AttendanceForm refreshAttendance={fetchAttendance} />
      </div>

      {/* Filter Section */}
      <div className="card">
        
        <div style={styles.filter}>
          <h3 class="float_left">Filter Attendance</h3>
        
        <input class="date_input"
          type="date"
          value={filterDate}
          style={styles.date_input}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <br /><br />

        <select
          value={filterEmployee}
          style={styles.date_input}
          onChange={(e) => setFilterEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>
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

  filter: {
    display: "flex",
    float:"right"
  },
  date_input: {
    padding: 0,
    width: 120,
    height: 35,
    margin: "10px"
  }
}
export default Attendance;
