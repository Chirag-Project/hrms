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
        background: "#EEF2FF"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFFFFF",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          width: "350px",
          border: "1px solid #E5E7EB"
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#1F2937"
          }}
        >
          Mark Attendance
        </h3>

        {error && (
          <p
            style={{
              color: "#DC2626",
              textAlign: "center",
              fontSize: "14px"
            }}
          >
            {error}
          </p>
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
            background: "#6366F1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "500"
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
  padding: "9px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #D1D5DB",
  outline: "none"
};

export default AttendanceForm;