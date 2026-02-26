import { useState, useEffect } from "react";
import API from "../api";

function AttendanceForm({ refreshAttendance }) {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    status: "Present"
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("attendance/", formData);
      setFormData({
        employee: "",
        date: "",
        status: "Present"
      });
      refreshAttendance();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.non_field_errors) {
          setError(errorData.non_field_errors[0]);
        } else {
          setError("Error adding attendance.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          padding: "30px 40px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "350px"
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Mark Attendance
        </h3>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

export default AttendanceForm;